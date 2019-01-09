module.exports = `
DOCTYPE
html
    head
        meta(charset="UTF-8")
        meta(name='viewport', content='width=device-width, initial-scale=1.0')
        meta(http-equiv='X-UA-Compatible' content='ie=edge')
        title Koa Server Pug - 电影预告片
        link(href='https://cdn.bootcss.com/twitter-bootstrap/4.0.0-beta.2/css/bootstrap.min.css' rel='stylesheet')
        script(src='https://cdn.bootcss.com/twitter-bootstrap/4.0.0-beta.2/js/bootstrap.bundle.min.js')
        script(src='https://cdn.bootcss.com/jquery/3.2.0/jquery.min.js')
    body
        .container
            .row
                .col-md-8
                    h1 Hi #{you}
                    p This is #{me}
                .col-md-4
                    p 测试动态的Pug模板引擎
`