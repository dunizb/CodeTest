/**
 * 评论
 */
const db = require('./db.js')
class Comment {
  constructor(id,author,author_email,author_ip,content,status,support,oppose,created ,post_id,parent_id,user_id){
    this.id = id
    this.author = author
    this.author_email = author_email
    this.author_ip = author_ip
    this.content = content
    this.status = status
    this.support = support
    this.oppose = oppose
    this.created  = created
    this.post_id = post_id
    this.parent_id = parent_id
    this.user_id = user_id
  }

  // 创建Comment的实例对象
  static create({id,author,author_email,author_ip,content,status,support,oppose,created ,post_id,parent_id,user_id}){
    return new Comment(id,author,author_email,author_ip,content,status,support,oppose,created ,post_id,parent_id,user_id)
  }

  // 得到所有评论
  static find(callback){
    db.query('select * from comments', (err, rows) => {
      if(err) return typeof callback === 'function' && callback(err)
      typeof callback === 'function' &&( rows.length<=0 &&callback(null, null) || rows.length>=1 && callback(null, rows.map(Comment.create)))
    })
  }

  // 保存数据
  save(callback){
    // inset into comments id = xx ,author ='xx'
    // 保存，一种新加,一种是更新
    // this指向当前对象
    let sql = this.id  ? 'update comments set ? where id = ?':
                          'insert into comments set ?'
    db.query(sql,[this , this.id] , (err, result) =>{
      // 插入数据，回调第个参数
      // result.
      // console.log(result);
      // if(result.affectedRows>0){
      //   callback(null , true)
      // }else{
      //   callback(null , false)
      // }
      // result.affectedRows? callback(null, true): callback(null, false)
      if(result.affectedRows>0){
       this.id = this.id || result.insertId
       callback(null,true)
      }else{
        callback(null ,false)
      }
    })
  }

  // 根据 id 删除评论数据
  delete(callback){
    // 伪删除
    db.query("update comments set status = 'delete' where id = ?",
      this.id, (err , result) => {
        if(err) return  typeof callback === 'function' && callback(err)

        typeof callback === 'function' && (result.affectedRows>=1 && callback(null ,true)|| result.affectedRows<=0 && callback(null ,false))
      })
  }

  // 分页获取数据
  //  page , count //  start , count
  static findLimit(page, pageSize, callback){
    db.query('select * from comments limit  ? , ?', [(page-1)*pageSize, pageSize] , (err ,rows) =>{
      if(err) return typeof callback === 'function' && callback(err)
      typeof callback === 'function' && (rows.length<=0 && callback(null , null)|| rows.length >=1 && callback(null , rows.map(Comment.create)))
    })
  }

  // 根据id获取一条评论
  findById(callback){
    db.query('select * from comments where id = ?',this.id , (err ,rows) => {
      if(err) typeof callback === 'function' && callback(err)
      typeof callback === 'function' &&( rows.length <=0&& callback(null ,null )|| rows.length == 1 && callback(null , Comment.create(rows[0])) ) 
    })
  }
}

module.exports = Comment