const Router = require('koa-router')

// const Users = require('../dbs/models/users');

const router = new Router({ prefix: '/api/users' })

/**
 * 注册接口
 * @param {username} 用户名
 * @param {password} 密码
 */
router.post('/reg', async (ctx, next) => {
  ctx.body = { status: 'ok' }
})

module.exports = router
