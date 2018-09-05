import React, { Component } from 'react'
import {Card} from 'antd'
import PropTypes from 'prop-types'
import { DragDropContext } from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-backend'
import {addInfo} from './stateStore'
import DragInput from './DragInput'
import DragSelect from './DragSelect'
import Panel from './Panel'
import './styles.less'

@DragDropContext(HTML5Backend)
export default class Board extends Component {
  // static propTypes = {
  //   knightPosition: PropTypes.arrayOf(PropTypes.number.isRequired).isRequired,
  // }

  renderComponent(i) {
    const {componentPosition} = this.props
    return (
      <div key={i} style={{width: '100%'}}>
        <Panel position={i} componentPosition={componentPosition}>
          {this.renderPiece(i)}
        </Panel>

      </div>
    )
  }

  renderDragComponent(i, dragType, typePosition) {
    const {componentPosition} = this.props
    for(let j = 0; j < dragType.length; j++) {
      const cur = dragType[j].position
      if(i === cur) {
        let positionInfo = {}
        positionInfo = componentPosition[typePosition].find(item=>{
          return item.position === i
        })
        if(typePosition=='inputPosition') {
          return <DragInput positionInfo={positionInfo} />
        } else if(typePosition=='selectPosition') {
          return <DragSelect positionInfo={positionInfo} />
        }
        break
      }
    }
  }

  renderPiece(i) {
    const {componentPosition} = this.props
    const keysAry = Object.keys(componentPosition)
    return keysAry.map(k=>{
      switch (k) {
        case 'inputPosition':
          return this.renderDragComponent(i, componentPosition[k], 'inputPosition')
        break
        case 'selectPosition':
          return this.renderDragComponent(i, componentPosition[k], 'selectPosition')
        break
        default:
          return null
      }
    })
  }
  render() {
    const {componentPosition, cardVisible} = this.props

    const pieces = []
    for (let i = 0; i < 10; i += 1) {
      pieces.push(this.renderComponent(i))
    }

    return <div className="drag-panels">
      <div><DragInput/><br/><DragSelect/></div>
      <br/>
      <div
        style={{
          width: '50%',
          height: 400,
          border: '1px solid #ccc',
          marginLeft: 20,
          borderSize: 'border-box',
          padding: '0 1px 0 1px'
        }}>
        {pieces}
      </div>
      <div>
        {
          cardVisible!==false && <Card title={ addInfo(cardVisible)}>

          </Card>
        }
      </div>
    </div>
  }
}
