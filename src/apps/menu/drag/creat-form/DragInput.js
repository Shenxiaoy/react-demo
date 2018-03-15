import React from 'react'
import {Input} from 'antd'
import PropTypes from 'prop-types'
import {DragSource} from 'react-dnd'
import ItemProps from './itemTypes'
import {cardAbled} from './stateStore'

const knightSource = {
  beginDrag(props, monitor) {
    return {positionInfo: props.positionInfo}
  }
}

function collect(connect, monitor) {
  return {
    connectDragSource: connect.dragSource(),
    connectDragPreview: connect.dragPreview(),
    isDragging: monitor.isDragging(),
  }
}

@DragSource(ItemProps.INPUT, knightSource, collect)
export default class DragInput extends React.Component {
  static propTypes = {
    connectDragSource: PropTypes.func.isRequired,
    connectDragPreview: PropTypes.func.isRequired,
    isDragging: PropTypes.bool.isRequired,
  }

  onFocus = (e) => {
    const {positionInfo} = this.props
    if(positionInfo) {
      cardAbled(positionInfo.position)
    }
  }

  render() {

    const { connectDragSource, isDragging } = this.props
    return connectDragSource(
      <div
        style={{
          cursor: 'move',
          opacity: isDragging ? 0.5 : 1,
        }}
      >
        <Input style={{width: 200}} onFocus={this.onFocus}/>
      </div>,
    )
  }
}