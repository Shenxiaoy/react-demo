let componentPosition = {
  inputPosition: [],
  selectPosition: []
}
let observer = null

function emitChange() {
  observer(componentPosition)
}

export function observe(o) {

  if (observer) {
    throw new Error('Multiple observers not implemented.')
  }

  observer = o
  emitChange()

  return () => {
    observer = null
  }
}

// export function canMoveKnight(toX, toY) {
//
//   const [x, y] = knightPosition
//   const dx = toX - x
//   const dy = toY - y
//
//   return (
//     (Math.abs(dx) === 2 && Math.abs(dy) === 1) ||
//     (Math.abs(dx) === 1 && Math.abs(dy) === 2)
//   )
// }

//清除拖动源初始位置和放置位置
function replaceComponent(i,type,delPosition, componentTypeName) {
  let componentType = componentPosition[componentTypeName]
  let positionInfo = {
    position: i
  }
  if(delPosition!=undefined) {
    occupyDragPosition(delPosition)
    occupyDragPosition(i)
    componentType.push(positionInfo)
  } else {
    occupyDragPosition(i)
    componentType.push(positionInfo)
  }
}
function occupyDragPosition(dragPosition) {
  for(const k in componentPosition) {
    const typeAry = componentPosition[k]
    typeAry.forEach((item, index)=>{
      if(item.position === dragPosition) {
        typeAry.splice(index, 1)
      }
    })
  }
}
//添加拖动源位置标记
export function moveComponent(i,type,delPosition) {
  switch(type) {
    case 'input':
      replaceComponent(i, type, delPosition, 'inputPosition')
      break
    case 'select':
      replaceComponent(i, type, delPosition, 'selectPosition')
      break
    default:
  }
  emitChange()
}
