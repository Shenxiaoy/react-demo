import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { DropTarget } from 'react-dnd'
import ItemTypes from './itemTypes'
import {moveComponent} from './stateStore'

const squareTarget = {
  // canDrop(props, monitor) {
  //   return canMoveComponent(props.position, 'input')
  // },

  drop(props, monitor) {
    const {position, componentPosition} = props
    const type = monitor.getItemType()

    //相同位置插入组件，后者把前者替换掉
    for(let k in componentPosition) {
      const name= k.slice(0,-8)
      if(componentPosition[k] === position && name!=type) {
        moveComponent(null, name)
      }
    }

    if(type == 'input') {
      moveComponent(position, 'input')
    } else if(type == 'select') {
      moveComponent(position, 'select')
    }
  },
}

function collect(connect, monitor) {

  return {
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver(),
    canDrop: monitor.canDrop(),
  }
}

@DropTarget(ItemTypes.COMPONENTS, squareTarget, collect)
export default class BoardSquare extends Component {
  static propTypes = {
    isOver: PropTypes.bool.isRequired,
    canDrop: PropTypes.bool.isRequired,
    connectDropTarget: PropTypes.func.isRequired,
    children: PropTypes.node,
  }

  renderOverlay(color) {
    return (
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          height: '100%',
          width: '100%',
          zIndex: 1,
          opacity: 0.5,
          backgroundColor: color,
        }}
      />
    )
  }

  render() {

    const { position, connectDropTarget, isOver, canDrop, children } = this.props

    return connectDropTarget(
      <div
        style={{
          position: 'relative',
          width: '100%',
          height: '30px',
          border: `1px dashed ${isOver?'red' : 'white'}`
        }}
      >
        {children}
      </div>,
    )
  }
}
