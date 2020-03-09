async function test() {
    const Redis = require('ioredis')
    
    const redis = new Redis({
        port: 6379,
        host: '127.0.0.1',
        password: 123456
    })
    const keys = await redis.keys('*')
    console.log('keys', keys);
    console.log('a', await redis.get('a'));
}
test()
