import React from 'react'
import {Table, Button} from 'antd'
import {Switch, BrowserRouter, Route, NavLink, HashRouter} from 'react-router-dom'
import Nav from '../menu/Menu'

export default class Notice extends React.Component {
  constructor() {
    super()
    this.state = {
      num: 1,
      name: 's'
    }
  }

  onClick = () => {
    this.setState({num: this.state.num + 1})
    setTimeout(()=>{
      this.setState({name: 'xiao'})
    })
  }
  
  render() {
    console.log('------')
    return <div>
      <p>
        <br/>
        <Button type="primary" onClick={this.onClick}>刷新</Button>
        <span>{this.state.num}</span>
        <span>{this.state.name}</span>
      </p>
      <Route path="/notice/ss" component={Nav} />
    </div>
  }
}