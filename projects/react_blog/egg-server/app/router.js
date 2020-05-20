'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  require('./router/blog')(app);
  require('./router/admin')(app);
};
