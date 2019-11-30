const maxTrials = 100
const maxDepth = 1000

const INFINITY = 10000000

const cost = 1
const heuristicStart = maxDepth

// deterministic version of RTDP Solver
class GreedySolver {
  constructor (simulator, solveStats) {
    this.simulator = simulator
    this.solveStats = solveStats
    this.valuesPerState = new Map()
    this.availableActions = this.simulator.actions()
    this.deadEndActionsPerState = new Map()
  }

  solve () {
    const discoveredStates = new Map()

    for (let trialNumber = 0; trialNumber < maxTrials; trialNumber++) {
      console.log(`Trial: ${trialNumber}`)
      // this.valuesPerState.forEach((value, key) => console.log(`State [${key}] = ${value}`))

      let visitedStates = []
      let state = this.simulator.start()
      discoveredStates.set(state.id(), state)

      for (let i = 0; i < maxDepth; i++) {
        if (this.simulator.reachedGoal()) {
          console.log("achei!!!!")
          break
        }

        this.valuesPerState.set(state.id(), this.computeUpdateValue(state))

        const action = this.chooseGreedyAction(state)
        state = this.getNextState(state, action)
        discoveredStates.set(state.id(), state)
      }

      for (const visitedState of visitedStates) {
        this.valuesPerState.set(visitedState.id(), this.computeUpdateValue(visitedState))
      }
    }

    const stateTraverseOrder = this.runDiscoveredPath()

    return { stateTraverseOrder, discoveredStates }
  }

  computeUpdateValue(state) {
    const actions = this.availableActions
    const values = []

    // compute values for each possible action
    for (const action of actions) {
      const value = this.getValueForState(state, action)
      values.push(value)
    }

    // recover the min value
    return cost + values.reduce((min, current) => Math.min(min, current))
  }

  chooseGreedyAction(state) {
    const actions = this.availableActions
    let bestAction = null
    let bestValue = INFINITY

    for (const action of actions) {
      const value = this.getValueForState(state, action)

      if (value < bestValue) {
        bestAction = action
        bestValue = value
      }
    }

    return bestAction
  }

  getNextState(state, action) {
    const nextState = this.simulator.simulateAction(action)
    this.simulator.restoreState(state)

    return nextState
  }

  getValueForState(state, action) {
    const nextState = this.getNextState(state, action)

    if (state.id() === nextState.id()) {
      this.markAsDeadendAction(state, action)
    }

    return (this.valuesPerState.get(nextState.id()) || heuristicStart)
  }

  markAsDeadendAction(state, action) {
    const deadEndActions = this.deadEndActionsPerState.get(state.id()) || []
    if (deadEndActions.includes(action)) return

    deadEndActions.push(action)
    this.deadEndActionsPerState.set(state.id(), deadEndActions)
  }

  runDiscoveredPath() {
    const stateTraverseOrder = []
    let state = this.simulator.start()
    stateTraverseOrder.push(state)

    for (let i = 0; i < maxDepth; i++) {
      if (this.simulator.reachedGoal()) return

      const action = this.chooseGreedyAction(state)
      state = this.simulator.simulateAction(action)
      stateTraverseOrder.push(state)
    }

    return stateTraverseOrder
  }
}

export default GreedySolver
