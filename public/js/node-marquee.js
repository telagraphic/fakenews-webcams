"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _element = _interopRequireDefault(require("./element"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _createForOfIteratorHelper(o) { if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (o = _unsupportedIterableToArray(o))) { var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var it, normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(n); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

/**
 * @typedef Prop
 * @property {string|HTMLElement} [selector=.node-marquee] The selector of the element or the elements itself.
 * @property {number} [speed=1] The amount of pixels to move with each frame.
 * @property {boolean} [autoplay=true] If you want the marquee element to start moving after its initializing.
 */

/**
 * @typedef Returns
 * @property {Function} play
 * @property {Function} pause
 */

/**
 * @author Anthony Bobrov {@link https://github.com/antonbobrov/node-marquee.git| GitHub}
 *
 * Custom Marquee element with JavaScript.
 * @param {Prop} prop
 * @returns {Returns} Returns a set of methods.
 */
function nodeMarquee() {
  var prop = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  // extend properties
  var DEFAULT_PROP = {
    selector: '.node-marquee',
    speed: 1,
    autoplay: true
  };
  prop = Object.assign(DEFAULT_PROP, prop); // check if the element exists

  var OUTER = (0, _element["default"])(prop.selector);

  if (OUTER == null) {
    return false;
  }

  OUTER.classList.add("node-marquee"); // get inner text

  var text = OUTER.innerText; // quantity of elements

  var quantity = 0,
      elements = []; // vars

  var translateX = 0,
      isPlaying = false;
  var MIN_AMOUNT = 5; // observe changes in DOM

  var observer = false;

  function observeMutations() {
    // observer config
    var config = {
      childList: true
    }; // oserver callback

    var callback = function callback(mutationsList) {
      var _iterator = _createForOfIteratorHelper(mutationsList),
          _step;

      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var mutation = _step.value;

          if (mutation.type === 'childList') {
            text = OUTER.innerText;
            create();
          }
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }
    }; // create the observer


    observer = new MutationObserver(callback);
    observer.observe(OUTER, config);
  }

  function disconnectMutations() {
    if (observer) {
      observer.disconnect();
    }
  } // create elements


  create(); // add a resize event

  var RESIZE_LISTENER_FUNCTION = create.bind(this);
  window.addEventListener("resize", RESIZE_LISTENER_FUNCTION, false); // animation frame

  var animationFrame = false;

  if (prop.autoplay) {
    play();
  } // Create elements


  function create() {
    // disable mutation observer
    disconnectMutations(); // clear outer

    quantity = 0;
    elements = [];
    OUTER.innerHTML = ''; // apply styles to the outer

    OUTER.style.position = 'relative';
    OUTER.style.width = '100%';
    OUTER.style.overflow = 'hidden';
    OUTER.style.whiteSpace = 'nowrap'; // create first element

    var firstEl = createElement(); // calculate how much elements we need to create in addition to the first one

    var width = firstEl.clientWidth;

    if (width < OUTER.clientWidth) {
      quantity = Math.ceil(OUTER.clientWidth / width);
    }

    if (quantity < MIN_AMOUNT) {
      quantity = MIN_AMOUNT;
    }

    for (var i = 0; i < quantity - 1; i++) {
      createElement(true, true);
    } // redraw


    draw(); // enable mutation observer

    observeMutations();
  }

  function createElement() {
    var absolute = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
    var appendWhitespace = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
    var className = 'node-marquee__el';
    var el = document.createElement("div");
    el.classList.add(className);

    if (appendWhitespace) {
      el.innerHTML = '&nbsp;' + text;
    } else {
      el.innerHTML = text;
    }

    if (absolute) {
      el.style.position = 'absolute';
      el.style.top = '0';
      el.style.left = '0';
    }

    el.style.display = 'inline-block';
    OUTER.appendChild(el); // get position

    elements.push(el);
    return el;
  } // Rendering


  function render() {
    draw();

    if (isPlaying) {
      animationFrame = window.requestAnimationFrame(render.bind(this));
    }
  } // Draw Elements


  function draw() {
    translateX += prop.speed;
    var moveToEnd = false;
    var w = 0;

    for (var i = 0; i < quantity; i++) {
      var el = elements[i];
      var t = w - translateX;
      w += el.clientWidth;
      el.style.transform = "translate(".concat(t, "px, 0)");

      if (t < el.clientWidth * -1) {
        moveToEnd = el;
      }
    }

    if (moveToEnd) {
      elements.push(elements.splice(elements.indexOf(moveToEnd), 1)[0]);
      translateX -= moveToEnd.clientWidth;
    }
  } // Play the animation frame


  function play() {
    if (!animationFrame) {
      isPlaying = true;
      animationFrame = window.requestAnimationFrame(render.bind(this));
    }
  } // Pause the animation frame


  function pause() {
    isPlaying = false;

    if (animationFrame) {
      window.cancelAnimationFrame(animationFrame);
      animationFrame = false;
    }
  } // Destroy the marquee


  function destroy() {
    pause();
    disconnectMutations();
    OUTER.innerHTML = text;
  }

  return {
    play: play.bind(this),
    pause: pause.bind(this),
    destroy: destroy.bind(this)
  };
}

var _default = nodeMarquee;
exports["default"] = _default;
