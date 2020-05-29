'use strict';

const Controller = require('egg').Controller;

class MainController extends Controller {

  async home() {
    // 首页的文章列表数据
    this.ctx.body = 'hi api';
  }

  // 判断用户名密码是否正确
  async checkLogin() {
    const { body } = this.ctx.request;
    const userName = body.userName;
    const password = body.password;
    const sql = `SELECT user_name FROM admin_user WHERE user_name = '${userName}' AND password = '${password}'`;

    const res = await this.app.mysql.query(sql);
    if (res.length > 0) {
      // 登录成功,进行session缓存
      const openId = new Date().getTime();
      this.ctx.session.openId = { openId };
      this.ctx.body = { data: '登录成功', openId };

    } else {
      this.ctx.body = { data: '登录失败' };
    }
  }

  // 后台文章分类信息
  async getTypeInfo() {
    const resType = await this.app.mysql.select('article_type');
    this.ctx.body = { data: resType };
  }

  // 添加文章
  async addArticle() {
    const tmpArticle = this.ctx.request.body;
    const result = await this.app.mysql.insert('article', tmpArticle);
    const isSuccess = result.affectedRows === 1;
    const insertId = result.insertId;
    this.ctx.body = { isSuccess, insertId };
  }

}

module.exports = MainController;
