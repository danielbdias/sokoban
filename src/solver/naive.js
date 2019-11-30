const maxSteps = 10000

function chooseAction(actions) {
  const index = Math.floor(actions.length * Math.random())
  return actions[index]
}

class NaiveSolver {
  constructor (simulator, solveStats) {
    this.simulator = simulator
    this.solveStats = solveStats
  }

  solve () {
    const stateTraverseOrder = []
    const discoveredStates = new Map()

    let state = this.simulator.start()
    this.registerState(discoveredStates, stateTraverseOrder, state)

    for (let i = 0; i < maxSteps; i++) {
      if (this.simulator.reachedGoal()) break

      const action = chooseAction(this.simulator.actions())
      state = this.simulator.simulateAction(action)
      this.registerState(discoveredStates, stateTraverseOrder, state)
    }

    return { stateTraverseOrder, discoveredStates }
  }

  registerState(discoveredStates, stateTraverseOrder, state) {
    discoveredStates.set(state.id(), state)
    stateTraverseOrder.push(state)

    this.solveStats({
      discoveredStates: discoveredStates.size,
      stepsSimulated: stateTraverseOrder.length,
      goalFound: this.simulator.reachedGoal()
    })
  }
}

export default NaiveSolver
