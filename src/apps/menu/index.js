import React from 'react'
import {render} from 'react-dom'
import {Switch, BrowserRouter, Route, Link, HashRouter, Redirect} from 'react-router-dom'
import {Table, Menu, Row, Col, message} from 'antd'

import Menus from './component/Menu'
import Notice from './component/Notice'


class App extends React.Component {
  constructor() {
    super()
  }

  render() {
    return <HashRouter>
      <div>
        <Route exact path="/" component={Menus}/>
        <Route path="/notice" component={Notice}/>
        <Route path="/code" component={Notice}/>

      </div>
    </HashRouter>
  }
}

render(<App></App>, document.getElementById('root'))