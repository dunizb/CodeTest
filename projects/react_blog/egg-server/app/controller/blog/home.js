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
      article.id,article.title , article.content, article.type_id,article.introduce,
      DATE_FORMAT(article.create_time,'%Y-%m-%d %H:%i') as create_time,article.view_count,
      article_type.name as type_name
    FROM article 
    LEFT JOIN article_type 
    ON article_type.id = article.type_id
    `;

    const results = await this.app.mysql.query(sql);
    ctx.body = { data: results };
  }

  async getDetailById() {
    const { ctx } = this;
    const id = ctx.query.id;
    console.log('id', id);
    const sql = `
    select 
      article.id,article.title,article.type_id,article.introduce,
      DATE_FORMAT(article.create_time,'%Y-%m-%d %H:%i') as create_time,article.view_count,
      article_type.name as type_name
    FROM article 
    LEFT JOIN article_type 
    ON article_type.id = article.type_id
    WHERE article.id = ${id}
    `;
    const results = await this.app.mysql.query(sql);
    ctx.body = { data: results };
  }

}

module.exports = HomeController;
