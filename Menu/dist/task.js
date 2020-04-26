// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"libraryMenu.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Menu = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Menu = /*#__PURE__*/function () {
  function Menu(object) {
    _classCallCheck(this, Menu);

    this.widthScreen = object.widthScreen;
    this.time = object.time;
    this.timePanelMenu = object.timePanelMenu;
    this.marginTop = object.marginTop;
    this.header = object.header;
    this.blockMargin = object.blockMargin;
    this.blockFixedMenu = object.blockFixedMenu;
    this.mediaScreen = object.mediaScreen;
    this.mediaScreenMobile = object.mediaScreenMobile;
    this.burger = object.burger;
    this.burgerLineTop = object.burgerLineTop;
    this.burgerLineCenter = object.burgerLineCenter;
    this.burgerLineBottom = object.burgerLineBottom;
    this.menuBlock = object.menuBlock;
    this.menuUl = object.menuUl;
    this.menuHeight = object.menuHeight;
    this.menuFixed = object.menuFixed;
    this.scrollFixedMenu = object.scrollFixedMenu;
  }

  _createClass(Menu, [{
    key: "changePosition",
    value: function changePosition(header, blockMargin) {
      this.header = header;
      this.blockMargin = blockMargin;
      this.header.style.position = "static";
      this.blockMargin.style.marginTop = 0;
    }
  }, {
    key: "autoHeight",
    value: function autoHeight(menuBlock) {
      this.menuBlock = menuBlock;
      this.menuBlock.style.height = "auto";
    }
  }, {
    key: "minimalHeight",
    value: function minimalHeight() {
      this.menuBlock.style.height = 0;
    }
  }, {
    key: "closeMenu",
    value: function closeMenu(menuHeight) {
      this.menuHeight = menuHeight;
      this.burgerLineTop.style.transform = "rotate(0deg) translate(0px, 0px)";
      this.burgerLineCenter.style.opacity = "1";
      this.burgerLineBottom.style.transform = "rotate(0deg) translate(0px, 0px)";
      this.menuBlock.style.height = this.menuHeight + "px";
      this.menuFixed.style.display = "none";
      setTimeout(this.minimalHeight, 0);
    }
  }, {
    key: "scrollMenu",
    value: function scrollMenu() {
      if (this.mediaScreen.matches) {
        if (window.pageYOffset >= this.scrollFixedMenu) {
          this.header.style.top = 0;
          this.header.style.position = "fixed";
          this.blockMargin.style.marginTop = this.marginTop + "px";
        } else if (this.header.style.top === "0px" && window.pageYOffset < this.scrollFixedMenu) {
          this.header.style.top = "-" + this.marginTop + "px";
          setTimeout(this.changePosition, this.timePanelMenu, this.header, this.blockMargin);
        }
      }
    }
  }, {
    key: "resizeMenu",
    value: function resizeMenu() {
      this.mediaScreenMobile = window.matchMedia('all and (max-width: ' + this.widthScreen + 'px)');

      if (this.mediaScreenMobile.matches) {
        this.header.style.top = 0;
        this.header.style.position = "fixed";
      } else {
        this.header.style.position = "static";
      }
    }
  }, {
    key: "openCloseMenu",
    value: function openCloseMenu() {
      this.menuHeight = this.menuUl.offsetHeight;

      if (this.menuBlock.offsetHeight === 0) {
        this.burgerLineTop.style.transform = "rotate(45deg) translate(9px, 9px)";
        this.burgerLineCenter.style.opacity = "0";
        this.burgerLineBottom.style.transform = "rotate(-45deg) translate(8px, -8px)";
        this.menuBlock.style.height = this.menuHeight + "px";
        this.menuFixed.style.display = "flex";
        setTimeout(this.autoHeight, this.time, this.menuBlock);
      } else if (this.menuBlock.style.height === "auto") {
        this.closeMenu(this.menuHeight);
      }
    }
  }, {
    key: "clickBlockFixed",
    value: function clickBlockFixed() {
      this.menuHeight = this.menuUl.offsetHeight;

      if (this.menuBlock.style.height === "auto") {
        this.closeMenu(this.menuHeight);
      }
    }
  }]);

  return Menu;
}();

exports.Menu = Menu;
},{}],"task.js":[function(require,module,exports) {
"use strict";

var _libraryMenu = require("./libraryMenu.js");

(function () {
  var menu;
  var objectMenu = {};
  objectMenu.widthScreen = 1025;
  objectMenu.time = 500;
  objectMenu.timePanelMenu = 300;
  objectMenu.marginTop = 85;
  objectMenu.header;
  objectMenu.blockMargin;
  objectMenu.blockFixedMenu;
  objectMenu.mediaScreen;
  objectMenu.mediaScreenMobile;
  objectMenu.burger;
  objectMenu.burgerLineTop;
  objectMenu.burgerLineCenter;
  objectMenu.burgerLineBottom;
  objectMenu.menuBlock;
  objectMenu.menuUl;
  objectMenu.menuHeight;
  objectMenu.menuFixed;
  objectMenu.scrollFixedMenu;
  window.addEventListener('DOMContentLoaded', function () {
    objectMenu.mediaScreen = window.matchMedia('all and (min-width: ' + objectMenu.widthScreen + 'px)');
    objectMenu.menuFixed = document.querySelector(".block-menu-fixed");
    objectMenu.header = document.querySelector(".header");
    objectMenu.blockMargin = document.querySelector(".main");
    objectMenu.blockFixedMenu = document.querySelector(".fixed-menu");
    objectMenu.burger = document.querySelector(".header-blocks-burger");
    objectMenu.burgerLineTop = document.querySelector(".header-blocks-burger-top");
    objectMenu.burgerLineCenter = document.querySelector(".header-blocks-burger-center");
    objectMenu.burgerLineBottom = document.querySelector(".header-blocks-burger-bottom");
    objectMenu.menuBlock = document.querySelector(".header-div-ul");
    objectMenu.menuUl = document.querySelector(".header-ul");
    objectMenu.scrollFixedMenu = objectMenu.blockFixedMenu.getBoundingClientRect().bottom + window.pageYOffset;
    menu = new _libraryMenu.Menu(objectMenu);
    window.addEventListener('scroll', function () {
      menu.scrollMenu();
    });
    window.addEventListener('resize', function () {
      menu.resizeMenu();
    });
    objectMenu.burger.addEventListener('click', function () {
      menu.openCloseMenu();
    });
    objectMenu.menuFixed.addEventListener('click', function () {
      menu.clickBlockFixed();
    });
  });
})();
},{"./libraryMenu.js":"libraryMenu.js"}],"../../../../../../../../AppData/Roaming/npm/node_modules/parcel/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "61012" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["../../../../../../../../AppData/Roaming/npm/node_modules/parcel/src/builtins/hmr-runtime.js","task.js"], null)
//# sourceMappingURL=/task.js.map