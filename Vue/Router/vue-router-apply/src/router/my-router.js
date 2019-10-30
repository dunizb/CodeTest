/* eslint-disable no-unused-expressions */
// 路由里面主要有 mode
// router-link router-view
// this.$router this.$route
class HistoryRoute {
  constructor () {
    this.current = null
  }
}

class MyRouter {
  constructor (options) {
    this.mode = options.mode || 'hash'
    this.routes = options.routes || []
    // 你传递的路由表是一个数组  [{ path: '/home', component: Home }]
    // 要转化成 => { '/home': Home, '/about': About }
    this.routesMap = this.createMap(this.routes)
    // console.log('this.routesMap', this.routesMap)
    // 路由中需要存放强调的路径
    // eslint-disable-next-line new-parens
    this.history = new HistoryRoute
    this.init()
  }

  createMap (routes) {
    return routes.reduce((memo, current) => {
      memo[current.path] = current.component
      return memo
    }, {})
  }

  init () {
    if (this.mode === 'hash') {
      // 先判断用户打开时有没有hash，没有就跳转到#/
      location.hash ? '' : location.hash = '/'
      window.addEventListener('load', () => {
        this.history.current = location.hash.slice(1) // slice(1) 去掉 # 号
      })
      window.addEventListener('hashchange', () => {
        this.history.current = location.hash.slice(1)
      })
    } else {
      window.addEventListener('load', () => {
        this.history.current = location.pathname
      })
      window.addEventListener('popstate', () => {
        this.history.current = location.pathname
      })
    }
  }
}

// 使用Vue.use就回调用install 方法
MyRouter.install = function (Vue, opts) {
  // 每个组件都有this.$router this.$route 所以需要mixin一下
  Vue.mixin({
    beforeCreate () { // 混合方法
      // 获取组件的属性名字
      console.log('this.$options.name', this.$options.name)
      if (this.$options && this.$options.router) { // 定位根组件
        this._root = this // 把当前实例挂载到_root上
        this._router = this.$options.router // 把router实例挂载到_router上
        // observer方法，history上current变化也会触发
        // this.xxxx = this._router.history
        Vue.util.defineReactive(this, 'xxxx', this._router.history)
      } else {
        // Vue组件的渲染顺序：父 -> 子 -> 孙子
        // 如果想获取唯一的路由实例: this._root._router
        this._root = this.$parent._root
      }
      Object.defineProperty(this, '$router', { // Router的实例
        get () {
          return this._root._router
        }
      })
      Object.defineProperty(this, '$route', { // current属性
        get () {
          return {
            // 当前路由所在的状态
            current: this._root._router.history.current
          }
        }
      })
    }
  })

  Vue.component('router-link', {
    props: {
      to: String,
      tag: {
        type: String,
        default: 'a'
      }
    },
    methods: {
      handleClick (e) {
        e.preventDefault()
        let mode = this._self._root._router.mode
        if (mode === 'hash') {
          location.hash = this.to
        } else {
          history.pushState({}, null, this.to)
          location.pathname = this.to
        }
      }
    },
    render (h) {
      let mode = this._self._root._router.mode
      let tag = this.tag
      return (
        <tag on-click={this.handleClick} href={mode === 'hash' ? `#${this.to}` : this.to}>
          { this.$slots.default }
        </tag>
      )
    }
  })
  Vue.component('router-view', { // 根据当前的状态 current 路由表 {'/about': About}
    render (h) {
      // 如何将current变成动态的,current变化应该要影响视图刷新
      let current = this._self._root._router.history.current
      let routesMap = this._self._root._router.routesMap
      console.log('current :', current)
      console.log('routesMap :', routesMap)
      return h(routesMap[current])
    }
  })
}
export default MyRouter
