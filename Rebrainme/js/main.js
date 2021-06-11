"use strict";

var _APP;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Mask = /*#__PURE__*/function () {
  function Mask(selector) {
    var regExpString = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '+7 (___) ___-__-__';

    _classCallCheck(this, Mask);

    this.elements = document.querySelectorAll(selector);
    this.regExpString = regExpString;
  }

  _createClass(Mask, [{
    key: "init",
    value: function init() {
      this._listeners(this.elements);
    }
  }, {
    key: "_listeners",
    value: function _listeners(selector) {
      for (var i = 0; i < selector.length; i++) {
        var input = selector[i];
        input.addEventListener('input', this._mask.bind(this), false);
        input.addEventListener('focus', this._mask.bind(this), false);
        input.addEventListener('blur', this._mask.bind(this), false);
      }
    }
  }, {
    key: "_setCursorPosition",
    value: function _setCursorPosition(pos, elem) {
      elem.focus();

      if (elem.setSelectionRange) {
        elem.setSelectionRange(pos, pos);
      } else if (elem.createTextRange) {
        var range = elem.createTextRange();
        range.collapse(true);
        range.moveEnd('character', pos);
        range.moveStart('character', pos);
        range.select();
      }
    }
  }, {
    key: "_mask",
    value: function _mask(event) {
      var matrix = this.regExpString,
          i = 0,
          def = matrix.replace(/\D/g, ''),
          val = event.target.value.replace(/\D/g, '');

      if (def.length >= val.length) {
        val = def;
      }

      event.target.value = matrix.replace(/./g, function (a) {
        return /[_\d]/.test(a) && i < val.length ? val.charAt(i++) : i >= val.length ? '' : a;
      });

      if (event.type == 'blur') {
        if (event.target.value.length == 2) {
          event.target.value = '';
        }
      } else {
        this._setCursorPosition(event.target.value.length, event.target);
      }
    }
  }]);

  return Mask;
}();

