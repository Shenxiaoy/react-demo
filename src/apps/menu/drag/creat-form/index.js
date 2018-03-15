import React from 'react'
import Form from './Form'
import { observe } from './stateStore'

export default class AddComponent extends React.Component {
  constructor(props) {
    super(props)
    this.unobserve = observe(this.handleChange.bind(this))
  }
  handleChange(componentPosition, cardVisible) {
    const nextState = { componentPosition, cardVisible }
    if (this.state) {
      this.setState(nextState)
    } else {
      this.state = nextState
    }
  }

  componentWillUnmount() {
    this.unobserve()
  }


  render() {
    const { componentPosition, cardVisible } = this.state

    return <div>
      <Form componentPosition={componentPosition} cardVisible={cardVisible}/>
    </div>
  }
}