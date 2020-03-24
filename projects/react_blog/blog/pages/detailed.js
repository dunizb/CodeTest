import React, { useState } from 'react'
import Head from 'next/head'
import ReactMarkdown from 'react-markdown'
import MarkNav from 'markdown-navbar';
import { Row, Col, Icon, Breadcrumb, Affix } from 'antd'
import axios from 'axios'

import Header from '../components/Header'
import Author from '../components/Author'
import Advert from '../components/Advert'
import Footer from '../components/Footer'

import '../public/styles/pages/detailed.css'
import 'markdown-navbar/dist/navbar.css'

const Detailed = () => {
  let markdown = '# P01:课程介绍和环境搭建\n' +
    '[ **M** ] arkdown + E [ **ditor** ] = **Mditor**  \n' +
    '> Mditor 是一个简洁、易于集成、方便扩展、期望舒服的编写 markdown 的编辑器，仅此而已... \n\n' +
    '**这是加粗的文字**\n\n' +
    '*这是倾斜的文字*`\n\n' +
    '***这是斜体加粗的文字***\n\n' +
    '~~这是加删除线的文字~~ \n\n' +
    '\`console.log(111)\` \n\n' +
    '# p02:来个Hello World 初始Vue3.0\n' +
    '> aaaaaaaaa\n' +
    '>> bbbbbbbbb\n' +
    '>>> cccccccccc\n' +
    '***\n\n\n' +
    '# p03:Vue3.0基础知识讲解\n' +
    '> aaaaaaaaa\n' +
    '>> bbbbbbbbb\n' +
    '>>> cccccccccc\n\n' +
    '# p04:Vue3.0基础知识讲解\n' +
    '> aaaaaaaaa\n' +
    '>> bbbbbbbbb\n' +
    '>>> cccccccccc\n\n' +
    '#5 p05:Vue3.0基础知识讲解\n' +
    '> aaaaaaaaa\n' +
    '>> bbbbbbbbb\n' +
    '>>> cccccccccc\n\n' +
    '# p06:Vue3.0基础知识讲解\n' +
    '> aaaaaaaaa\n' +
    '>> bbbbbbbbb\n' +
    '>>> cccccccccc\n\n' +
    '# p07:Vue3.0基础知识讲解\n' +
    '> aaaaaaaaa\n' +
    '>> bbbbbbbbb\n' +
    '>>> cccccccccc\n\n' +
    '``` var a=11; ```'
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
                <Breadcrumb.Item>视频列表</Breadcrumb.Item>
                <Breadcrumb.Item>xxxx</Breadcrumb.Item>
              </Breadcrumb>
            </div>

            <div>
              <div className="detailed-title">React实战视频教程-技术胖Blog开发(更新08集)</div>

              <div className="list-icon center">
                <span><Icon type="calendar" /> 2019-06-28</span>
                <span><Icon type="folder" /> 视频教程</span>
                <span><Icon type="fire" /> 5498人</span>
              </div>

              <div className="detailed-content" >
                <ReactMarkdown
                  source={markdown}
                  escapeHtml={false}
                />
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
              <MarkNav
                className="article-menu"
                source={markdown}
                ordered={false}
              />
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
  console.log('query.id', id)
  const promise = new Promise((resolve) => {
    axios(`http://127.0.0.1:7002/blog/articleDetail?id=${id}`).then(
      (res) => {
        console.log(res.data)
        resolve(res.data.data[0])
      }
    )
  })

  return await promise
}

export default Detailed
