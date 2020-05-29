import React, { useState, useEffect } from 'react';
import marked from 'marked'
import './AddArticle.css'
import { Row, Col, Input, Select, Button, DatePicker, message } from 'antd'
import axios from 'axios'
import servicePath from '../../config/apiUrl'

const { Option } = Select;
const { TextArea } = Input

const TYPE = '文章类别'

function AddArticle(props) {
  const [articleId, setArticleId] = useState(0)  // 文章的ID，如果是0说明是新增加，如果不是0，说明是修改
  const [articleTitle, setArticleTitle] = useState('')   //文章标题
  const [articleContent, setArticleContent] = useState('')  //markdown的编辑内容
  const [markdownContent, setMarkdownContent] = useState('预览内容') //html内容
  const [introduceMD, setIntroduceMD] = useState()            //简介的markdown内容
  const [introduceHtml, setIntroduceHtml] = useState('等待编辑') //简介的html内容
  const [showDate, setShowDate] = useState()   //发布日期
  const [updateDate, setUpdateDate] = useState() //修改日志的日期
  const [typeInfo, setTypeInfo] = useState([]) // 文章类别信息
  const [selectedType, setSelectType] = useState(TYPE) //选择的文章类别
  marked.setOptions({
    renderer: marked.Renderer(),
    gfm: true,
    pedantic: false,
    sanitize: false,
    tables: true,
    breaks: false,
    smartLists: true,
    smartypants: false,
  });
  const changeContent = (e) => {
    setArticleContent(e.target.value)
    let html = marked(e.target.value)
    setMarkdownContent(html)
  }

  const changeIntroduce = (e) => {
    setIntroduceMD(e.target.value)
    let html = marked(e.target.value)
    setIntroduceHtml(html)
  }

  //从中台得到文章类别信息
  const getTypeInfo = () => {
    axios({
      method: 'get',
      url: servicePath.getTypeInfo,
      header: { 'Access-Control-Allow-Origin': '*' },
      withCredentials: true
    }).then(
      res => {
        if (res.data.data === "没有登录") {
          localStorage.removeItem('openId')
          props.history.push('/')
        } else {
          setTypeInfo(res.data.data)
        }
      }
    )
  }

  useEffect(() => {
    getTypeInfo()
  }, []);

  const convertType = value => {
    if (value == TYPE) {
      return 1
    }
    return value
  }

  //选择类别后的便哈
  const selectTypeHandler = (value) => {
    setSelectType(convertType(value))
  }


  const saveArticle = () => {
    // markedContent();  //先进行转换

    if (!selectedType) {
      message.error('必须选择文章类别')
      return false
    } else if (!articleTitle) {
      message.error('文章名称不能为空')
      return false
    } else if (!articleContent) {
      message.error('文章内容不能为空')
      return false
    } else if (!introduceMD) {
      message.error('简介不能为空')
      return false
    } else if (!showDate) {
      message.error('发布日期不能为空')
      return false
    }
    // message.success('检验通过')

    let dataProps = {}   //传递到接口的参数
    dataProps.type_id = Number.parseInt(convertType(selectedType))
    dataProps.title = articleTitle
    dataProps.content = articleContent
    dataProps.introduce = introduceMD
    // let dateText = showDate.replace('-', '/') //把字符串转换成时间戳
    dataProps.create_time = showDate

    if (articleId === 0) {
      console.log('articleId=:' + articleId)
      dataProps.view_count = Math.ceil(Math.random() * 100) + 1000
      axios({
        method: 'post',
        url: servicePath.addArticle,
        data: dataProps,
        withCredentials: true
      }).then(
        res => {
          console.log('res.data', res.data)
          setArticleId(res.data.insertId)
          if (res.data.isSuccess) {
            message.success('文章保存成功')
          } else {
            message.error('文章保存失败');
          }
        }
      )
    }
  }

  return (
    <div>
      <Row gutter={5}>
        <Col span={18}>
          <Row gutter={10} >
            <Col span={20}>
              <Input
                onChange={e => setArticleTitle(e.target.value)}
                placeholder="文章标题"
                size="large" />
            </Col>
            <Col span={4}>
              &nbsp;
              <Select defaultValue={selectedType} onChange={selectTypeHandler} size="large">
                {
                  typeInfo.map((item, index) => {
                    return (<Option key={index} value={item.Id}>{item.name}</Option>)
                  })
                }
              </Select>
            </Col>
          </Row>
          <br />
          <Row gutter={10} >
            <Col span={12}>
              <TextArea className="markdown-content"
                value={articleContent}
                rows={35}
                placeholder="文章内容"
                onChange={changeContent} />
            </Col>
            <Col span={12}>
              <div className="show-html" dangerouslySetInnerHTML={{ __html: markdownContent }}>
              </div>
            </Col>
          </Row>
        </Col>

        <Col span={6}>
          <Row>
            <Col span={24}>
              <Button size="large">暂存文章</Button>&nbsp;
              <Button type="primary" size="large" onClick={saveArticle}>发布文章</Button>
              <br />
            </Col>
            <Col span={24}>
              <br />
              <TextArea
                rows={4}
                value={introduceMD}
                onChange={changeIntroduce}
                placeholder="文章简介" />
              <br /><br />
              <div className="introduce-html" dangerouslySetInnerHTML={{ __html: '文章简介：' + introduceHtml }} ></div>
            </Col>
            <Col span={12}>
              <div className="date-select">
                <DatePicker
                  onChange={(date, dateString) => setShowDate(dateString)}
                  placeholder="发布日期"
                  size="large" />
              </div>
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  )
}
export default AddArticle;
