module.exports = `
    <!DOCTYPE html>
    <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <meta http-equiv="X-UA-Compatible" content="ie=edge">
            <title>电影预告片</title>
            <link href="https://cdn.bootcss.com/twitter-bootstrap/4.0.0-beta.2/css/bootstrap.min.css" rel="stylesheet">
            <script src="https://cdn.bootcss.com/twitter-bootstrap/4.0.0-beta.2/js/bootstrap.bundle.min.js"></script>
            <script src="https://cdn.bootcss.com/jquery/3.2.0/jquery.min.js"></script>
        </head>
        <body>
            <div class="container">
                <div class="row">
                    <div class="col-md-8">
                        <h1>Hi <%= you %></h1>
                        <p>This is <%= me %> website</p>
                    </div>
                    <div class="col-md-4">
                        <p>测试动态的ejs模板引擎</p>
                    </div>
                </div>
            </div> 
        </body>
    </html>
`