var utils = {
  cache: {},
  // сет брейкпоинтов для js
  // должны совпадать с теми что в body:after
  mediaBreakpoint: {
    sm: 576,
    md: 768,
    lg: 992,
    xl: 1366,
    xxl: 1920
  },
  isMobile: {
    Android: function Android() {
      return navigator.userAgent.match(/Android/i);
    },
    BlackBerry: function BlackBerry() {
      return navigator.userAgent.match(/BlackBerry/i);
    },
    iOS: function iOS() {
      return navigator.userAgent.match(/iPhone|iPad|iPod/i);
    },
    Opera: function Opera() {
      return navigator.userAgent.match(/Opera Mini/i);
    },
    Windows: function Windows() {
      return navigator.userAgent.match(/IEMobile/i);
    },
    any: function any() {
      return this.Android() || this.BlackBerry() || this.iOS() || this.Opera() || this.Windows();
    }
  },
  svgIcons: function svgIcons() {
    var container = document.querySelector('[data-svg-path]');
    var path = container.getAttribute('data-svg-path');
    var xhr = new XMLHttpRequest();

    xhr.onload = function () {
      container.innerHTML = xhr.responseText;
    };

    xhr.open('get', path, true);
    xhr.send();
  },
  detectIE: function detectIE() {
    /**
     * detect IE
     * returns version of IE or false, if browser is not Internet Explorer
     */
    (function detectIE() {
      var ua = window.navigator.userAgent;
      var msie = ua.indexOf('MSIE ');

      if (msie > 0) {
        // IE 10 or older => return version number
        var ieV = parseInt(ua.substring(msie + 5, ua.indexOf('.', msie)), 10);
        document.querySelector('body').className += ' IE';
      }

      var trident = ua.indexOf('Trident/');

      if (trident > 0) {
        // IE 11 => return version number
        var rv = ua.indexOf('rv:');
        var ieV = parseInt(ua.substring(rv + 3, ua.indexOf('.', rv)), 10);
        document.querySelector('body').className += ' IE';
      }

      var edge = ua.indexOf('Edge/');

      if (edge > 0) {
        // IE 12 (aka Edge) => return version number
        var ieV = parseInt(ua.substring(edge + 5, ua.indexOf('.', edge)), 10);
        document.querySelector('body').className += ' IE';
      } // other browser


      return false;
    })();
  },
  truncateText: function truncateText(elements) {
    var cutText = function cutText() {
      for (var i = 0; i < elements.length; i++) {
        var text = elements[i];
        var elemMaxHeight = parseInt(getComputedStyle(text).maxHeight, 10);
        var elemHeight = text.offsetHeight;
        var maxHeight = elemMaxHeight ? elemMaxHeight : elemHeight;
        shave(text, maxHeight);
      }
    };

    this.cache.cutTextListener = this.throttle(cutText, 100);
    cutText();
    window.addEventListener('resize', this.cache.cutTextListener);
  },
  throttle: function throttle(callback, limit) {
    var wait = false;
    return function () {
      if (!wait) {
        callback.call();
        wait = true;
        setTimeout(function () {
          wait = false;
        }, limit);
      }
    };
  },
  getScreenSize: function getScreenSize() {
    var screenSize = window.getComputedStyle(document.querySelector('body'), ':after').getPropertyValue('content');
    screenSize = parseInt(screenSize.match(/\d+/), 10);
    return screenSize;
  },
  polyfills: function polyfills() {
    /**
     * polyfill for elem.closest
     */
    (function (ELEMENT) {
      ELEMENT.matches = ELEMENT.matches || ELEMENT.mozMatchesSelector || ELEMENT.msMatchesSelector || ELEMENT.oMatchesSelector || ELEMENT.webkitMatchesSelector;

      ELEMENT.closest = ELEMENT.closest || function closest(selector) {
        if (!this) return null;
        if (this.matches(selector)) return this;

        if (!this.parentElement) {
          return null;
        } else {
          return this.parentElement.closest(selector);
        }
      };
    })(Element.prototype);
    /**
     * polyfill for elem.hasClass
     */


    Element.prototype.hasClass = function (className) {
      return this.className && new RegExp("(^|\\s)" + className + "(\\s|$)").test(this.className);
    };
  }
};
var APP = (_APP = {
  animation_time: '.3s',
  speed_sliders: 800,
  arrayMobile: [[document.querySelectorAll('.main__slider.swiper-container'), '77.33333333333333', '.main__slider.swiper-container .swiper-slide']],
  arrayTablet: [[document.querySelectorAll('.main__slider.swiper-container'), '55.33854166666667', '.main__slider.swiper-container .swiper-slide']],
  arrayDesktope: [[document.querySelectorAll('.main__slider.swiper-container'), '93.09090909090909', '.main__slider.swiper-container .swiper-slide']],
  mediaMobile: window.matchMedia('(max-width: 767px)'),
  mediaTablet: window.matchMedia('(max-width: 1366px)'),
  mediaDesktope: window.matchMedia('(max-width: 10000px)'),
  mediaMinDesktope: window.matchMedia('(max-width: 1366px)')
}, _defineProperty(_APP, "mediaMinDesktope", window.matchMedia('(min-width: 1366px)')), _defineProperty(_APP, "mediaMinTablet", window.matchMedia('(min-width: 768px)')), _defineProperty(_APP, "mediaMinMobile", window.matchMedia('(min-width: 1px)')), _defineProperty(_APP, "minDesktope", 1366), _defineProperty(_APP, "timeout", 300), _defineProperty(_APP, "photoSlider", ''), _defineProperty(_APP, "initBefore", function initBefore() {
  utils.polyfills();
  utils.svgIcons();
  document.documentElement.className = document.documentElement.className.replace('no-js', 'js');
}), _defineProperty(_APP, "init", function init() {
  utils.detectIE(); //APP.lazyload();

  var myMask = new Mask('.js-tel');
  myMask.init(); //APP.buttons();
  //APP.closeOnFocusLost();

  APP.accordoin();
}), _defineProperty(_APP, "initOnLoad", function initOnLoad() {
  utils.truncateText(document.querySelectorAll('.js-dot'));
}), _defineProperty(_APP, "accordoin", function accordoin() {
  window.addEventListener('DOMContentLoaded', function () {
    var accordions = document.querySelectorAll('.programbottom__paragraph');
    var accordions_block = document.querySelectorAll('.programbottom__accordoinlist');
    var accordions_list = document.querySelectorAll('.programbottom__list');
    accordions[0].classList.add('active');
    accordions_block[0].style.height = "".concat(accordions_list[0].offsetHeight, "px");

    var _loop = function _loop(i) {
      accordions[i].addEventListener('click', function () {
        if (!accordions[i].classList.contains('active')) {
          for (var a = 0; a < accordions.length; a++) {
            if (accordions[a].classList.contains('active')) {
              accordions[a].classList.remove('active');
              accordions_block[a].style.height = "0px";
            }
          }

          accordions[i].classList.add('active');
          accordions_block[i].style.height = "".concat(accordions_list[i].offsetHeight, "px");
        }
      });
    };

    for (var i = 0; i < accordions.length; i++) {
      _loop(i);
    }
  });
}), _defineProperty(_APP, "resolution", function resolution(arr) {
  for (var i = 0; i < arr.length; i++) {
    if (arr[i][0][0]) {
      var blocks = document.querySelectorAll(arr[i][2]);
      var minHeight = "".concat(Number(window.getComputedStyle(arr[i][0][0], null).width.replace(/px/, '')) / 100 * Number(arr[i][1]), "px");

      for (var a = 0; a < blocks.length; a++) {
        if (blocks[a].style.minHeight !== minHeight && window.innerWidth < 1366) {
          blocks[a].style.minHeight = minHeight; //console.log(blocks[a].style.minHeight);
        }
      }
    }
  }
}), _APP);
APP.initBefore();
document.addEventListener('DOMContentLoaded', function () {
  APP.init();

  if (APP.mediaMobile.matches) {
    APP.resolution(APP.arrayMobile);
  } else if (APP.mediaTablet.matches) {
    APP.resolution(APP.arrayTablet);
  } else if (APP.mediaDesktope.matches) {
    APP.resolution(APP.arrayDesktope);
  }
});
window.addEventListener('resize', function () {
  if (APP.mediaMobile.matches) {
    APP.resolution(APP.arrayMobile);
  } else if (APP.mediaTablet.matches) {
    APP.resolution(APP.arrayTablet);
  } else if (APP.mediaDesktope.matches) {
    APP.resolution(APP.arrayDesktope);
  }
});

window.onload = function () {
  APP.initOnLoad();
};
//# sourceMappingURL=main.js.map
