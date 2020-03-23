'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
  async index() {
    const { ctx } = this;
    ctx.body = 'api hi';
  }

  async getArticleList() {
    const { ctx } = this;
    const sql = `
    select 
    article.id,article.title , article.content, article.type_id,article.introduce,article.addTime,article.view_count,
		article_type.typeName
    from article 
    LEFT JOIN article_type 
    ON article_type.id = article.type_id
    `;

    const results = await this.app.mysql.query(sql);
    ctx.body = { data: results };
  }
}

module.exports = HomeController;
