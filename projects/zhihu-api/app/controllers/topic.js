const Topic = require('../modules/topics')
const User = require('../modules/users')
const Question = require('../modules/questions')

class TopicCtr {
    async find(ctx) {
        const { pageSize = 3, q = '' } = ctx.query;
        const page_no = Math.max(ctx.query.pageNo * 1, 1) - 1;
        const page_size = Math.max(pageSize * 1, 1);
        ctx.body = await Topic.find({ 
            name: new RegExp(q) // 模糊查询
        }).limit(page_size).skip(page_no * page_size);
    }
    async findById(ctx) {
        const { fields = '' } = ctx.query;
        const selectFields = fields.split(';').filter(f => f).map(f => ' +' + f).join('+');
        const topic = await Topic.findById(ctx.params.id).select(selectFields);
        if (!topic) { ctx.throw(404); }
        ctx.body = topic; 
    }
    async checkTopicExist(ctx, next) {
        const topic = await Topic.findById(ctx.params.id);
        if (!topic) { ctx.throw(404, '话题不存在'); }
        await next();
    }
    async create(ctx) {
        ctx.verifyParams({
            name: { type: 'string', required: true },
            avatar_url: { type: 'string', required: false},
            introduaction: { type: 'string', required: false},
        });
        const topic = await new Topic(ctx.request.body).save();
        ctx.body = topic;
    }
    async update(ctx) {
        ctx.verifyParams({
            name: { type: 'string', required: false },
            avatar_url: { type: 'string', required: false},
            introduaction: { type: 'string', required: false},
        });
        const topic = await Topic.findByIdAndUpdate(ctx.params.id, ctx.request.body);
        ctx.body = topic;
    }
    async listTopicFollowers(ctx) {
        const users = await User.find({ followTopics: ctx.params.id });
        ctx.body = users
    }
    async listQuestions(ctx) {
        const questions = await Question.find({ topics: ctx.params.id });
        ctx.body = questions;
    }
}

module.exports = new TopicCtr();