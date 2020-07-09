
const Answer = require('../modules/answers')

class AnswerCtr {
    async find(ctx) {
        const { pageSize = 3, q = '' } = ctx.query;
        const page_no = Math.max(ctx.query.pageNo * 1, 1) - 1;
        const page_size = Math.max(pageSize * 1, 1);
        const query = new RegExp(q)
        ctx.body = await Answer
            .find({ content: query, question_id: ctx.params.question_id })
            .limit(page_size).skip(page_no * page_size);
    }
    async checkAnswerExist(ctx, next) {
        const answer = await Answer.findById(ctx.params.id).select('+answer_user');
        if (!answer) { ctx.throw(404, '答案不存在'); }
        // 只有在删改查答案时校验此逻辑，赞和踩不校验
        if (ctx.params.question_id && answer.question_id !== ctx.params.question_id) { ctx.throw(404, '该问题下没有此答案'); }
        ctx.state.answer = answer;
        await next();
    }
    async findById(ctx) {
        const { fields = '' } = ctx.query;
        const selectFields = fields.split(';').filter(f => f).map(f => ' +' + f).join('+');
        const answers = await Answer.findById(ctx.params.id).select(selectFields).populate('answer_user');
        if (!answers) { ctx.throw(404); }
        ctx.body = answers; 
    }
    async create(ctx) {
        ctx.verifyParams({
            content: { type: 'string', required: true }
        });
        const answer = await new Answer({ 
            ...ctx.request.body, 
            answer_user: ctx.state.user._id,
            question_id: ctx.params.question_id 
        }).save();
        ctx.body = answer;
    }
    async checkAnswerUser(ctx, next) {
        const { answer, user } = ctx.state;
        if (answer.answer_user.toString() !== user._id) { ctx.throw(403, '没有权限') }
        await next();
    }
    async update(ctx) {
        ctx.verifyParams({
            content: { type: 'string', required: false }
        });
        await ctx.state.answer.update(ctx.request.body);
        ctx.body = ctx.state.answer;
    }
    async del(ctx) {
        await Answer.findByIdAndRemove(ctx.params.id);
        ctx.status = 204
    }
}

module.exports = new AnswerCtr();