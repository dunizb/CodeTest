import Head from 'next/head'
import './index.css'
import {Button} from 'antd'

const Home = () => (
  <div className="container">
    <Head>
      <title>Create Next App</title>
      <link rel="icon" href="/favicon.ico" />
    </Head>
    <h1 className="h1">Blog</h1>
    <Button>Button</Button>
  </div>
)

export default Home
