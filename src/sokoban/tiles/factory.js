import Tile from './tile'
import Floor from './floor'
import Wall from './wall'
import Player from './player'
import Box from './box'
import Checkpoint from './checkpoint'

function create(symbol, rowIndex, colIndex) {
  if (symbol === '#') return new Wall(rowIndex, colIndex)

  if (symbol === ' ') return new Floor(rowIndex, colIndex)
  if (symbol === '$') {
    const floor = new Floor(rowIndex, colIndex)
    floor.box = new Box(rowIndex, colIndex)
    return floor
  }
  if (symbol === '@') {
    const floor = new Floor(rowIndex, colIndex)
    floor.player = new Player(rowIndex, colIndex)
    return floor
  }

  if (symbol === '.') return new Checkpoint(rowIndex, colIndex)
  if (symbol === '*') {
    const checkpoint = new Checkpoint(rowIndex, colIndex)
    checkpoint.box = new Box(rowIndex, colIndex)
    return checkpoint
  }
  if (symbol === '+') {
    const checkpoint = new Checkpoint(rowIndex, colIndex)
    checkpoint.player = new Player(rowIndex, colIndex)
    return checkpoint
  }

  return null
}

function symbolFromTile(tile) {
  if (tile instanceof Wall) return '#'
  if (tile instanceof Floor) {
    if (tile.box) return '*'
    if (tile.player) return '+'
    return '.'
  }
  if (tile instanceof Checkpoint) {
    if (tile.box) return '$'
    if (tile.player) return '@'
    return ' '
  }
}

export default { create, symbolFromTile }
