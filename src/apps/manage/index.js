import React from 'react'
import {render} from 'react-dom'
import {Switch, BrowserRouter, Route, Link, HashRouter, Redirect} from 'react-router-dom'
import {Table, Menu, Row, Col, message, Button} from 'antd'
import App from '../common/App'
import Drag from './drag'
import Nav from './nav'

class Manage extends React.Component {
  constructor() {
    super()
    this.state = {

    }
  }

  render() {
    return <div>
      <App>
        <HashRouter>
          <div>
            <Route exact path="/" component={Nav}/>
            <Route path="/drag" component={Drag}/>
          </div>
        </HashRouter>
      </App>
    </div>
  }
}

render(<Manage/>, document.getElementById('root'))