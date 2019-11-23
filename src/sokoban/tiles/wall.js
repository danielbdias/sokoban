import Tile from "./tile.js";

class Wall extends Tile {

  constructor(row, column) {
    super(row, column);
    this.imageSrc = "./png/environment/environment_04.png";
  }

}

export default Wall;
