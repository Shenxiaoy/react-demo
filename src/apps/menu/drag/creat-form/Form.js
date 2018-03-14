import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { DragDropContext } from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-backend'
import DragInput from './DragInput'
import DragSelect from './DragSelect'
import Panel from './Panel'

@DragDropContext(HTML5Backend)
export default class Board extends Component {
  // static propTypes = {
  //   knightPosition: PropTypes.arrayOf(PropTypes.number.isRequired).isRequired,
  // }

  renderComponent(i) {
    const {componentPosition} = this.props
    return (
      <div key="i" style={{width: '100%'}}>
        <Panel position={i} componentPosition={componentPosition}>
          {this.renderPiece(i)}
        </Panel>

      </div>
    )
  }

  renderDragComponent(i, dragType) {
    const {componentPosition} = this.props
    for(let j = 0; j < dragType.length; j++) {
      const cur = dragType[j].position
      if(i === cur) {
        let positionInfo = {}
        positionInfo = componentPosition.inputPosition.find(item=>{
          return item.position === i
        })
        return <DragInput positionInfo={positionInfo} />
        break
      }
    }
  }

  renderPiece(i) {
    const {componentPosition} = this.props
    for(let k in componentPosition) {
      switch(k) {
        case 'inputPosition':
          return this.renderDragComponent(i, componentPosition[k] )
        default:
          return null
      }

      // if(k == 'inputPosition' && componentPosition[k].length > 0) {
      //   for(let j = 0; j < componentPosition[k].length; j++) {
      //     const cur = componentPosition[k][j].position
      //     if(i === cur) {
      //       let positionInfo = {}
      //       positionInfo = componentPosition.inputPosition.find(item=>{
      //         return item.position === i
      //       })
      //       return <DragInput positionInfo={positionInfo} />
      //       break
      //     }
      //   }
      // }else {
      //   return null
      // }
      // if(componentPosition[k] === i) {
      //   if(k == 'inputPosition') {
      //     return <DragInput/>
      //   } else if(k == 'selectPosition') {
      //     return <DragSelect/>
      //   } else {
      //     return null
      //   }
      // }
    }
  }


  render() {
    const pieces = []
    for (let i = 0; i < 10; i += 1) {
      pieces.push(this.renderComponent(i))
    }

    return <div>
      <div><DragInput/><br/><DragSelect/></div>
      <br/>
      <div
        style={{
          width: 400,
          height: 400,
          border: '1px solid #ccc',
          marginLeft: 200,
          borderSize: 'border-box',
          padding: '0 1px 0 1px'
        }}>
        {pieces}
      </div>
    </div>
  }
}
