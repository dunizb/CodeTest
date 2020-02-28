'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
  async index() {
    const { ctx } = this;
    // const result = await this.app.mysql.get('blog_content', {});
    // console.log(result);
    ctx.body = 'API接口';
  }
}

module.exports = HomeController;
