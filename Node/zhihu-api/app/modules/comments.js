const mongoose = require('mongoose')

const  { Schema, model } = mongoose;

const commentSchema = new Schema({
    __v: { type: Number, select: false },
    content: { type: String, required: true },
    comment_user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    question_id: { type: String, required: true },
    answer_id: { type: String, required: true },
    // 评论的评论
    root_comment_id: { type: String },
    reply_to: { type: Schema.Types.ObjectId, ref: 'User' },
}, { timestamps: true });

module.exports = model('Comment', commentSchema);