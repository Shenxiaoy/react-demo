import React from 'react'

function collect() {

}

export default class Head extends React.Component {
  constructor() {
    super()
    this.state = {
      num: 1
    }
  }

  boxs() {
    let ary = []
    for(let i = 0; i < 3; i++) {
      ary.push(<div key={i}>{i}-----------</div>)
    }
    return ary
  }


  render() {

    return <div>
      {this.boxs()}
    </div>
  }
}