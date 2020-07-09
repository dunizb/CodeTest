const Questions = require('../modules/questions')
const User = require('../modules/users')

class QuestionsCtr {
    async find(ctx) {
        const { pageSize = 3, q = '' } = ctx.query;
        const page_no = Math.max(ctx.query.pageNo * 1, 1) - 1;
        const page_size = Math.max(pageSize * 1, 1);
        const query = new RegExp(q)
        ctx.body = await Questions
            .find({ $or: [{ title: query }, { description: query }]})
            .limit(page_size).skip(page_no * page_size);
    }
    async checkQuestionsExist(ctx, next) {
        const question = await Questions.findById(ctx.params.id).select('+question_user');
        if (!question) { ctx.throw(404, '问题不存在'); }
        ctx.state.question = question;
        await next();
    }
    async findById(ctx) {
        const { fields = '' } = ctx.query;
        const selectFields = fields.split(';').filter(f => f).map(f => ' +' + f).join('+');
        const questions = await Questions.findById(ctx.params.id).select(selectFields).populate('question_user topics');
        if (!questions) { ctx.throw(404); }
        ctx.body = questions; 
    }
    async create(ctx) {
        ctx.verifyParams({
            title: { type: 'string', required: true },
            description: { type: 'string', required: false}
        });
        const questions = await new Questions({ ...ctx.request.body, question_user: ctx.state.user._id }).save();
        ctx.body = questions;
    }
    async checkQuestionUser(ctx, next) {
        const { question, user } = ctx.state;
        if (question.question_user.toString() !== user._id) { ctx.throw(403, '没有权限') }
        await next();
    }
    async update(ctx) {
        ctx.verifyParams({
            name: { type: 'string', required: false },
            description: { type: 'string', required: false}
        });
        await ctx.state.question.update(ctx.request.body);
        ctx.body = ctx.state.question;
    }
    async del(ctx) {
        await Questions.findByIdAndRemove(ctx.params.id);
        ctx.status = 204
    }
}

module.exports = new QuestionsCtr();