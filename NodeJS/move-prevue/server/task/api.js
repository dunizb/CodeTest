// http://api.douban.com/v2/movie/subject/1764796
const rp = require('request-promise-native')

async function fetchMovie (item) {
    const url = `http://api.douban.com/v2/movie/subject/${item.doubanId}`
    const res = await rp(url)
    return res
}

;(async () => {
    let movies = [
        { doubanId: 30230131,
            title: '笨拙之极的上野',
            rate: 7.2,
            poster: 'https://img1.doubanio.com/view/photo/l_ratio_poster/public/p2541864499.jpg' 
        },
        { doubanId: 30395845,
            title: '2019第76届金球奖颁奖典礼',
            rate: 6.4,
            poster: 'https://img3.doubanio.com/view/photo/l_ratio_poster/public/p2544783925.jpg' 
        }
    ]

    movies.map(async movie => {
        let movieData = await fetchMovie(movie)

        try {
            movieData = JSON.parse(movieData)
            console.log('tags', movieData.tags)
            console.log('summary', movieData.summary)
        } catch (error) {
            console.log('err', err)
        }
        console.log(movieData)
    })
})()