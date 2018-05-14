Vue.directive('clickoutside', {
    bind(el, binding, vnode) {
        function documentHandle(e) {
            if(el.contains(e.target)) {
                return false;
            }
            if(binding.expression) {
                binding.value(e);
            }
        }
        el.__vueClickOutSide__ = documentHandle;
        document.addEventListener('click', documentHandle);
    },
    unbind(el, binding) {
        document.removeEventListener('click', el.__vueClickOutSide__);
        delete el.__vueClickOutSide__;
    }
});