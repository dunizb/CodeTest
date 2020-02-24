import React, { PureComponent } from 'react';
import {Input,Button,List,Icon} from 'antd'
import store from './store'
import {
    getTodoList, 
    changeInputAction, 
    addItemAction, 
    deleteItemAction
} from './store/actionCreatores'

class TodoList extends PureComponent {
    constructor(props) {
        super(props);
        this.state = store.getState()
        this.changeInputValue = this.changeInputValue.bind(this)
        store.subscribe(this.storeChange)
    }
    render() { 
        return (
            <div style={{margin:'10px', width: '600px'}}>
                <h1>React and Redux TodoList</h1>
                <div style={{marginBottom:'10px'}}>
                    <Input 
                        placeholder={this.state.inputValue} 
                        onChange={this.changeInputValue}
                        value={this.state.inputValue}
                        style={{width: '250px',marginRight:'10px'}}/>
                    <Button type="primary" onClick={this.handleClick}>增加</Button>
                    <Button type="link" onClick={this.handleMockData}>Mock数据</Button>
                </div>
                <List
                    header={<strong>任务列表</strong>}
                    footer={<a href="https://github.com/dunizb/CodeTest/tree/master/React/redux/React-and-Redux-TodoList" rel="noopener noreferrer" target="_blank">查看代码</a>}
                    bordered
                    dataSource={this.state.list}
                    loading={this.state.loading}
                    renderItem={(item, index) => (
                        <List.Item
                            actions={[<Icon type="close-circle" theme="filled" key="delete-item" onClick={this.deleteItem.bind(this, index)} />]}
                        > 
                            {item}
                        </List.Item>
                    )}
                />
            </div>
        );
    }

    handleMockData = () => {
        this.setState({ loading: true })
        const action = getTodoList(() => this.setState({ loading: false }));
        store.dispatch(action);
    }

    changeInputValue(e){
        const action = changeInputAction(e.target.value);
        store.dispatch(action);
    }

    storeChange = () => {
        const action = store.getState();
        this.setState(action);
    }

    handleClick = () => {
        const action = addItemAction();
        store.dispatch(action);
    }

    deleteItem(index) {
        const action = deleteItemAction(index);
        store.dispatch(action);
    }
}
 
export default TodoList;
