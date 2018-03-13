import React from 'react'
import {render} from 'react-dom'
import Drag from './index'

export  default class App extends React.Component {
  constructor() {
    super()
  }

  render() {
    return <div>
      <Drag/>
    </div>
  }
}
