import React, { Component } from 'react';
import {CSSTransition} from 'react-transition-group';
import './boss.css'

class Boss extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isShow: false
        }
    }
    render() {
        return ( 
            <div>
                <h1>React 中使用CSS动画</h1>
                <CSSTransition
                    in={this.state.isShow}   //用于判断是否出现的状态
                    timeout={2000}           //动画持续时间
                    classNames="boss-text"   //className值，防止重复
                >
                    <div>Boss级任务--孙悟空</div>
                </CSSTransition>
                <div><button onClick={this.toToggole}>召唤Boss</button></div>
            </div>
        );
    }

    toToggole = () => {
        const isShow = !this.state.isShow
        this.setState({
            isShow
        })
    }
}

export default Boss;
