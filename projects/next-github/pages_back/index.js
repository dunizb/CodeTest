import { useState, useCallback } from 'react'
import { Layout, Input, Avatar } from 'antd'
import { GithubOutlined, UserOutlined } from '@ant-design/icons'
import 'antd/dist/antd.css'

import Container from '../components/Container'

const { Header, Content, Footer } = Layout;

const githubIconStyle = {
  color: '#fff',
  fontSize: 40,
  marginRight: 20
}
const footerStyle = {
  textAlign: 'center'
}

const Comp = ({ color, children, style }) => <div style={{ color, ...style }}>{children}</div>

export default ({ children }) => {

  const [search, setSearch] = useState('')

  const handleSearchChange = useCallback((event) => {
    setSearch(event.target.value)
  }, [])
  const handleOnSearch = useCallback(() => { }, [])
  return (
    <Layout>
      <Header>
        <Container renderer={<div className="header-inner" />}>
          <div className="header-left">
            <div className="logo">
              <GithubOutlined style={githubIconStyle} />
            </div>
            <div>
              <Input.Search
                placeholder="搜索仓库"
                enterButton
                value={search}
                onChange={handleSearchChange}
                onSearch={handleOnSearch}
                style={{ width: '400px', verticalAlign: 'baseline' }} />
            </div>
          </div>
          <div className="header-right">
            <div className="user">
              <Avatar icon={<UserOutlined />} />
            </div>
          </div>
        </Container>
      </Header>
      <Content style={{ padding: '0 50px' }}>
        <Container>
          {children}
          Content
        </Container>
      </Content>
      <Footer style={footerStyle}>Ant Design ©2018 Created by Ant UED</Footer>
      <style jsx>{`
        .header-inner {
          display: flex;
          justify-content: space-between;
          
        }
        .header-left {
          display: flex;
          justify-content: flex-start;
          padding-top: 10px;
        }
      `}</style>
      <style jsx global>{`
        #__next {
          height: 100%;
        }
        .ant-layout {
          height: 100%;
        }
        .ant-layout-header {
          padding-left: 0;
          padding-right: 0;
        }
      `}</style>
    </Layout>
  )
}
