const mongoose = require('mongoose')

const  { Schema, model } = mongoose;

const answerSchema = new Schema({
    __v: { type: Number, select: false },
    content: { type: String, required: true },
    answer_user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    question_id: { type: String, required: true },
    vote_count: { type: Number, required: true, default: 0 } // 投票数
}, { timestamps: true });

module.exports = model('Answer', answerSchema);