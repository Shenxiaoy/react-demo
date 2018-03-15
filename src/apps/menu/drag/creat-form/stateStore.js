let componentPosition = {
  inputPosition: [{position: 1, name: '影魔'}, {position: 3, name: '剑圣'}],
  selectPosition: []
}
let cardVisible = false
let observer = null

function emitChange() {
  observer(componentPosition, cardVisible)
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

//拖拽组件绑定的内容
export function addInfo(position) {
  let componentName = ''
  if(position!==false) {
    for(const k in componentPosition) {
      const typeAry = componentPosition[k]
      typeAry.forEach((item, index)=>{
        if(item.position === position) {
          componentName = item.name
        }
      })
    }
    return componentName
  }
}

export function cardAbled(position) {
  cardVisible = position
  emitChange()
}

//清除拖动源初始位置和放置位置
function replaceComponent(i,type,startPositionIno, componentTypeName) {
  let delPosition = startPositionIno ? startPositionIno.position : undefined
  let name = startPositionIno ? startPositionIno.name : undefined
  let componentType = componentPosition[componentTypeName]
  let positionInfo = {
    position: i,
    name: name
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
export function moveComponent(i,type,startPositionIno) {
  console.log(startPositionIno, '--------')
  switch(type) {
    case 'input':
      replaceComponent(i, type, startPositionIno, 'inputPosition')
      break
    case 'select':
      replaceComponent(i, type, startPositionIno, 'selectPosition')
      break
    default:
  }
  emitChange()
}
