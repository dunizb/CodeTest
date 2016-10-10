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

  // 根据用户名密码查询一个用户
  static findOne(username, password, callback){
    db.query('select * from users where username = ? and password = ?',
      [username,password], (err, rows) => {
         if(err) return typeof callback === 'function ' && callback(err)
         typeof callback === 'function' && (rows.length<=0 && callback(null, null) || rows.length ==1 && callback(null, User.create(rows[0])))
    })
  }

  // 保存或者修改数据
  save(callback){
      let sql = this.id? 'update users set ? where id = ?':
                          'insert into users set ?'
      db.query(sql,[this , this.id] , (err, result) =>{
      if(result.affectedRows>0){
       this.id = this.id || result.insertId
       callback(null,true)
      }else{
        callback(null ,false)
      }
    })
  }

  // 根据id删除users数据
  delete(callback){
    // 伪删除
    db.query('update users set status = delete where id = ?',
      this.id, (err , result) => {
        if(err) return  typeof callback === 'function' && callback(err)

        typeof callback === 'function' && (result.affectedRows>=1 && callback(null ,true)|| result.affectedRows<=0 && callback(null ,false))
      })
  }
}

module.exports = User