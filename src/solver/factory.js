import NaiveSolver from './naive'

function create (solverType, simulator, solveStats) {
  if (solverType === "naive") return new NaiveSolver(simulator, solveStats)

  throw new Error(`invalid solver! solverType: ${solverType}`)
}

export default { create }
