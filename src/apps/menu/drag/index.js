import React from 'react'
import { Route, Link} from 'react-router-dom'
import DragForm from './creat-form'
import Example from './examples/05 Customize/Drop Effects'

export default class Drag extends React.Component {

  render() {
    return <div>
      <p>creat-form</p>
      <Route path="/drag/form" component={DragForm} />
      <Route path="/drag/example" component={Example} />
    </div>
  }
}