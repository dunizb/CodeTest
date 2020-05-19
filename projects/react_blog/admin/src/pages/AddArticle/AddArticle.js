import React, { useState } from 'react';
import marked from 'marked'
import './AddArticle.css'
import { Row, Col, Input, Select, Button, DatePicker } from 'antd'

const { Option } = Select;
const { TextArea } = Input

function AddArticle() {
  return (
    <div>
      <Row gutter={5}>
        <Col span={18}>
          <Row gutter={10} >
            <Col span={20}>
              <Input placeholder="博客标题" size="large" />
            </Col>
            <Col span={4}>
              &nbsp;
              <Select defaultValue="Sign Up" size="large">
                <Option value="Sign Up">视频教程</Option>
              </Select>
            </Col>
          </Row>
          <br />
          <Row gutter={10} >
            <Col span={12}>
              <TextArea className="markdown-content" rows={35} placeholder="文章内容" />
            </Col>
            <Col span={12}>
              <div className="show-html">
                文章预览
              </div>
            </Col>
          </Row>
        </Col>

        <Col span={6}>
          <Row>
            <Col span={24}>
              <Button size="large">暂存文章</Button>&nbsp;
              <Button type="primary" size="large">发布文章</Button>
              <br />
            </Col>
            <Col span={24}>
              <br />
              <TextArea rows={4} placeholder="文章简介" />
              <br /><br />
              <div className="introduce-html"></div>
            </Col>
            <Col span={12}>
              <div className="date-select">
                <DatePicker placeholder="发布日期" size="large" />
              </div>
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  )
}
export default AddArticle;
