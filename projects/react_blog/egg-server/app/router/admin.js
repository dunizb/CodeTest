'use strict';

module.exports = app => {
  const { router, controller } = app;
  router.get('/admin/home', controller.admin.main.home);
  router.post('/admin/checkLogin', controller.admin.main.checkLogin);
};
