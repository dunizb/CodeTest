'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
  async index() {
    const { ctx } = this;
    const result = await this.app.mysql.get('blog_content', {});
    ctx.body = result;
  }
}

module.exports = HomeController;
