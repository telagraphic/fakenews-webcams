/**
 * Minified by jsDelivr using Terser v3.14.1.
 * Original file: /npm/dynamic-marquee@1.2.2/dist/dynamic-marquee.js
 *
 * Do NOT use SRI with dynamically generated files! More information: https://www.jsdelivr.com/using-sri-with-dynamic-files
 */
!function(e,t){"object"==typeof exports&&"undefined"!=typeof module?t(exports):"function"==typeof define&&define.amd?define(["exports"],t):t((e=e||self).dynamicMarquee={})}(this,function(e){"use strict";function t(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function i(e,t){for(var i=0;i<t.length;i++){var n=t[i];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}function n(e,t,n){return t&&i(e.prototype,t),n&&i(e,n),e}var s={RIGHT:"right",DOWN:"down"};function r(e,t){return e[t===s.RIGHT?"offsetWidth":"offsetHeight"]}function o(e){window.setTimeout(function(){return e()},0)}function a(e){try{return e()}catch(e){o(function(){throw e})}}function h(e){if("string"==typeof e||"number"==typeof e){var t=document.createElement("div");return t.textContent=e+"",t}return e}var u=function(){function e(i,n,r){t(this,e);var o=document.createElement("div");o.style.display="block",o.style.position="absolute",o.style.margin="0",o.style.padding="0",o.style[this._direction===s.RIGHT?"top":"left"]="0",o.style.whiteSpace="nowrap",o.style.willChange="auto",o.appendChild(i),this._$container=o,this._$el=i,this._direction=n,this._rateWhenAppended=r}return n(e,[{key:"getSize",value:function(){var e=(arguments.length>0&&void 0!==arguments[0]?arguments[0]:{}).inverse,t=void 0!==e&&e,i=this._direction;return t&&(i=i===s.RIGHT?s.DOWN:s.RIGHT),r(this._$container,i)}},{key:"setOffset",value:function(e){this._direction===s.RIGHT?this._$container.style.transform="translateX(".concat(e,"px)"):this._$container.style.transform="translateY(".concat(e,"px)")}},{key:"enableAnimationHint",value:function(e){this._$container.style.willChange=e?"transform":"auto"}},{key:"remove",value:function(){this._$container.remove()}},{key:"getContainer",value:function(){return this._$container}},{key:"getOriginalEl",value:function(){return this._$el}},{key:"getRateWhenAppended",value:function(){return this._rateWhenAppended}}]),e}(),l=function(){function e(i){t(this,e),this._size=i}return n(e,[{key:"getSize",value:function(){var e=(arguments.length>0&&void 0!==arguments[0]?arguments[0]:{}).inverse;if(void 0!==e&&e)throw new Error("Inverse not supported on virtual item.");return this._size}},{key:"setOffset",value:function(){}},{key:"enableAnimationHint",value:function(){}},{key:"remove",value:function(){}}]),e}(),f=function(){function e(i){var n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},r=n.rate,o=void 0===r?-25:r,a=n.upDown,h=void 0!==a&&a;t(this,e),this._rendering=!1,this._waitingForItem=!0,this._nextItemImmediatelyFollowsPrevious=!1,this._rate=o,this._direction=h?s.DOWN:s.RIGHT,this._onItemRequired=[],this._onItemRemoved=[],this._onAllItemsRemoved=[],this._leftItemOffset=0,this._containerSize=0,this._items=[],this._pendingItem=null;var u=document.createElement("div");u.style.position="relative",u.style.display="inline-block",this._$container=u,this._containerSizeInverse=null,this._direction===s.RIGHT?u.style.width="100%":u.style.height="100%",this._updateContainerSize(),i.appendChild(u),this._scheduleRender()}return n(e,[{key:"onItemRequired",value:function(e){this._onItemRequired.push(e)}},{key:"onItemRemoved",value:function(e){this._onItemRemoved.push(e)}},{key:"onAllItemsRemoved",value:function(e){this._onAllItemsRemoved.push(e)}},{key:"getNumItems",value:function(){return this._items.filter(function(e){return e instanceof u}).length}},{key:"setRate",value:function(e){!e!=!this._rate&&(this._enableAnimationHint(!!e),e&&this._scheduleRender()),this._rate=e}},{key:"getRate",value:function(){return this._rate}},{key:"clear",value:function(){var e=this;this._items.forEach(function(t){return e._removeItem(t)}),this._items=[],this._waitingForItem=!0,this._updateContainerSize()}},{key:"isWaitingForItem",value:function(){return this._waitingForItem}},{key:"appendItem",value:function(e){if(!this._waitingForItem)throw new Error("No room for item.");if(e=h(e),this._items.some(function(t){return t instanceof u&&t.getOriginalEl()===e}))throw new Error("Item already exists.");this._waitingForItem=!1,this._pendingItem=new u(e,this._direction,this._rate),this._pendingItem.enableAnimationHint(!!this._rate),this._scheduleRender()}},{key:"_removeItem",value:function(e){var t=this;o(function(){e.remove(),e instanceof u&&t._onItemRemoved.forEach(function(t){a(function(){return t(e.getOriginalEl())})})})}},{key:"_updateContainerSize",value:function(){var e=this._items.reduce(function(e,t){if(t instanceof l)return e;var i=t.getSize({inverse:!0});return i>e?i:e},0);this._containerSizeInverse!==e&&(this._containerSizeInverse=e,this._direction===s.RIGHT?this._$container.style.height="".concat(e,"px"):this._$container.style.width="".concat(e,"px"))}},{key:"_enableAnimationHint",value:function(e){this._items.forEach(function(t){return t.enableAnimationHint(e)})}},{key:"_scheduleRender",value:function(){var e=this;this._rendering?this._render():this._requestAnimationID||(this._lastUpdateTime=performance.now(),this._requestAnimationID=window.requestAnimationFrame(function(){return e._onRequestAnimationFrame()}))}},{key:"_onRequestAnimationFrame",value:function(){var e=this;if(this._requestAnimationID=null,this._rate&&(this._items.length||this._pendingItem)){var t=performance.now()-this._lastUpdateTime;this._scheduleRender(),this._rendering=!0;var i=this._rate*(t/1e3);this._leftItemOffset+=i,this._containerSize=r(this._$container,this._direction),a(function(){return e._render()}),this._rendering=!1}}},{key:"_render",value:function(){var e=this,t=this._containerSize;if(this._rate<0)for(;this._items.length;){var i=this._items[0].getSize();if(this._leftItemOffset+i>0)break;this._removeItem(this._items[0]),this._items.shift(),this._leftItemOffset+=i}var n=[],s=this._leftItemOffset;for(this._items.some(function(i,r){return s>=t?(e._rate>0&&e._items.splice(r).forEach(function(t){return e._removeItem(t)}),!0):(n.push(s),s+=i.getSize(),!1)}),this._pendingItem&&(this._$container.appendChild(this._pendingItem.getContainer()),this._rate<=0?(this._nextItemImmediatelyFollowsPrevious||(this._items.push(new l(Math.max(0,t-s))),n.push(s),s=t),n.push(s),s+=this._pendingItem.getSize(),this._items.push(this._pendingItem)):(!this._nextItemImmediatelyFollowsPrevious&&this._items.length&&this._leftItemOffset>0&&(this._items.unshift(new l(this._leftItemOffset)),n.unshift(0),this._leftItemOffset=0),this._leftItemOffset-=this._pendingItem.getSize(),n.unshift(this._leftItemOffset),this._items.unshift(this._pendingItem)),this._pendingItem=null);this._items[0]instanceof l;)n.shift(),this._items.shift(),this._leftItemOffset=n[0]||0;for(;this._items[this._items.length-1]instanceof l;)n.pop(),this._items.pop();if(n.forEach(function(t,i){return e._items[i].setOffset(t)}),this._updateContainerSize(),this._items.length||(this._leftItemOffset=0,o(function(){e._onAllItemsRemoved.forEach(function(e){a(function(){return e()})})})),this._nextItemImmediatelyFollowsPrevious=!1,!this._waitingForItem&&(this._rate<=0&&s<=t||this._rate>0&&this._leftItemOffset>=0)){this._waitingForItem=!0;var r,h=null;this._items.length&&(h=this._rate<=0?this._items[this._items.length-1]:this._items[0]),this._nextItemImmediatelyFollowsPrevious=h&&h.getRateWhenAppended()*this._rate>=0,this._onItemRequired.some(function(t){return a(function(){return!!(r=t({immediatelyFollowsPrevious:e._nextItemImmediatelyFollowsPrevious}))})}),r&&this.appendItem(r),this._nextItemImmediatelyFollowsPrevious=!1}}}]),e}(),m=function(e,t){var i,n={startString1:0,startString2:0,length:0},s=(i={},e.forEach(function(e,t){i[e]=i[e]||[],i[e].push(t)}),i),r=[];return t.forEach(function(e,t){var i,o=[];(s[e]||[]).forEach(function(e){(i=(e&&r[e-1]||0)+1)>n.length&&(n.length=i,n.startString1=e-i+1,n.startString2=t-i+1),o[e]=i}),r=o}),n};e.Marquee=f,e.loop=function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:[],i=arguments.length>2&&void 0!==arguments[2]?arguments[2]:null,n=-1,s=t.slice(),r=function(t){if(s.length&&e.isWaitingForItem()){var r=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:1,t=(n+e)%s.length;return{builder:s[t],index:t}}(),o=r.builder,a=r.index;n=a;var u=h(o());if(t&&i){var l=h(i()),f=document.createElement("div");l.style.display="inline",u.style.display="inline",e.getRate()<=0?(f.appendChild(l),f.appendChild(u)):(f.appendChild(u),f.appendChild(l)),u=f}e.appendItem(u)}};return e.onItemRequired(function(e){var t=e.immediatelyFollowsPrevious;return r(t)}),r(),{update:function(e){var t,i,o,a,h,u;t=s.map(function(e,t){var i=s.indexOf(e);return i<t?i:t}),i=e.map(function(e,t){return s.indexOf(e)}),o=m(t,i),a=o.startString1,h=o.startString2,u=o.length,n=n>=a&&n<a+u?n+(h-a):-1,s=e.slice(),r(!1)}}},Object.defineProperty(e,"__esModule",{value:!0})});
//# sourceMappingURL=/sm/4662183c70be6a0f420ccda31475af0f6a04689400f326c7ed6219b0ee8e1fa7.map
