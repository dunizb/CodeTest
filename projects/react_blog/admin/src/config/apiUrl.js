const baseUrl = 'http://127.0.0.1:7001/admin'

const servicePath = {
  checkLogin: baseUrl + '/checkLogin',  //  检查用户名密码是否正确
  getTypeInfo: baseUrl + '/getTypeInfo',  //  获得文章类别信息
  addArticle: baseUrl + '/addArticle',  //  添加文章
}

export default servicePath
