import React from 'react'
import {Input} from 'antd'
import PropTypes from 'prop-types'
import {DragSource} from 'react-dnd'
import ItemProps from './itemTypes'

const knightSource = {
  beginDrag() {
    return {}
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

  render() {
    const { connectDragSource, isDragging } = this.props
    return connectDragSource(
      <div
        style={{
          cursor: 'move',
          opacity: isDragging ? 0.5 : 1,
        }}
      >
        <Input/>
      </div>,
    )
  }
}