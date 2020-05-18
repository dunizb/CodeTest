'use strict';

module.exports = app => {
  const { router, controller } = app;
  router.get('/blog/index', controller.blog.home.index);
  router.get('/blog/articleList', controller.blog.home.getArticleList);
  router.get('/blog/articleDetail/:id', controller.blog.home.getDetailById);
  router.get('/blog/getTypeInfo/', controller.blog.home.getTypeInfo);
  router.get('/blog/getListById/:id', controller.blog.home.getListById);
};
