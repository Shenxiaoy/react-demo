import React from 'react'
import {Select} from 'antd'
import PropTypes from 'prop-types'
import {DragSource} from 'react-dnd'
import ItemProps from './itemTypes'

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

@DragSource(ItemProps.SELECT, knightSource, collect)
export default class DragSelect extends React.Component {
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
        <Select style={{width: 200}}>
          <Option value="jack">Jack</Option>
          <Option value="lucy">Lucy</Option>
          <Option value="disabled" disabled>Disabled</Option>
          <Option value="Yiminghe">yiminghe</Option>
        </Select>
      </div>,
    )
  }
}