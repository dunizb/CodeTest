import Vue from 'vue'
import MyRouter from './my-router'
import routes from './routes'

Vue.use(MyRouter)

const mode = sessionStorage.getItem('router-mode')
console.log('router-mode', mode)
export default new MyRouter({
  mode,
  routes
})
