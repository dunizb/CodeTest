import Router from 'vue-router';

import IndexPage from '@/pages/index';

export default new Router({
  mode: 'history',
  routers: [
    {
      path: '/',
      redirect: '/IndexPage'
    }
  ]
});
