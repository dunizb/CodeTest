class HistoryRouter{

}

class VueRouter {
    constructor(options) {
        this.mode = options.mode || 'hash';
        this.history = new HistoryRouter();
    }
    init() {
        if (this.mode === 'hash') {
            location.hash ? "" : location.hash = '/';
            window.addEventListener('load', function(){
                this.history.current = location.hash.slice(1);
            })
            window.addEventListener('hashchange', function(){
                this.history.current = location.hash.slice(1);
            })
        } else {
            window.addEventListener('load', function(){
                this.history.current = location.pathname;
            })
            window.addEventListener('hashchange', function(){
                this.history.current = location.pathname;
            })
        }
    }
}

module.exports = VueRouter;