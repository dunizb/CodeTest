import React from 'react';

class Xiaojiejie extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      inputValue: '',
      list: []
    }
  }

  handleChange = (e) => {
    this.setState({
      inputValue: e.target.value
    })
  }

  addList = () => {
    this.setState({
      list: [...this.state.list, this.state.inputValue]
    })
  }

  deleteItem(index) {
    // console.log(e.target.dataset)
    const list = this.state.list;
    list.splice(index, 1);
    this.setState({ list })
  }

  render() {
    return (
      <div>
        <h1>小姐姐的服务</h1>
        <div>
          <label htmlFor="jspang">加入服务：</label>
          <input id="jspang" type="text" value={this.state.inputValue} onChange={this.handleChange} />
          <button onClick={this.addList}>添加服务</button>
        </div>
        <ul>
          {
            this.state.list.map((item, index) => {
              return (
                <li 
                  key={index+item} 
                  onClick={this.deleteItem.bind(this, index)}
                  dangerouslySetInnerHTML={{__html: item}}>
                </li>
              )
            })
          }
        </ul>
      </div>
    );
  }
}

export default Xiaojiejie;
