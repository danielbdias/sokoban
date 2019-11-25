import TileFactory from '../tiles/factory'
import Tile from '../tiles/tile'

function fromText(textGrid) {
  return textGrid.map((array, rowIndex) =>
    array.map((symbol, colIndex) =>
      TileFactory.create(symbol, rowIndex, colIndex)
    )
  )
}

function toText(objectGrid) {
  return objectGrid.map(array =>
    array.map(tile => TileFactory.symbolFromTile(tile))
  )
}

export default { fromText, toText }
