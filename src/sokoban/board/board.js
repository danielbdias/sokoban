import GridSerializer from './gridSerializer'
import Checkpoint from '../tiles/checkpoint'
import Wall from '../tiles/wall'

function findPlayer(grid) {
  const tiles = grid.reduce((list, row) => list.concat(row), [])
  const tilesWithPlayer = tiles.filter(tile => tile.player)

  return tilesWithPlayer[0].player
}

class Board {
  constructor (textGrid) {
    this.stage = new createjs.Stage('canvas')
    this.stepCount = 0
    this.boxPushes = 0
    this.objectGrid = GridSerializer.fromText(textGrid)
    this.playerObject = findPlayer(this.objectGrid)
    this.render()
  }

  render () {
    this.objectGrid.forEach(row => {
      row.forEach(tileClass => {
        tileClass.render(this.stage)
      })
    })
  }

  getGridObject (row, column) {
    if (row < 0 || column < 0) { return undefined }
    return this.objectGrid[row][column]
  }

  outsideOfBox (direction, row, column) {
    if (direction === 'left' || direction === 'right') {
      if (column === 0 || column === 7) return false
    } else if (direction === 'up' || direction === 'down') {
      if (row === 0 || row === 7) return false
    }

    return true
  }

  getAdjacentTiles (direction, row, column) {
    const playerTile = this.getGridObject(row, column)
    const player = this.playerObject
    let oneTileFromPlayer, twoTilesFromPlayer
    switch (direction) {
      case 'left':
        oneTileFromPlayer = this.getGridObject(row, column - 1)
        twoTilesFromPlayer = this.getGridObject(row, column - 2)
        break

      case 'right':
        oneTileFromPlayer = this.getGridObject(row, column + 1)
        twoTilesFromPlayer = this.getGridObject(row, column + 2)
        break

      case 'up':
        oneTileFromPlayer = this.getGridObject(row - 1, column)
        twoTilesFromPlayer = this.getGridObject(row - 2, column)
        break

      case 'down':
        oneTileFromPlayer = this.getGridObject(row + 1, column)
        twoTilesFromPlayer = this.getGridObject(row + 2, column)
        break
    }

    return { playerTile, oneTileFromPlayer, twoTilesFromPlayer, player }
  }

  handlePlayerTileSwitch (direction, player) {
    if (direction === 'left') {
      player.column -= 1
    } else if (direction === 'right') {
      player.column += 1
    } else if (direction === 'up') {
      player.row -= 1
    } else if (direction === 'down') {
      player.row += 1
    }
  }

  obstacleInPlayerPath (oneTileFromPlayer, twoTilesFromPlayer) {
    if (
      (oneTileFromPlayer instanceof Wall) ||
      (oneTileFromPlayer.box && twoTilesFromPlayer instanceof Wall) ||
      (oneTileFromPlayer.box && twoTilesFromPlayer.box)
    ) {
      return true
    }
  }

  handleMovement (direction) {
    const playerObject = this.playerObject
    const { row, column } = playerObject

    if (!this.outsideOfBox(direction, row, column)) return
    const {
      playerTile,
      oneTileFromPlayer, twoTilesFromPlayer,
      player
    } = this.getAdjacentTiles(direction, row, column)

    if (this.obstacleInPlayerPath(oneTileFromPlayer, twoTilesFromPlayer)) {
      return
    }

    oneTileFromPlayer.player = playerTile.player
    this.handlePlayerTileSwitch(direction, player)

    playerTile.player = false
    this.stepCount++

    if (oneTileFromPlayer.box) {
      twoTilesFromPlayer.box = oneTileFromPlayer.box
      oneTileFromPlayer.box = false
      this.boxPushes++
    }

    this.render()
  }

  gameOver () {
    const flattened = this.objectGrid.reduce((list, row) => list.concat(row), [])
    const checkpoints = flattened.filter(object => {
      return object instanceof Checkpoint
    })
    return checkpoints.every(checkpoint => {
      return checkpoint.box
    })
  }

  movePlayer (direction) {
    this.stage.removeAllChildren()
    this.playerObject.switchImage(direction)
    this.handleMovement(direction)
    this.render()
  }
}

export default Board
