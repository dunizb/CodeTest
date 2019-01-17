const cp = require('child_process')
const { resolve } = require('path')

;(async () => {
    const script = resolve(__dirname, '../crawler/video.js')
    const child = cp.fork(script, [])
    let invoked = false

    child.on('error', err => {
        if (invoked) return
        invoked = true
        console.log(err)
    })

    child.on('exit', code => {
        if (invoked) return
        invoked = true
        let err = code === 0 ? null : new Error('exit code ' + code)
        console.log(err)
    })

    child.on('message', data => {
        // https://img3.doubanio.com/view/photo/l_ratio_poster/public/p2543846884.jpg
        console.log(data)
    })
})()