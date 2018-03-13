import React from 'react'
import {render} from 'react-dom'
import {Switch, BrowserRouter, Route, Link, HashRouter, Redirect} from 'react-router-dom'
import {Table, Menu, Row, Col, message} from 'antd'

import Menus from './component/Menu'
import Notice from './component/Notice'
// import Drag from './drag/chessBoad/Drag'
import Drag from './drag'
import Dustbin from './drag/dustbin/Copy or Move/index'


class App extends React.Component {
  constructor() {
    super()
  }

  render() {
    return <HashRouter>
      <div>
        <Route exact path="/" component={Menus}/>
        <Route path="/notice" component={Notice}/>
        <Route path="/drag" component={Drag}/>
        <Route path="/dustbin" component={Dustbin}/>

      </div>
    </HashRouter>
  }
}

render(<App></App>, document.getElementById('root'))