const mongoose = require('mongoose')

const  { Schema, model } = mongoose;

const questionSchema = new Schema({
    __v: { type: Number, select: false },
    title: { type: String, required: true },
    description: { type: String, required: true },
    question_user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    topics: { 
        type: [{ type: Schema.Types.ObjectId, ref: 'Topic' }],
        select: false
    }
}, { timestamps: true });

module.exports = model('Question', questionSchema);