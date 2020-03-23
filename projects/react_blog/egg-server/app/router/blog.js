'use strict';

module.exports = app => {
  const { router, controller } = app;
  router.get('/blog/index', controller.blog.home.index);
};
