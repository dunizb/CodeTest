import React, { PureComponent } from 'react';
import store from './store'
import {connect} from 'react-redux'
import {
    changeInputAction, 
    addItemAction
} from './store/actionCreatores'

class TodoList extends PureComponent {
    constructor(props) {
        super(props);
        this.state = store.getState()
    }
    render() { 
        return (
            <div style={{margin:'10px', width: '600px'}}>
                <h1>react-redux-todolist</h1>
                <div style={{marginBottom:'10px'}}>
                    <div>
                        <input value={this.props.inputValue} onChange={this.props.inputChange} />
                        <button onClick={this.props.clickButton}>提交</button>
                    </div>
                    <ul>
                        {
                            this.props.list.map((item,index)=>{
                                return (<li key={index}>{item}</li>)
                            })
                        }
                    </ul>
                </div>
                <hr />
                <a href="https://github.com/dunizb/CodeTest/tree/master/React/redux/react-redux-todolist" target="_blank">查看源代码</a>     
            </div>
        );
    }
}

const stateToProps = (state) => {
    return {
        inputValue: state.inputValue,
        list: state.list
    }
}
 
const dispatchToProps = (dispatch) => {
    return {
        inputChange(e) {
            const action = changeInputAction(e.target.value)
            dispatch(action);
        },
        clickButton() {
            const action = addItemAction()
            dispatch(action);
        }
    }
}

export default connect(stateToProps, dispatchToProps)(TodoList);
