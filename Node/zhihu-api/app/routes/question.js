const jwt = require('koa-jwt')
const Router = require('koa-router')
const router = new Router({ prefix: '/question' })
const { 
    find, create, findById, update, del,
    checkQuestionsExist, checkQuestionUser
} = require('../controllers/questions')
const { secret } = require('../config')

const auth = jwt({ secret });

router.get('/', find)
router.post('/', auth, create)
router.get('/:id', checkQuestionsExist, findById)
router.patch('/:id', auth, checkQuestionsExist, checkQuestionUser, update)
router.delete('/:id', auth, checkQuestionsExist, checkQuestionUser, del)

module.exports = router