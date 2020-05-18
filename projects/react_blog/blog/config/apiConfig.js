const baseUrl = 'http://127.0.0.1:7001/blog'

const servicePath = {
  articleList: baseUrl + '/articleList',  // 首页接口
  articleDetail: baseUrl + '/articleDetail', // 详细页接口
  getTypeInfo: baseUrl + '/getTypeInfo', // 文章类别
  getListById: baseUrl + '/getListById', // 根据类别ID获得文章列表  
}

export default servicePath
