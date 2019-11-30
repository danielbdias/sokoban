import NaiveSolver from './naive'
import GreedySolver from './greedy'

function create (solverType, simulator, solveStats) {
  if (solverType === "naive") return new NaiveSolver(simulator, solveStats)
  if (solverType === "greedy") return new GreedySolver(simulator, solveStats)

  throw new Error(`invalid solver! solverType: ${solverType}`)
}

export default { create }
