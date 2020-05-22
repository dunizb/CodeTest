'use strict';

module.exports = app => {
  const { router, controller } = app;
  const auth = app.middleware.adminauth();
  router.get('/admin/home', auth, controller.admin.main.home);
  router.post('/admin/checkLogin', controller.admin.main.checkLogin);
};
