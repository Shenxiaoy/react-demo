let componentPosition = {
  inputPosition: [],
  selectPosition: null
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

export function moveComponent(i,type,delPosition) {

  if(type === 'input') {
    let positionInfo = {
      position: i
    }
    if(delPosition!=undefined) {
      componentPosition.inputPosition.forEach((item, index)=>{
        if(item.position === delPosition) {
          componentPosition.inputPosition.splice(index, 1)
        }
      })
      componentPosition.inputPosition.forEach((item, index)=>{
        if(item.position === i) {
          componentPosition.inputPosition.splice(index-1, 1)
        }
      })
      componentPosition.inputPosition.push(positionInfo)
    } else {

      componentPosition.inputPosition.push(positionInfo)
    }

  } else if(type === 'select') {
    componentPosition.selectPosition = i
  }
  emitChange()
}
