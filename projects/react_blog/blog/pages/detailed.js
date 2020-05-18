import React, { useState } from 'react'
import Head from 'next/head'
import marked from 'marked'
import highlight from 'highlight.js'
import { Row, Col, Icon, Breadcrumb, Affix } from 'antd'
import axios from 'axios'

import Header from '../components/Header'
import Author from '../components/Author'
import Advert from '../components/Advert'
import Footer from '../components/Footer'

import '../public/styles/pages/detailed.css'
import 'markdown-navbar/dist/navbar.css'
import 'highlight.js/styles/monokai-sublime.css'
import Tocify from '../components/tocify.tsx'
import servicePath from '../config/apiConfig'

const Detailed = (props) => {
  const tocify = new Tocify()
  const renderer = new marked.Renderer();
  renderer.heading = function (text, level, raw) {
    const anchor = tocify.add(text, level);
    return `<a id="${anchor}" href="#${anchor}" class="anchor-fix"><h${level}>${text}</h${level}></a>\n`;
  };

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
  let html = marked(props.content);
  return (
    <>
      <Head>
        <title>博客详细页</title>
      </Head>
      <Header />
      <Row className="common-main" type="flex" justify="center">
        <Col className="common-left" xs={24} sm={24} md={15} lg={18} xl={14}  >
          <div>
            <div className="bread-div">
              <Breadcrumb>
                <Breadcrumb.Item><a href="/">首页</a></Breadcrumb.Item>
                <Breadcrumb.Item>{props.type_name}</Breadcrumb.Item>
                {/* <Breadcrumb.Item>xxxx</Breadcrumb.Item> */}
              </Breadcrumb>
            </div>

            <div>
              <div className="detailed-title">{props.title}</div>

              <div className="list-icon center">
                <span><Icon type="calendar" /> {props.create_time}</span>
                <span><Icon type="folder" /> {props.type_name}</span>
                <span><Icon type="fire" /> {props.view_count}人</span>
              </div>

              <div className="detailed-content" dangerouslySetInnerHTML={{ __html: html }} >
              </div>
            </div>

          </div>
        </Col>

        <Col className="common-right" xs={0} sm={0} md={10} lg={5} xl={5}>
          <Author />
          <Advert />

          <Affix offsetTop={5}>
            <div className="detailed-nav common-box">
              <div className="nav-title">文章目录</div>
              <div className="toc-list">
                {tocify && tocify.render()}
              </div>
            </div>
          </Affix>

        </Col>
      </Row>
      <Footer />
    </>
  )
}

Detailed.getInitialProps = async (ctx) => {
  const id = ctx.query.id
  console.log('Detailed.id', id)
  const promise = new Promise((resolve) => {
    axios(`${servicePath.articleDetail}/${id}`).then(
      (res) => {
        console.log(res.data)
        resolve(res.data.data[0])
      }
    )
  })

  return await promise
}

export default Detailed
