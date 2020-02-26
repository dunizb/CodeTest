import Head from 'next/head'
import Header from '../components/Header'

const Home = () => (
  <div className="container">
    <Head>
      <title>我的博客</title>
      <link rel="icon" href="/favicon.ico" />
    </Head>
    <Header />
  </div>
)

export default Home
