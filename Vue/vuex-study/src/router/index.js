import Router from 'vue-router';

import Apple from '@/components/apple';
import Banana from '@/components/banana';

export default new Router({
  mode: 'history',
  routers: [
    {
      path: '/',
      redirect: '/apple'
    },
    {
      path: '/apple',
      component: Apple
    },
    {
      path: '/banana',
      component: Banana
    }
  ]
});
