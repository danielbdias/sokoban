import stringHash from "string-hash"

class SimulatorState {
  constructor (state) {
    this.state = state
  }

  id() {
    const concatenatedString = this.state.board.reduce((list, row) => list.concat(row), []).join('')
    return stringHash(concatenatedString)
  }

  content() {
    return this.state
  }
}

class SokobanSimulator {
  constructor (sokoban, level) {
    this.sokoban = sokoban
    this.level = level
  }

  start () {
    this.sokoban.startLevel(this.level)
    this.sokoban.setRenderStatus(false)
    return new SimulatorState(this.sokoban.currentState())
  }

  reachedGoal () {
    return this.sokoban.levelCompleted()
  }

  actions () {
    return [ "left", "up", "right", "down" ]
  }

  simulateAction (action) {
    this.sokoban.movePlayer(action)
    return new SimulatorState(this.sokoban.currentState())
  }

  restoreState(state) {
    this.sokoban.restoreState(state.content())
  }
}

export default SokobanSimulator
