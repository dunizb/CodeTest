const config = {
  database: 'mongodb://127.0.0.1:27017/shop',
  redis: {
    get host() {
      return '127.0.0.1'
    },
    get port() {
      return 6379
    }
  }
}

module.exports = config
