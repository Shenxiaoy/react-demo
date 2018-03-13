import React from 'react'
import {render} from 'react-dom'
import {Table, Menu, Row, Col, message, Button} from 'antd'
import Head from './header/Head'

class Manage extends React.Component {
  constructor() {
    super()
    this.state = {
      num: 1
    }
  }
  onClick = () => {
    this.setState({num: this.state.num + 1})
  }
  render() {
    return <div>
      ok-666 <Button onClick={this.onClick} type="primary">点击</Button>
      <span>{this.state.num}</span>
      <div>
        {
          this.state.num % 2 &&  <Head num={this.state.num}/>
        }
      </div>
    </div>
  }
}

render(<Manage/>, document.getElementById('root'))