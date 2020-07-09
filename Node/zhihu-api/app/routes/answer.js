const jwt = require('koa-jwt')
const Router = require('koa-router')
const router = new Router({ prefix: '/question/:question_id/answers' })
const { 
    find, create, findById, update, del,
    checkAnswerExist, checkAnswerUser
} = require('../controllers/answer')
const { secret } = require('../config')

const auth = jwt({ secret });

router.get('/', find)
router.post('/', auth, create)
router.get('/:id', checkAnswerExist, findById)
router.patch('/:id', auth, checkAnswerExist, checkAnswerUser, update)
router.delete('/:id', auth, checkAnswerExist, checkAnswerUser, del)

module.exports = router