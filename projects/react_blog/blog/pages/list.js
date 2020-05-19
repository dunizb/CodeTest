import React, { useState, useEffect } from 'react';
import Head from 'next/head'
import Link from 'next/link'
import Header from '../components/Header'
import { Row, Col, List, Icon, Breadcrumb } from 'antd'
import Author from '../components/Author'
import Advert from '../components/Advert'
import Footer from '../components/Footer'
import axios from 'axios'
import servicePath from '../config/apiConfig'
import marked from 'marked'
import highlight from 'highlight.js'
import 'highlight.js/styles/monokai-sublime.css'

const BlogList = (list) => {
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

  const [myList, setMyList] = useState(list.data)

  useEffect(() => {
    setMyList(list.data)
  })

  return (
    <div className="container">
      <Head>
        <title>我的博客</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <Row className="common-main" type="flex" justify="center">
        <Col className="common-left" xs={24} sm={24} md={15} lg={18} xl={14} >
          <div className="breadcrumb">
            <Breadcrumb>
              <Breadcrumb.Item><a href="/">首页</a></Breadcrumb.Item>
              <Breadcrumb.Item>{myList.length > 0 ? myList[0].type_name : ''}</Breadcrumb.Item>
            </Breadcrumb>
          </div>
          <List
            header={<div>最新日志</div>}
            itemLayout="vertical"
            dataSource={myList}
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
                  <span><Icon type="fire" /> {item.view_count}阅读</span>
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

BlogList.getInitialProps = async (context) => {
  let id = context.query.id
  const promise = new Promise((resolve) => {
    axios(`${servicePath.getListById}/${id}`).then(
      (res) => resolve(res.data)
    )
  })
  return await promise
}

export default BlogList
