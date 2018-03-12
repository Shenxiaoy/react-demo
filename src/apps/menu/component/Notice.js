import React from 'react'
import {Table} from 'antd'
import {Switch, BrowserRouter, Route, NavLink, HashRouter} from 'react-router-dom'
import CodeStyle from './CodeStyle'
import Nav from './Menu'

export default class Notice extends React.Component {
  constructor() {
    super()
  }
  
  render() {
    return <div>
      shenxiaoyu
      <Route path="/notice/ss" component={Nav} />
    </div>
  }
}