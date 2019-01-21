const mongoose = require('mongoose')
const Schema = mongoose.Schema
const Mixed = Schema.Types.Mixed

const movieSchema = new Schema({
    doubanId: String,
    rate: Number,
    title: String,
    summary: String,
    video: String,
    poster: String,
    cover: String,

    videoKey: String,
    posterKey: String,
    coverKey: String,

    rawTitle: String,
    movieTypes: [String],
    pubdata: Mixed,
    year: Number,
    tags: [String],
    meta: {
        createdAt: {
            type: Date,
            defualt: Date.now()
        },
        updatedAt: {
            type: Date,
            defualt: Date.now()
        }
    }
})

mongoose.model('Movie', movieSchema)