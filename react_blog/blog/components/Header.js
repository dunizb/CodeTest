import React from 'react'
import '../public/styles/components/Header.css'
import {Row,Col,Menu,Icon} from 'antd'

const Header = () => {
    return (
        <div className="header">
            <Row type="flex" justify="center">
                <Col xs={24} sm={24} md={10} lg={15} xl={13}>
                    <span className="header-logo">杜尼卜</span>
                    <span className="header-text">聚焦大前端技术、全栈开发、程序员成长学习。</span>
                </Col>
                <Col xs={0} sm={0} md={14} lg={8} xl={6} className="text-r">
                    <Menu mode="horizontal">
                        <Menu.Item key="home">
                            <Icon type="home"/>
                            首页
                        </Menu.Item>
                        <Menu.Item key="video">
                            <Icon type="youtube"/>
                            视频
                        </Menu.Item>
                        <Menu.Item key="life">
                            <Icon type="smile"/>
                            生活
                        </Menu.Item>
                    </Menu>
                </Col>
            </Row>
        </div>
    )
}

export default Header
