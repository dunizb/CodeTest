

const Comment = require('../modules/comments')

class CommentCtr {
    async find(ctx) {
        const { pageSize = 3, q = '' } = ctx.query;
        const page_no = Math.max(ctx.query.pageNo * 1, 1) - 1;
        const page_size = Math.max(pageSize * 1, 1);
        const query = new RegExp(q);
        const { question_id, answer_id } = ctx.params;
        const { root_comment_id } = ctx.query;
        ctx.body = await Comment
            .find({ content: query, question_id, answer_id, root_comment_id })
            .limit(page_size).skip(page_no * page_size)
            .populate('comment_user reply_to');
    }
    async checkCommentExist(ctx, next) {
        const comment = await Comment.findById(ctx.params.id).select('+comment_user');
        if (!comment) { ctx.throw(404, '评论不存在'); }
        if (ctx.params.question_id && comment.question_id.toString() !== ctx.params.question_id) { ctx.throw(404, '该问题下没有此评论'); }
        if (ctx.params.answer_id && comment.answer_id.toString() !== ctx.params.answer_id) { ctx.throw(404, '该答案下没有此评论'); }
        ctx.state.comment = comment;
        await next();
    }
    async findById(ctx) {
        const { fields = '' } = ctx.query;
        const selectFields = fields.split(';').filter(f => f).map(f => ' +' + f).join('+');
        const comments = await Comment.findById(ctx.params.id).select(selectFields).populate('comment_user');
        if (!comments) { ctx.throw(404); }
        ctx.body = comments; 
    }
    async create(ctx) {
        ctx.verifyParams({
            content: { type: 'string', required: true },
            root_comment_id: { type: 'string', required: false },
            reply_to: { type: 'string', required: false }
        });
        const comment_user = ctx.state.user._id
        const { question_id, answer_id } = ctx.params;
        const comment = await new Comment({ 
            ...ctx.request.body, 
            comment_user,
            question_id,
            answer_id
        }).save();
        ctx.body = comment;
    }
    async checkCommentUser(ctx, next) {
        const { comment, user } = ctx.state;
        if (comment.comment_user.toString() !== user._id) { ctx.throw(403, '没有权限') }
        await next();
    }
    async update(ctx) {
        ctx.verifyParams({
            content: { type: 'string', required: false },
        });
        const { content } = ctx.request.body;
        await ctx.state.comment.update({ content });
        ctx.body = ctx.state.comment;
    }
    async del(ctx) {
        await Comment.findByIdAndRemove(ctx.params.id);
        ctx.status = 204
    }
}

module.exports = new CommentCtr();