"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = element;

function element(selector) {
  if (selector instanceof HTMLElement) {
    return selector;
  } else if (selector instanceof Window) {
    return selector;
  } else {
    return document.querySelector(selector);
  }
}
