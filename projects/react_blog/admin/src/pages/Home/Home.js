import React, { useState } from 'react';
import { Layout, Menu, Breadcrumb } from 'antd';
import {
  PlusCircleOutlined,
  PieChartOutlined,
  MessageOutlined,
  ContainerOutlined,
} from '@ant-design/icons';
import './home.css'
import { Route } from "react-router-dom";

import AddArticle from '../AddArticle/AddArticle'

const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;



function Home() {
  const [collapsed, setCollapsed] = useState(false);

  const onCollapse = collapsed => {
    setCollapsed(collapsed);
  };

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider collapsible collapsed={collapsed} onCollapse={onCollapse}>
        <div className="logo" />
        <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
          <Menu.Item key="1" icon={<PieChartOutlined />}>
            工作台
          </Menu.Item>
          <Menu.Item key="2" icon={<PlusCircleOutlined />}>
            添加文章
          </Menu.Item>
          <SubMenu key="sub1" icon={<ContainerOutlined />} title="文章管理">
            <Menu.Item key="4">添加文章</Menu.Item>
            <Menu.Item key="5">文章列表</Menu.Item>
          </SubMenu>
          <Menu.Item key="9" icon={<MessageOutlined />}>
            留言管理
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout className="site-layout">
        <Header className="site-layout-background" style={{ padding: 0 }} />
        <Content style={{ margin: '0 16px' }}>
          <Breadcrumb style={{ margin: '16px 0' }}>
            <Breadcrumb.Item>后台管理</Breadcrumb.Item>
            <Breadcrumb.Item>工作台</Breadcrumb.Item>
          </Breadcrumb>
          <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
            <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>
              <div>
                <Route path="/home/" exact component={AddArticle} />
              </div>
            </div>
          </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>zhangbing.site</Footer>
      </Layout>
    </Layout>
  );
}

export default Home;
