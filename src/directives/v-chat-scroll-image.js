/**
 * @name VueJS vChatScroll (vue-chat-scroll)
 * @description Monitors an element and scrolls to the bottom if a new child is added
 * @author Theodore Messinezis <theo@theomessin.com>
 * @file v-chat-scroll  directive definition
 */

const emit = (vnode, name, data) => {
  var handlers = (vnode.data && vnode.data.on) ||
    (vnode.componentOptions && vnode.componentOptions.listeners);

  if (handlers && handlers[name]) {
    handlers[name].fns(data);
  }
}

const vScrollDown = {
  bind: (el, binding, vnode) => {
    let scrolled = false;
    let timeout;

    el.addEventListener('scroll', e => {
      if (timeout) window.clearTimeout(timeout);
      timeout = window.setTimeout(function() {
        scrolled = el.scrollTop + el.clientHeight + 1 < el.scrollHeight;
        if (el.scrollTop < 10) {
          emit(vnode, 'scroll-top', "123");
        }
      }, 200);
    });

    const ro = new ResizeObserver(function(e) {
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

export default vScrollDown;
