import Tile from "./tile.js";

class Checkpoint extends Tile {

  constructor(row, column) {
    super(row, column);
    this.imageSrc = "./png/crates/crate_30.png";
    this.player = false;
    this.box = false;
  }

}

export default Checkpoint;
