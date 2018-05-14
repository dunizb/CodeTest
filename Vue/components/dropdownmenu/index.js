var app = new Vue({
    el: '#app',
    data: {
        show: false
    },
    methods: {
        handleClose() {
            this.show = false;
        }
    }
});