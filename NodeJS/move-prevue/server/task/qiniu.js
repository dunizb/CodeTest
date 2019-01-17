const qiniu = require('qiniu')
const nanoid = require('nanoid')
const config = require('../config')

const bucket = config.qiniu.bucket
const mac = new qiniu.auth.digest.Mac(config.qiniu.AK, config.qiniu.SK)

const cfg = new qiniu.conf.Config()
const client = new qiniu.rs.BucketManager(mac, cfg)

const uploadToQiniu = async (url, key) => {
    return new Promise((resolve, reject) => {
        client.fetch(url, bucket, key, (err, ret, info) => {
            if (err) {
                reject(err)
            } else {
                if (info.statusCode === 200) {
                    resolve({ key })
                } else {
                    reject(info)
                }
            }
        })
    })
}

;(async () => {
    const movies = [{
        video: 'http://vt1.doubanio.com/201901160256/0c57479f568e0ad927479c2fc932f64a/view/movie/M/402390189.mp4',
        doubanId: '27110296',
        poster: 'https://img3.doubanio.com/view/photo/l_ratio_poster/public/p2543846884.jpg',
        cover: 'https://img3.doubanio.com/img/trailer/medium/2539667252.jpg?'
    }]
    movies.map(async movie => {
        if (movie.video && !movie.key) {
            try {
                console.log('开始传 video')
                let videoData = await uploadToQiniu(movie.video, nanoid() + '.mp4')
                console.log('开始传 cover')
                let coverData = await uploadToQiniu(movie.cover, nanoid() + '.png')
                console.log('开始传 poster')
                let posterData = await uploadToQiniu(movie.poster, nanoid() + '.png')

                if (videoData.key) {
                    movie.videoKey = videoData.key
                }
                if (coverData.key) {
                    movie.coverKey = coverData.key
                }
                if (posterData.key) {
                    movie.posterKey = posterData.key
                }
                console.log(movie)

                { 
                    video: 'http://vt1.doubanio.com/201901160256/0c57479f568e0ad927479c2fc932f64a/view/movie/M/402390189.mp4',
                    doubanId: '27110296',
                    poster: 'https://img3.doubanio.com/view/photo/l_ratio_poster/public/p2543846884.jpg',
                    cover: 'https://img3.doubanio.com/img/trailer/medium/2539667252.jpg?',
                    videoKey: 'http://plfdk2i72.bkt.clouddn.com/v5iGhAMqWqvoCqeqxnKO_.mp4',
                    coverKey: 'http://plfdk2i72.bkt.clouddn.com/i_-t31-D9gW1vB7AO4cWr.png',
                    posterKey: 'http://plfdk2i72.bkt.clouddn.com/IY9Zl6oFqAKmXw0wblqch.png' 
                }
            } catch (error) {
                console.log(error)
            }
        }
    })
})()