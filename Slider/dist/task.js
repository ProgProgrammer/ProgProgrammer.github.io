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
})({"libraryMobileSlider.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.mobileSliderObject = void 0;
var mobileSliderObject = {};
exports.mobileSliderObject = mobileSliderObject;

mobileSliderObject.mobileSlider = function (i, mobileBlock, staticBlocks, timing, mainBlock, obj) {
  var htmlTags;
  var blockBullets;
  var trafficSlider = mainBlock.dataset.trafficSlider;

  if (mainBlock.dataset === "yes") {
    blockBullets = document.querySelectorAll(".window-block-pagination-block-bullet");
  }

  if (trafficSlider === "true") {
    mainBlock.dataset.trafficSlider = false;

    if (mainBlock.dataset.pagination === "yes" && mainBlock.dataset.paginationTimeout !== "yes") {
      mobileSliderObject.paginationMoving(i, obj);
    } else if (mainBlock.dataset.pagination === "yes" && mainBlock.dataset.paginationTimeout === "yes") {
      setTimeout(mobileSliderObject.paginationMoving, timing, i, obj);
    }
  } else {
    return;
  }

  if (i === 0) {
    htmlTags = staticBlocks[staticBlocks.length - 1].outerHTML;
    mobileBlock.insertAdjacentHTML("afterbegin", htmlTags);
    setTimeout(mobileSliderObject.deleteTag, timing, staticBlocks, i, mobileBlock, mainBlock, obj);

    if (/-/.test(mobileBlock.style.transform) === true) {
      obj.widthTransform -= staticBlocks[0].offsetWidth;
      mobileBlock.style.left = obj.widthTransform + "px";
      mobileBlock.style.transform = "translate3d(-" + obj.widthTransform + "px, 0px, 0px)";
    } else {
      obj.widthTransform += staticBlocks[0].offsetWidth;
      mobileBlock.style.left = "-" + obj.widthTransform + "px"; //console.log(obj.widthTransform);

      mobileBlock.style.transform = "translate3d(" + obj.widthTransform + "px, 0px, 0px)";
    }
  } else {
    htmlTags = staticBlocks[0].outerHTML;
    mobileBlock.insertAdjacentHTML("beforeend", htmlTags);
    setTimeout(mobileSliderObject.deleteTag, timing, staticBlocks, i, mobileBlock, mainBlock, obj);

    if (obj.widthTransform > 0 && /-/.test(mobileBlock.style.transform) === false) {
      //console.log(obj.widthTransform);
      obj.widthTransform -= staticBlocks[0].offsetWidth; //console.log(obj.widthTransform);

      mobileBlock.style.left = "-" + (obj.widthTransform + staticBlocks[0].offsetWidth) + "px";
      mobileBlock.style.transform = "translate3d(" + obj.widthTransform + "px, 0px, 0px)";
    } else {
      //console.log(mobileBlock.style.transform);
      //console.log(obj.widthTransform);
      obj.widthTransform += staticBlocks[0].offsetWidth; //console.log(obj.widthTransform);

      mobileBlock.style.left = obj.widthTransform - staticBlocks[0].offsetWidth + "px";
      mobileBlock.style.transform = "translate3d(-" + obj.widthTransform + "px, 0px, 0px)";
    }
  }
};

mobileSliderObject.paginationMoving = function (i, obj) {
  var bullets = document.querySelectorAll(".window-block-pagination-block-bullet");
  var bulletId = obj.paginationBullet;
  bullets[bulletId].style.backgroundColor = "grey";
  console.log(i);

  if (i === 0) {
    if (bulletId > 0) {
      bullets[bulletId - 1].style.backgroundColor = "white";
      obj.paginationBullet = bulletId - 1;
    } else {
      bullets[bullets.length - 1].style.backgroundColor = "white";
      obj.paginationBullet = bullets.length - 1;
    }
  } else if (i === 1) {
    if (bulletId < bullets.length - 1) {
      bullets[bulletId + 1].style.backgroundColor = "white";
      obj.paginationBullet = bulletId + 1;
    } else {
      bullets[0].style.backgroundColor = "white";
      obj.paginationBullet = 0;
    }
  }
};

mobileSliderObject.deleteTag = function (staticBlocks, i, mobileBlock, mainBlock, obj) {
  staticBlocks = document.querySelectorAll(".window-blocks");
  mainBlock.dataset.trafficSlider = true;

  if (staticBlocks.length > 1 && i === 0) {
    staticBlocks[staticBlocks.length - 1].remove(); //console.log(staticBlocks);
  } else if (obj.staticBlocksLength === 1 && i === 1 && staticBlocks[2] !== undefined && staticBlocks !== null) {
    staticBlocks[2].remove(); //console.log(i);
  } else if (obj.staticBlocksLength > 1) {
    staticBlocks[0].remove(); //console.log(i);
    //console.log(mobileBlock.style.left);
    //console.log(/-/.test(mobileBlock.style.left));

    if (/-/.test(mobileBlock.style.left) === true) {
      mobileBlock.style.left = "-" + (obj.widthTransform + staticBlocks[0].offsetWidth) + "px"; //console.log(mobileBlock.style.left);
    } else {
      mobileBlock.style.left = obj.widthTransform + staticBlocks[0].offsetWidth + "px"; //console.log(mobileBlock.style.left);
    }
  } else {
    return;
  }
};
},{}],"task.js":[function(require,module,exports) {
"use strict";

var _libraryMobileSlider = require("./libraryMobileSlider.js");

(function () {
  var mainBlock;
  var mobileBlock;
  var staticBlocks;
  var timing;
  var arrows;
  var autoTiming;
  var pagination;
  var autoDirection;
  var dataPagination;
  var bullet;
  var obj = {};
  obj.sliderInterval;
  obj.widthTransform = 0;
  obj.paginationBullet = 0;
  window.addEventListener('DOMContentLoaded', function () {
    mainBlock = document.querySelector(".window");
    timing = mainBlock.dataset.timing;
    autoTiming = mainBlock.dataset.autoTiming;
    autoDirection = mainBlock.dataset.autoDirection;
    dataPagination = mainBlock.dataset.pagination;
    mobileBlock = document.querySelector(".window-block");
    staticBlocks = document.querySelectorAll(".window-blocks");
    pagination = document.querySelector(".window-block-pagination");
    bullet = pagination.querySelector(".window-block-pagination-block-bullet");
    obj.staticBlocksLength = staticBlocks.length;
    arrows = document.querySelectorAll(".arrow");

    if (timing !== "") {
      mobileBlock.style.transitionDuration = timing + "ms";
    } else {
      timing = 500;
      mobileBlock.style.transitionDuration = timing + "ms";
    }

    createSlider(mainBlock, timing, mobileBlock, arrows);

    if (dataPagination === "yes") {
      if (staticBlocks.length > 1) {
        createPagination(staticBlocks, pagination, bullet);
      }
    }

    window.addEventListener('resize', function () {
      createSlider(mainBlock, timing, mobileBlock, arrows);
    });

    var _loop = function _loop(i) {
      arrows[i].addEventListener('click', function () {
        staticBlocks = document.querySelectorAll(".window-blocks");
        clearInterval(obj.sliderInterval);
        clearInterval(obj.sliderInterval);

        _libraryMobileSlider.mobileSliderObject.mobileSlider(i, mobileBlock, staticBlocks, timing, mainBlock, obj);

        sliderInterval(autoDirection, autoTiming, mobileBlock, timing, mainBlock);
      });
    };

    for (var i = 0; i < arrows.length; i++) {
      _loop(i);
    }

    sliderInterval(autoDirection, autoTiming, mobileBlock, timing, mainBlock);
  });

  var createSlider = function createSlider(mainBlock, timing, mobileBlock, arrows) {
    var widthBlock;
    staticBlocks = document.querySelectorAll(".window-blocks");
    var widthMainblock = mainBlock.offsetWidth;
    var heightMainblock = mainBlock.offsetHeight;

    for (var i = 0; i < staticBlocks.length; i++) {
      staticBlocks[i].style.width = widthMainblock + "px";
      staticBlocks[i].style.height = heightMainblock + "px";
    }

    for (var a = 0; a < staticBlocks.length; a++) {
      widthBlock = staticBlocks[a].offsetWidth;
    }

    for (var b = 0; b < arrows.length; b++) {
      arrows[b].style.top = heightMainblock / 2 - arrows[b].offsetHeight / 2 + "px";
    }
  };

  var createPagination = function createPagination(staticBlocks, pagination, bullet) {
    var htmlBullet;
    var paginationBlock = pagination.querySelector(".window-block-pagination-block");
    pagination.style.display = "flex";
    htmlBullet = bullet.outerHTML;

    for (var i = 0; i < staticBlocks.length - 1; i++) {
      paginationBlock.insertAdjacentHTML("afterbegin", htmlBullet);
    }

    var blockBullet = pagination.querySelectorAll(".window-block-pagination-block-bullet");
    blockBullet[0].style.backgroundColor = "white";
  };

  var sliderInterval = function sliderInterval(autoDirection, autoTiming, mobileBlock, timing, mainBlock) {
    var direction;

    if (autoDirection === "right" || autoDirection === "yes") {
      if (autoTiming === "yes") {
        direction = 1;
        autoTiming = 5000;
      } else if (autoTiming !== "") {
        direction = 1;
      }
    } else if (autoDirection === "left") {
      if (autoTiming === "yes") {
        direction = 0;
        autoTiming = 5000;
      } else if (autoTiming !== "") {
        direction = 0;
      }
    }

    obj.sliderInterval = setInterval(autoSlider, autoTiming, direction, mobileBlock, timing, mainBlock);
  };

  var autoSlider = function autoSlider(i, mobileBlock, timing, mainBlock) {
    staticBlocks = document.querySelectorAll(".window-blocks");

    _libraryMobileSlider.mobileSliderObject.mobileSlider(i, mobileBlock, staticBlocks, timing, mainBlock, obj);
  };
})();
},{"./libraryMobileSlider.js":"libraryMobileSlider.js"}],"../../../../../../../AppData/Roaming/npm/node_modules/parcel/src/builtins/hmr-runtime.js":[function(require,module,exports) {
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
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "62457" + '/');

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
},{}]},{},["../../../../../../../AppData/Roaming/npm/node_modules/parcel/src/builtins/hmr-runtime.js","task.js"], null)
//# sourceMappingURL=/task.js.map