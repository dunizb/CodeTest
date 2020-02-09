import React from 'react'
import {Menu} from 'antd'
import { NavLink } from 'react-router-dom'
import MenuConfig from '../../config/menuConfig.js'
import './index.less'
const {SubMenu} = Menu

export default class NavLeft extends React.Component {
    state = {
        theme: 'dark',
        current: '1',
        currentKey: ''
    };
    handleClick = ({ item ,key})=>{
        // const { dispatch } = this.props;
        // dispatch(switchMenu(item.props.title))
        this.setState({
            currentKey:key
        })
    }
    componentWillMount(){
        const menuTreeNode = this.renderMenu(MenuConfig);
        let currentKey = window.location.hash.replace(/#|\?.*$/g, '');
        this.setState({
            currentKey,
            menuTreeNode
        })
    }
    // 菜单渲染
    renderMenu = (data) =>{
        return data.map((item)=>{
            if(item.children){
                return (
                    <SubMenu title={item.title} key={item.key}>
                        { this.renderMenu(item.children)}
                    </SubMenu>
                )
            }
            return (
                <Menu.Item title={item.title} key={item.key}>
                    <NavLink to={item.key}>{item.title}</NavLink>
                </Menu.Item>
            )
        })
    }
    render() {
        return(
            <div>
                <div className="logo">
                    <img src="/assets/logo-ant.svg" alt="logo"/>
                    <h1>React MS</h1>
                </div>
                <Menu 
                    onClick={this.handleClick}
                    selectedKeys={this.state.currentKey}
                    theme={this.state.theme}>
                    { this.state.menuTreeNode }
                </Menu>
            </div>
        )
    }
}
