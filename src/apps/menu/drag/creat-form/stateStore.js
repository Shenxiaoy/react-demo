let componentPosition = {
  inputPosition: null,
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

export function moveComponent(i,type) {

  if(type === 'input') {
    componentPosition.inputPosition = i
  } else if(type === 'select') {
    componentPosition.selectPosition = i
  }
  emitChange()
}
