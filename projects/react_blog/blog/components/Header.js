import React, { useEffect, useState } from 'react'
import '../public/styles/components/Header.css'
import { Row, Col, Menu, Icon } from 'antd'
import Router from 'next/router'
import Link from 'next/link'
import axios from 'axios'
import servicePath from '../config/apiConfig'

const Header = () => {
  const [navArr, setNavArr] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios({
        method: 'get',
        url: servicePath.getTypeInfo,
        withCredentials: true
      }).then(res => {
        return res.data.data
      });
      setNavArr(result);
    }
    fetchData();

  }, [])

  const handleClick = (e) => {
    if (e.key === '0') {
      Router.push('/')
    } else {
      Router.push('/list?id=' + e.key)
    }
  }

  return (
    <div className="header">
      <Row type="flex" justify="center">
        <Col xs={24} sm={24} md={6} lg={10} xl={10}>
          <span className="header-logo">杜尼卜</span>
          <span className="header-text">做工程师不做码农</span>
        </Col>
        <Col xs={0} sm={0} md={14} lg={16} xl={10} className="text-r">
          <Menu mode="horizontal" onClick={handleClick}>
            <Menu.Item key="0">
              <Icon type="home" /> 首页
            </Menu.Item>
            {
              navArr.map(item => {
                return (
                  <Menu.Item key={item.id}>
                    <Icon type={item.icon} />
                    {item.name}
                  </Menu.Item>
                )
              })
            }

          </Menu>
        </Col>
      </Row>
    </div>
  )
}

export default Header
