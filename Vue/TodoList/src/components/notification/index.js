import Notification from './notification.vue';
import notify from './function.js';

export default (Vue) => {
  Vue.component(Notification.name, Notification);
  Vue.prototype.$notify = notify; // this.$notify()
}
