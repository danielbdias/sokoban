import Board from './board'
import LEVELS from './levels'

const FIRST_LEVEL = 1
const LAST_LEVEL = 30

class Sokoban {
  constructor (statsNotifier) {
    this.statsNotifier = statsNotifier
    this.startLevel(FIRST_LEVEL)
  }

  currentLevel () {
    return this.level + 1
  }

  startLevel (level) {
    if (level < FIRST_LEVEL || level > LAST_LEVEL) throw new Error(`Level ${level} does not exist !`)

    const zeroIndexedLevel = level - 1
    const textGrid = LEVELS[zeroIndexedLevel]

    this.level = zeroIndexedLevel

    this.board = new Board(textGrid)
    this.notifyState()
  }

  resetLevel () {
    this.startLevel(this.currentLevel())
  }

  resetGame () {
    this.startLevel(FIRST_LEVEL)
  }

  nextLevel () {
    if (this.isLastLevel()) return
    this.startLevel(this.currentLevel() + 1)
  }

  isLastLevel() {
    return this.currentLevel() === LAST_LEVEL
  }

  levelCompleted () {
    return this.board.gameOver()
  }

  movePlayer (action) {
    this.board.movePlayer(action)
    this.notifyState()
  }

  currentState () {
    return {
      stepCount: this.board.stepCount,
      boxPushes: this.board.boxPushes,
      level: this.currentLevel(),
      board: this.board.boardState()
    }
  }

  notifyState () {
    this.statsNotifier({
      stepCount: this.board.stepCount,
      boxPushes: this.board.boxPushes,
      level: this.currentLevel()
    })
  }

  restoreState (state) {
    this.level = state.level - 1

    this.board = new Board(state.board)
    this.board.stepCount = state.stepCount
    this.board.boxPushes = state.boxPushes

    this.notifyState()
  }
 }

export default Sokoban
