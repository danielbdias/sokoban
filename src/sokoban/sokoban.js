import Board from "./board.js";
import LEVELS from "./levels.js";

class Sokoban {

  constructor(level = 0) {
    this.level = level;
    const textGrid = LEVELS[this.level];

    const canvas = document.getElementById("canvas");
    canvas.width = 512;
    canvas.height = 512;

    this.board = new Board(textGrid);
  }
}

export default Sokoban;