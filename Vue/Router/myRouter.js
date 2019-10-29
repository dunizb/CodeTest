class HistoryRoute {
    constructor() {
        this.current = null;
    }
}

class MyRouter {
    constructor(options) {
        this.mode = options.mode || 'hahs';
        this.routes = this.$options.routes || [];
        // 路由中需要存放当前的路径 需要状态
        this.history = new HistoryRoute;
        // 传递的路由表是数组，需要转化成{'/home': Home, '/about': About}格式
        this.routesMap = this.createdMap(this.routes)
        this.init(); // 开始初始化操作
    }

    init() {
        if (this.mode === 'hash') {
            // 先判断用户打开时有没有hash，没有就跳转到#/
            location.hash ? '' : location.hash = '/';
            window.addEventListener('load',() => {
                this.history.current = location.hash.slice(1); // slice(1) 去掉 # 号
            })
            window.addEventListener('hashchange', () => {
                this.history.current = location.hash.slice(1);
            })
        } else {
            window.addEventListener('load', () => {
                this.history.current = location.pathname;
            })
            window.addEventListener('popstate', () => {
                this.history.current = location.pathname;
            })
        }
    }
    // 每个路由对应的组件映射表
    createdMap(routes) {
        return routes.reduce((memo, current) => {
            memo[current.path] = current.compontent;
            return memo;
        }, {});
    }
}

// 使用Vue.use()就会调用install方法
MyRouter.install = function(Vue) {
    // 每个组件都有this.$router this.$route 所以需要mixin一下
    Vue.mixin({
        beforeCreate() { // 混合方法
            // this.$options可以拿到new Vue() 的参数 
            if (this.$options && this.$options.router) { // 定位根组件
                this._root = this; // 把当前实例挂载到_root上
                this._router = this.$options.router; // 把router实例挂载到_router上
                // history上current变化也会触发
                Vue.util.defineReactive(this, 'current',this._router.history);
            } else {
                // Vue组件的渲染顺序：父 -> 子 -> 孙子
                this._router = this.$parent._router;
            }
            
        },
    });

    // 全局注册Router的两个组件
    Vue.compontent('router-view', { // 根据当前的状态 current 对应相应的路由
        render(h) {
            // 拿到当前Router对应的组件，然后把组件渲染出去
            // 将 current 变成动态的 current的变化会影响视图的刷新
            let current = this._self._root._router.history.current;
            let routeMap = this._self._root._router.routesMap;
            return h(routeMap[current]);
        },
    });
}

export default MyRouter;