const axios = require('axios')

const config = require('../config')

const { request_token_url, client_id, client_secret } = config.github

module.exports = (server) => {
    server.use(async (ctx, next) => {
        if (ctx.path === '/auth') {
            const code = ctx.query.code
            if (!code) {
                ctx.body = 'code not exist'
                return
            }
            const result = await axios({
                method: 'POST',
                url: request_token_url,
                data: {
                    client_id,
                    client_secret,
                    code
                },
                headers: {
                    Accept: 'application/json'
                }
            })

            if (result.status === 200 && (result.data && !result.data.error)) {
                ctx.session.githubAuth = result.data
                const { token_type, access_token } = result.data
                const userInfoResp = await axios({
                    method: 'GET',
                    url: 'https://api.github.com/user',
                    headers: {
                        Authorization: `${token_type} ${access_token}`
                    },
                })
                console.log('userInfoResp.data ==>', userInfoResp.data);
                ctx.session.userInfo = userInfoResp.data
                ctx.redirect('/')
            } else {
                const errorMsg = result.data && result.data.error
                ctx.body = `request token failed ${errorMsg}`
            }
        } else {
            await next()
        }
    })
}
