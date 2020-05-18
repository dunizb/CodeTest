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
    ON article_type.id = article.type_id`;

    const results = await this.app.mysql.query(sql);
    ctx.body = { data: results };
  }

  async getDetailById() {
    const { ctx } = this;
    const id = ctx.params.id;
    const sql = `
    select 
      article.id,article.title,article.type_id,article.introduce,article.content,
      DATE_FORMAT(article.create_time,'%Y-%m-%d %H:%i') as create_time,article.view_count,
      article_type.name as type_name
    FROM article 
    LEFT JOIN article_type 
    ON article_type.id = article.type_id
    WHERE article.id = ${id}`;
    const results = await this.app.mysql.query(sql);
    ctx.body = { data: results };
  }

  async getTypeInfo() {
    const { ctx } = this;
    const results = await this.app.mysql.select('article_type');
    ctx.body = { data: results };
  }


  // 根据类别ID获得文章列表
  async getListById() {
    const id = this.ctx.params.id;
    const sql = 'SELECT article.id,' +
      'article.title,' +
      'article.introduce,' +
      "DATE_FORMAT(article.create_time,'%Y-%m-%d %H:%i:%s' ) as create_time," +
      'article.view_count,' +
      'article_type.name as type_name ' +
      'FROM article LEFT JOIN article_type ON article.type_id = article_type.id ' +
      'WHERE article_type.id=' + id;
    const result = await this.app.mysql.query(sql);
    this.ctx.body = { data: result };
  }
}

module.exports = HomeController;
