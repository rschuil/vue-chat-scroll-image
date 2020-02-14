(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global['vue-chat-scroll-image'] = factory());
}(this, (function () { 'use strict';

/**
 * @name VueJS vChatScroll (vue-chat-scroll)
 * @description Monitors an element and scrolls to the bottom if a new child is added
 * @author Theodore Messinezis <theo@theomessin.com>
 * @file v-chat-scroll  directive definition
 */

var emit = function emit(vnode, name, data) {
  var handlers = vnode.data && vnode.data.on || vnode.componentOptions && vnode.componentOptions.listeners;

  if (handlers && handlers[name]) {
    handlers[name].fns(data);
  }
};

var vScrollDown = {
  bind: function bind(el, binding, vnode) {
    var scrolled = false;
    var timeout = void 0;

    el.addEventListener('scroll', function (e) {
      if (timeout) window.clearTimeout(timeout);
      timeout = window.setTimeout(function () {
        scrolled = el.scrollTop + el.clientHeight + 1 < el.scrollHeight;
        if (el.scrollTop < 10) {
          emit(vnode, 'scroll-top', "123");
        }
      }, 200);
    });

    var ro = new ResizeObserver(function (e) {
      if (!scrolled) {
        el.scrollTop = el.scrollHeight - el.clientHeight;
      }
    });
    ro.observe(el);
    ro.observe(el.querySelector('ul'));
  },
  inserted: function inserted(el, binding) {
    el.scrollTop = el.scrollHeight - el.clientHeight;
  }
};

/**
 * @name VueJS vChatScroll (vue-chat-scroll)
 * @description Monitors an element and scrolls to the bottom if a new child is added
 * @author Theodore Messinezis <theo@theomessin.com>
 * @file vue-chat-scroll plugin definition
 */

var VueChatScroll = {
  install: function install(Vue, options) {
    Vue.directive('chat-scroll', vScrollDown);
  }
};

if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(VueChatScroll);
}

return VueChatScroll;

})));
