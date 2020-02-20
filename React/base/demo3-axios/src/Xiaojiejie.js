import React from 'react';
import XiaojiejieItem from './XiaojiejieItem'

class Xiaojiejie extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      inputValue: '',
      list: ['基础按摩', '精油推背']
    }
  }

  handleChange = () => {
    this.setState({
      inputValue: this.input.value
    })
  }

  addList = () => {
    this.setState({
      list: [...this.state.list, this.state.inputValue]
    })
  }

  deleteItem = (index) => {
    const list = this.state.list;
    list.splice(index, 1);
    this.setState({ list })
  }

  // 性能优化
  shouldComponentUpdate(nextProps,nextState){
    if(nextProps.content !== this.props.content){
      return true
    }else{
      return false
    }
  }

  render() {
    return (
      <div>
        <h1>小姐姐的服务</h1>
        <div>
          <label htmlFor="jspang">加入服务：</label>
          <input 
            id="jspang" 
            type="text" 
            value={this.state.inputValue} 
            onChange={this.handleChange} 
            ref={(input) => {this.input = input}}
          />
          <button onClick={this.addList}>添加服务</button>
        </div>
        <ul>
          {
            this.state.list.map((item, index) => {
              return (
                <XiaojiejieItem 
                  key={item+index} 
                  index={index} 
                  content={item}
                  deleteItem={this.deleteItem}
                />
              )
            })
          }
        </ul>
      </div>
    );
  }
}

export default Xiaojiejie;
