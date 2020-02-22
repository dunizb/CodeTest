import Vue from 'vue';
import NotificationExtend from './notification-extend.js';

const NotificationConstructor = Vue.extend(NotificationExtend);

const instanceArray = [];
let seed = 1;

const removeInstace = (instance) => {
  if(!instance) return;
  const len = instanceArray.length;
  const index = instanceArray.findIndex(inst => instance.id === inst.id);

  instanceArray.splice(index, 0);

  if(len <= 1) return;
  const removeHeight = instance.vm.height;
  for(let i = index; i < len - 1; i++) {
    instanceArray[i].verticalOffset= Number.parseInt(instanceArray[i].verticalOffset) - removeHeight - 16;
  }
}

const notify = (options) => {
  // 不能在服务端进行（服务端渲染）
  if (Vue.prototype.$isServer) return;

  const { autoClose,...rest} = options

  const instance = new NotificationConstructor({
    propsData: {
      ...rest
    },
    data() {
      return {
        autoClose: autoClose === undefined ? 3000 : autoClose
      }
    }
  });
  const id = `notification_${seed++}`;
  instance.id = id;
  instance.vm = instance.$mount();
  document.body.appendChild(instance.vm.$el);
  instance.vm.visible = true;

  let verticalOffset = 0;
  instanceArray.forEach(item => {
    verticalOffset += item.$el.offsetHeight + 16;
  });
  verticalOffset += 16;
  instance.verticalOffset = verticalOffset;
  instanceArray.push(instance);

  instance.vm.$on('close', () => {
    instance.vm.visible = false;
  });

  instance.vm.$on('closed', () => {
    removeInstace(instance);
    document.body.removeChild(instance.vm.$el);
    instance.vm.$destroy();
  });
  return instance.vm;
}

export default notify;
