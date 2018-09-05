import React from 'react'
import { Route, Link} from 'react-router-dom'
import DragForm from './creat-form'
import Example from './examples/05 Customize/Drop Effects'

export default class Drag extends React.Component {

  render() {
    console.log('组件拖拽生成表单')
    return <div>
      <p style={{fontWeight: 'bold'}}>组件拖拽生成表单</p>
      <br/>
      <Route path="/drag/form" component={DragForm} />
      <Route path="/drag/example" component={Example} />
    </div>
  }
}