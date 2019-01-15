const puppeteer = require('puppeteer')

let doubanId = '27110296'
const base = `https://movie.douban.com/subject/`
const videoBase = `https://movie.douban.com/trailer/${doubanId}/#content`

const sleep = time => new Promise(resolve => {
  setTimeout(resolve, time)
})

;(async () => {
  console.log('Start visit the target page')

  const browser = await puppeteer.launch({
    args: ['--no-sandbox'],
    dumpio: false
  })

  const page = await browser.newPage()
  await page.goto(base + doubanId, {
    waitUntil: 'networkidle2'
  })

  await sleep(1000)
  const result = await page.evaluate(() => {
    console.log('进入了')
    let $ = window.$
    let it = $('.related-pic-video')
    if (it && it.length > 0) {
        let link = it.attr('href')
        // background-image:url(https://img3.doubanio.com/img/trailer/medium/2539667252.jpg?)
        let cover = it.attr('style').slice(21, -1)
        return { 
            link,
            cover
        }
    } else {
        return {}
    }
  })

  let video
  if (result.link) {
      await page.goto(result.link, {
        waitUntil: 'networkidle2'
      })
      await sleep(2000)

      video = await page.evaluate(() => {
          let $ = window.$
          let it = $('source')
          if (it && it.length > 0) {
              return it.attr('src')
          }
          return null
      })
  }

  const data = {
      video,
      doubanId,
      cover: result.cover
  }

  browser.close()
//   console.log(result)
  process.send(data)
  process.exit(0)
})()