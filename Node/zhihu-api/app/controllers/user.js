const jsonwebtoken = require('jsonwebtoken')
const { secret } = require('../config')

const User = require('../modules/users')
const Question = require('../modules/questions')
const Answer = require('../modules/answers')

class UserCtr {
    async find(ctx) {
        ctx.body = await User.find();
    }
    async findById(ctx) {
        const { fields = '' } = ctx.query;
        const selectFields = fields.split(';').filter(f => f).map(f => ' +' + f).join(' +');
        const populateStr = fields.split(';').filter(f => f).map(f => {
            if (f === 'employments') {
                return 'employments.company employments.job'
            }
            if (f === 'educations') {
                return 'educations.school educations.major'
            }
            return f;
        }).join(' ');
        const user = await User.findById(ctx.params.id)
            .select(selectFields)
            .populate(populateStr);
        if (!user) { ctx.throw(404, '用户不存在')  } 
        ctx.body = user;
    }
    async create(ctx) {
        ctx.verifyParams({
            name: { type: 'string', required: true },
            password: { type: 'string', required: true }
        });
        const { name } = ctx.request.body;
        const repeateUser = await User.findOne({ name });
        if (repeateUser) { ctx.throw(409, '用户已经存在') }
        const user = await new User(ctx.request.body).save();
        ctx.body = user;
    }
    async checkOwner(ctx, next) {
        if (ctx.params.id !== ctx.state.user._id) {
            ctx.throw(403, '没有权限操作');
        }
        await next();
    }
    async update(ctx) {
        ctx.verifyParams({
            name: { type: 'string', required: false },
            password: { type: 'string', required: false },
            avatar_url: { type: 'string', required: false },
            gender: { type: 'string', required: false },
            headline: { type: 'string', required: false },
            locations: { type: 'array', itemType: 'string', required: false },
            business: { type: 'string', required: false },
            employments: { type: 'array', itemType: 'object', required: false },
            educations: { type: 'array', itemType: 'object', required: false }
        });
        const user = await User.findByIdAndUpdate(ctx.params.id, ctx.request.body);
        if (!user) { ctx.throw(404) }
        ctx.body = user;
    }
    async del(ctx) {
        const user = await User.findByIdAndRemove(ctx.params.id);
        if (!user) { ctx.throw(404, '用户不存在'); }
        ctx.status = 204
    }
    async login(ctx) {
        ctx.verifyParams({
            name: { type: 'string', required: true },
            password: { type: 'string', required: true }
        });
        const user = await User.findOne(ctx.request.body);
        if (!user) { ctx.throw(401, '用户名或密码不正确') };
        const { _id, name } = user;
        const token = jsonwebtoken.sign({ _id, name }, secret, { expiresIn: '1d' });
        ctx.body = { token };
    }
    async listFollowing(ctx) {
        const user = await User.findById(ctx.params.id).select('+following').populate('following');
        if (!user) { ctx.throw(404) };
        ctx.body = user.following;
    }
    async listFollowers(ctx) {
        const users = await User.find({ following: ctx.params.id });
        ctx.body = users
    }
    async checkUserExist(ctx, next) {
        const user = await User.findById(ctx.params.id);
        if (!user) { ctx.throw(404, '用户不存在'); }
        await next();
    }
    async follow(ctx) {
        const me = await User.findById(ctx.state.user._id).select('+following');
        console.log('me =>', me);
        const isHave = me.following.map(id => id.toString()).includes(ctx.params.id);
        if (!isHave) {
            me.following.push(ctx.params.id);
            me.save();
        }
        ctx.status = 204;
    }
    async unfollow(ctx) {
        const me = await User.findById(ctx.state.user._id).select('+following');
        const index = me.following.map(id => id.toString()).indexOf(ctx.params.id);
        if (index > -1) {
            me.following.splice(index, 1);
            me.save();
        }
        ctx.status = 204;
    }
    async listFollowingTopic(ctx) {
        const user = await User.findById(ctx.params.id).select('+followTopics').populate('followTopics');
        if (!user) { ctx.throw(404, '用户不存在') };
        ctx.body = user.followTopics;
    }
    async followTopics(ctx) {
        const me = await User.findById(ctx.state.user._id).select('+followTopics');
        console.log('me =>', me);
        const isHave = me.followTopics.map(id => id.toString()).includes(ctx.params.id);
        if (!isHave) {
            me.followTopics.push(ctx.params.id);
            me.save();
        }
        ctx.status = 204;
    }
    async unfollowTopics(ctx) {
        const me = await User.findById(ctx.state.user._id).select('+followTopics');
        const index = me.followTopics.map(id => id.toString()).indexOf(ctx.params.id);
        if (index > -1) {
            me.followTopics.splice(index, 1);
            me.save();
        }
        ctx.status = 204;
    }
    async listQuestions(ctx) {
        const questions = await Question.find({ question_user: ctx.params.id });
        ctx.body = questions;
    }
    // 列出喜欢的答案
    async listLikedAnswers(ctx) {
        const user = await User.findById(ctx.params.id).select('+likedAnswers').populate('likedAnswers');
        if (!user) { ctx.throw(404, '用户不存在') };
        ctx.body = user.likedAnswers;
    }
    async likeAnswer(ctx, next) {
        const me = await User.findById(ctx.state.user._id).select('+likedAnswers');
        console.log('me =>', me);
        const isHave = me.likedAnswers.map(id => id.toString()).includes(ctx.params.id);
        if (!isHave) {
            me.likedAnswers.push(ctx.params.id);
            me.save();
            await Answer.findByIdAndUpdate(ctx.params.id, { $inc: { vote_count: 1 } });
        }
        ctx.status = 204;
        await next();
    }
    async unlikeAnswer(ctx) {
        const me = await User.findById(ctx.state.user._id).select('+likedAnswers');
        const index = me.likedAnswers.map(id => id.toString()).indexOf(ctx.params.id);
        if (index > -1) {
            me.likedAnswers.splice(index, 1);
            me.save();
            await Answer.findByIdAndUpdate(ctx.params.id, { $inc: { vote_count: -1 } });
        }
        ctx.status = 204;
    } 
    // 列出踩过的答案
    async listDislikedAnswers(ctx) {
        const user = await User.findById(ctx.params.id).select('+dislikedAnswers').populate('dislikedAnswers');
        if (!user) { ctx.throw(404, '用户不存在') };
        ctx.body = user.dislikedAnswers;
    }
    async dislikeAnswer(ctx, next) {
        const me = await User.findById(ctx.state.user._id).select('+dislikedAnswers');
        console.log('me =>', me);
        const isHave = me.dislikedAnswers.map(id => id.toString()).includes(ctx.params.id);
        if (!isHave) {
            me.dislikedAnswers.push(ctx.params.id);
            me.save();
        }
        ctx.status = 204;
        await next();
    }
    async undislikeAnswer(ctx) {
        const me = await User.findById(ctx.state.user._id).select('+dislikedAnswers');
        const index = me.dislikedAnswers.map(id => id.toString()).indexOf(ctx.params.id);
        if (index > -1) {
            me.dislikedAnswers.splice(index, 1);
            me.save();
        }
        ctx.status = 204;
    }
}


module.exports = new UserCtr();