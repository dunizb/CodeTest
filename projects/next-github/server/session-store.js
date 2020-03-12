function getRedisSessionId(sid) {
    return `ssid:${sid}`
}

class RedisSessionStore {
    constructor(client) {
        this.client = client
    }
    /**
     * 获取Redis中存储的Session数据
     * @param {*} sid 
     */
    async get(sid) {
        console.log('get session', sid);
        const id = getRedisSessionId(sid)
        const data = await this.client.get(id)
        if (!data) {
            return null
        }
        try {
            const result = JSON.stringify(data)
            return result
        } catch (err) {
            console.log(err);
        }
    }
    /**
     * 存储数据到Redis中
     * @param {*} sid 
     * @param {*} sess 
     * @param {*} ttl 
     */
    async set(sid, sess, ttl) {
        console.log('set session', sid);
        const id = getRedisSessionId(sid)
        if (typeof ttl === 'number') {
            ttl = Math.ceil(ttl / 1000)
        }
        try {
            const sessionStr = JSON.stringify(sess)
            if (ttl) {
                await this.client.setex(id, ttl, sessionStr)
            } else {
                await this.client.set(id, sessionStr)
            }
        } catch (error) {
            console.log(error);
        }
    }
    /**
     * 从Redis中删除数据
     * @param {*} sid 
     */
    async destroy(sid) {
        console.log('destroy session', sid);
        const id = getRedisSessionId(sid)
        await this.client.del(id)
    }
}

module.exports = RedisSessionStore
