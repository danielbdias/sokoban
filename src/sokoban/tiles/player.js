import Tile from './tile'
import Floor from './floor'

class Player extends Tile {
  constructor (row, column) {
    super(row, column)
    this.imageSrc = './png/player/player_04.png'
  }

  switchImage (direction) {
    switch (direction) {
      case 'up':
        this.imageSrc = './png/player/player_01.png'
        break

      case 'down':
        this.imageSrc = './png/player/player_04.png'
        break

      case 'left':
        this.imageSrc = './png/player/player_13.png'
        break

      case 'right':
        this.imageSrc = './png/player/player_16.png'
        break

      default:
        this.imageSrc = './png/player/player_04.png'
        break
    }
  }
}

export default Player
