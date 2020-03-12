const withCss = require('@zeit/next-css')
const config = require('./config')

const configs = {
    // 编译文件的输出目录
    distDir: 'next',
    // 是否给每个路由生产Etag
    generateEtags: true,
    // 页面内容缓存配置
    onDemandEntries: {
        // 内容在内存中缓存的时常（ms）
        maxInactiveAge: 25 * 1000,
        // 同时缓存多少个页面
        pagesBufferLength: 2
    },
    // 在pages目录下哪种后缀的文件会被认为时页面
    pageExtensions: ['jsx', 'js'],
    // 可以在页面上通过 process.env.customKey 获取 value
    env: {
        customKey: 'value'
    },
    // 下面两个要通过 'next/config' 来读取
    // 只有在服务端渲染时才会获取的配置
    publicRuntimeConfig: {
        mySecret: 'secret',
        secondSecret: process.env.SECOND_SECRET,
    },
    // 在服务端渲染和客户端渲染都可以获取的配置
    publicRuntimeConfig: {
        staticFolder: '/static'
    }
}

if (typeof require !== 'undefined') {
    require.extensions['.css'] = file => { }
}

const GITHUB_OAUTH_URL = 'https://github.com/login/oauth/authorize'
const SCOPE = 'user'

module.exports = withCss({
    publicRuntimeConfig: {
        GITHUB_OAUTH_URL,
        OAUTH_URL: `${GITHUB_OAUTH_URL}?client_id=${config.github.client_id}&scope=${SCOPE}`
    }
})
