import React from 'react';
import { Card, Table, Modal, Button } from 'antd';

export default class BasicTable extends React.Component{
    state = {
        dataSource: [],
        selectedRowKeys: [],
        selectedRows: []
    }

    componentDidMount(){
        const data = [
            {
                id:'0',
                userName:'张三',
                sex:'1',
                state:'1',
                interest:'1',
                birthday:'2000-01-01',
                address:'北京市海淀区奥林匹克公园',
                time:'09:00'
            },
            {
                id: '1',
                userName: '王武',
                sex: '1',
                state: '2',
                interest: '1',
                birthday: '2000-01-01',
                address: '北京市海淀区奥林匹克公园',
                time: '09:00'
            },
            {
                id: '2',
                userName: '李四',
                sex: '1',
                state: '1',
                interest: '1',
                birthday: '2000-01-01',
                address: '北京市海淀区奥林匹克公园',
                time: '09:00'
            },
        ]
        this.setState({
            dataSource: data
        })
    }

    onRowClick = (record, index) => {
        Modal.info({
            title:'信息',
            content:`用户名：${record.userName},用户爱好：${record.interest}`
        })
    }

    onRowClick2 = (record, index) => {
        let selectKey = [index];
        Modal.info({
            title:'信息',
            content:`用户名：${record.userName},用户爱好：${record.interest}`
        })
        this.setState({
            selectedRowKeys: selectKey,
            selectedRows: record
        })
    }

    onClickMe = () => {
        console.log(this.state.selectedRowKeys)
    }


    render(){
        const columns = [
            {
                title:'id',
                key:'id',
                dataIndex:'id'
            },
            {
                title: '用户名',
                key: 'userName',
                dataIndex: 'userName'
            },
            {
                title: '性别',
                key: 'sex',
                dataIndex: 'sex',
                render(sex){
                    return sex === 1 ? '男' : '女'
                }
            },
            {
                title: '状态',
                key: 'state',
                dataIndex: 'state',
                render(state){
                    let config  = {
                        '1':'咸鱼一条',
                        '2':'风华浪子',
                        '3':'北大才子',
                        '4':'百度FE',
                        '5':'创业者'
                    }
                    return config[state];
                }
            },
            {
                title: '爱好',
                key: 'interest',
                dataIndex: 'interest',
                render(abc) {
                    let config = {
                        '1': '游泳',
                        '2': '打篮球',
                        '3': '踢足球',
                        '4': '跑步',
                        '5': '爬山',
                        '6': '骑行',
                        '7': '桌球',
                        '8': '麦霸'
                    }
                    return config[abc];
                }
            },
            {
                title: '生日',
                key: 'birthday',
                dataIndex: 'birthday'
            },
            {
                title: '地址',
                key: 'address',
                dataIndex: 'address'
            },
            {
                title: '早起时间',
                key: 'time',
                dataIndex: 'time'
            }
        ]
        const rowSelection = {
            onChange: (selectedRowKeys, selectedRows) => {
                this.setState({ selectedRowKeys, selectedRows })
            }
        }
        const selectedCount = this.state.selectedRowKeys.length;

        const rowSelection2 = {
            type: 'radio',
            selectedRowKeys: this.state.selectedRowKeys,
            onChange: (selectedRowKeys, selectedRows) => {
                this.setState({ selectedRowKeys, selectedRows })
            }
        }
        const selectedRows = this.state.selectedRows || [];
        return (
            <div>
                <Card title="基础表格-复选框">
                    <div style={{ marginBottom: 16 }}>
                        <Button type="primary" onClick={this.onClickMe}>Click Me</Button>&nbsp;
                        Selected {selectedCount} items
                    </div>
                    <Table 
                        bordered
                        columns={columns}
                        dataSource={this.state.dataSource}
                        rowSelection={rowSelection}
                        onRow={(record, index) => {
                            return {
                                onClick: () => {
                                    this.onRowClick(record, index)
                                }
                            }
                        }}
                        rowKey="id"
                        pagination={false}
                    />
                </Card>
                <Card title="基础表格-单选框" style={{margin:'10px 0'}}>
                    <p>选择的用户：{selectedRows.length > 0 ? selectedRows[0].userName : ''}</p>    
                    <Table 
                        bordered
                        columns={columns}
                        dataSource={this.state.dataSource}
                        rowSelection={rowSelection2}
                        onRow={(record, index) => {
                            return {
                                onClick: () => {
                                    this.onRowClick2(record, index)
                                }
                            }
                        }}
                        rowKey="id"
                        pagination={false}
                    />
                </Card>
            </div>
        );
    }
}
