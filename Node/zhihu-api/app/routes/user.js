// const jsonwebtoken = require('jsonwebtoken')
const jwt = require('koa-jwt')
const Router = require('koa-router')
const router = new Router({ prefix: '/users' })
const { 
    find, findById, create, update, del, login, checkOwner,
    listFollowing, checkUserExist, follow, unfollow, listFollowers,
    followTopics, unfollowTopics, listFollowingTopic, listQuestions,
    listLikedAnswers, likeAnswer, unlikeAnswer, 
    listDislikedAnswers, dislikeAnswer, undislikeAnswer
} = require('../controllers/user')

const { checkTopicExist } = require('../controllers/topic')
const { checkAnswerExist } = require('../controllers/answer')

const { secret } = require('../config')

const auth = jwt({ secret });
// 用户增删改查
router.get('/', find)
router.post('/', create)
router.get('/:id', findById)
router.patch('/:id', auth, checkOwner, update)
router.delete('/:id', auth, checkOwner, del)

// 登录
router.post('/login', login)

// 关注相关
router.get('/:id/following', listFollowing)
router.get('/:id/followers', listFollowers)
router.put('/follow/:id', auth, checkUserExist, follow)
router.delete('/unfollow/:id', auth, checkUserExist, unfollow)

// 关注话题相关
router.get('/:id/followTopics', listFollowingTopic)
router.put('/followTopic/:id', auth, checkTopicExist, followTopics)
router.delete('/unfollowTopic/:id', auth, checkTopicExist, unfollowTopics)
router.get('/:id/questions', listQuestions)

// 答案的踩、赞相关
router.get('/:id/like_answers', listLikedAnswers)
router.put('/like_answers/:id', auth, checkAnswerExist, likeAnswer)
router.delete('/like_answers/:id', auth, checkAnswerExist, unlikeAnswer)
router.get('/:id/dislike_answers', listDislikedAnswers)
router.put('/dislike_answers/:id', auth, checkAnswerExist, dislikeAnswer)
router.delete('/dislike_answers/:id', auth, checkAnswerExist, undislikeAnswer)

module.exports = router