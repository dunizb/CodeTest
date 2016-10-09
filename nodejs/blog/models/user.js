/**
 * 用户
 *
 */

const db = require('./db.js')

class User {
  constructor(id,slug,username,password,nickname,email,status,created,role,token){
    this.id = id
    this.slug = slug
    this.username = username
    this.password = password
    this.nickname = nickname
    this.email = email
    this.status = status
    this.created = created
    this.role = role
    this.token = token
  }

  // 创建当前User的实例对象
  static create({id,slug,username,password,nickname,email,status,created,role,token}){
    // 解构的使用
    return new User(id,slug,username,password,nickname,email,status,created,role,token)
  }

  // 查询用户
  static findUser(id, callback){
     db.query('select * from users where id = ?', id ,(err ,rows ) =>{
      if(err)  return typeof callback === 'function' && callback(err)

      if(rows.lenght==0){
          // 到这一步，即没有错误，也没有查询到数据
         typeof callback === 'function' && callback(null, null)
      }else{
         // var row = rows[0]
         // var user = User.create(row)

         typeof callback === 'function' && callback(null, rows.map(User.create))
      }

     })
  }
}

module.exports = User