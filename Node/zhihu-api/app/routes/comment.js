const jwt = require('koa-jwt')
const Router = require('koa-router')
const router = new Router({ prefix: '/question/:question_id/answer/:answer_id/comments' })
const { 
    find, create, findById, update, del,
    checkCommentExist, checkCommentUser
} = require('../controllers/comment')
const { secret } = require('../config')

const auth = jwt({ secret });

router.get('/', find)
router.post('/', auth, create)
router.get('/:id', checkCommentExist, findById)
router.patch('/:id', auth, checkCommentExist, checkCommentUser, update)
router.delete('/:id', auth, checkCommentExist, checkCommentUser, del)

module.exports = router