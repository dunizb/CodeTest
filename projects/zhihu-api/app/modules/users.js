const mongoose = require('mongoose')

const  { Schema, model } = mongoose;

const userSchema = new Schema({
    __v: { type: Number, select: false },
    name: { type: String, required: true },
    age: { type: Number, default: 0 },
    password: { type: String, required: true, select: true },
    avatar_url: { type: String, required: false },
    gender: { type: String, enum: ['man', 'wuman'], default: 'man', required: true },
    headline: { type: String },
    locations: { type: [{ type: Schema.Types.ObjectId, ref: 'Topic' }], select: false },
    business: { type: Schema.Types.ObjectId, ref: 'Topic', select: false },
    employments: {
        type: [{
            company: { type: Schema.Types.ObjectId, ref: 'Topic' },
            job: { type: Schema.Types.ObjectId, ref: 'Topic' }
        }],
        select: false
    },
    educations: {
        type: [{
            school: { type: Schema.Types.ObjectId, ref: 'Topic' },
            major: { type: Schema.Types.ObjectId, ref: 'Topic' },
            diploma: { type: Number, enum:[1,2,3,4,5]},
            entrance_year: { type: Number },
            graduation_year: { type: Number },
        }],
        select: false
    },
    following: {
        type: [{ type: Schema.Types.ObjectId, ref: 'User' }],
        select: false
    },
    followTopics: {
        type: [{ type: Schema.Types.ObjectId, ref: 'Topic' }],
        select: false
    },
    likedAnswers: {
        type: [{ type: Schema.Types.ObjectId, ref: 'Answer' }],
        select: false
    },
    dislikedAnswers: {
        type: [{ type: Schema.Types.ObjectId, ref: 'Answer' }],
        select: false
    }
}, { timestamps: true });

module.exports = model('User', userSchema);