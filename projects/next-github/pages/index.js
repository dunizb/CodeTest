import { useEffect } from 'react'
import axios from 'axios'
import { Button } from 'antd'
import getConfig from 'next/config'

import store from '../store/store'

const { publicRuntimeConfig } = getConfig()

function Index() {
    useEffect(() => {
        console.log('useEffect');
        // axios.get('/api/user/info').then(resp => console.log(resp))
    }, [])
    return (
        <div>
            <p>Hello Next.js</p>
            <Button type="primary">我是Antd</Button>
            <a href={publicRuntimeConfig.OAUTH_URL}>去登录</a>
        </div>
    )
}
export default Index
