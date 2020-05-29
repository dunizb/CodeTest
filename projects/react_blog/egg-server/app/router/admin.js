'use strict';

module.exports = app => {
  const { router, controller } = app;
  // const adminauth = app.mindleware.adminauth();
  router.get('/admin/home', controller.admin.main.home);
  router.post('/admin/checkLogin', controller.admin.main.checkLogin);
  router.get('/admin/getTypeInfo', controller.admin.main.getTypeInfo);
  router.post('/admin/addArticle', controller.admin.main.addArticle);
};
