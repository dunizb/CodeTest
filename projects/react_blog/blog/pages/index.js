import React, { useState } from 'react';
import Head from 'next/head'
import Link from 'next/link'
import Header from '../components/Header'
import { Row, Col, List, Icon } from 'antd'
import '../public/styles/pages/index.css'
import axios from 'axios'
import marked from 'marked'
import highlight from 'highlight.js'
import Author from '../components/Author/index'
import Advert from '../components/Advert'
import Footer from '../components/Footer'
import servicePath from '../config/apiConfig'
import 'highlight.js/styles/monokai-sublime.css'

const Home = (list) => {
  const renderer = new marked.Renderer();
  marked.setOptions({
    renderer: renderer,
    gfm: true,
    pedantic: false,
    sanitize: false,
    tables: true,
    breaks: false,
    smartLists: true,
    smartypants: false,
    highlight: code => highlight.highlightAuto(code).value
  });
  const [articleList, setArticleList] = useState(list.data)

  return (
    <div className="container">
      <Head>
        <title>我的博客</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <Row className="common-main" type="flex" justify="center">
        <Col className="common-left" xs={24} sm={24} md={15} lg={18} xl={14}  >
          <List
            header={<div>最新日志</div>}
            itemLayout="vertical"
            dataSource={articleList}
            renderItem={item => (
              <List.Item>
                <div className="list-title">
                  <Link href={{ pathname: '/detailed', query: { id: item.id } }}>
                    <a>{item.title}</a>
                  </Link>
                </div>
                <div className="list-icon">
                  <span><Icon type="calendar" /> {item.create_time}</span>
                  <span><Icon type="folder" /> {item.type_name}</span>
                  <span><Icon type="fire" /> {item.view_count}人</span>
                </div>
                <div className="list-context" dangerouslySetInnerHTML={{ __html: marked(item.introduce) }}></div>
              </List.Item>
            )}
          />
        </Col>

        <Col className="common-right" xs={0} sm={0} md={10} lg={5} xl={5}>
          <Author />
          <Advert />
        </Col>
      </Row>

      <Footer />
    </div>
  )
}

Home.getInitialProps = async () => {
  const promise = new Promise((resolve) => {
    axios(servicePath.articleList).then(
      (res) => {
        // console.log(res.data)
        resolve(res.data)
      }
    )
  })

  return await promise
}

export default Home
