import Sokoban from "./sokoban";
import SokobanSimulator from "./sokoban/simulator"
import SolverFactory from "./solver/factory"

const level = 1
const solverType = "greedy"
// const solverType = "naive"

function refreshGameStats(stats) { /* do nothing */ }
function refreshSolverStats(stats) { /* do nothing */ }

const sokoban = new Sokoban(refreshGameStats, true)
const simulator = new SokobanSimulator(sokoban, level)

const solver = SolverFactory.create(solverType, simulator, refreshSolverStats)

const { stateTraverseOrder, discoveredStates } = solver.solve()
console.log("Solution size: ", stateTraverseOrder.length)
console.log("Discovered states: ", discoveredStates.size)

for (let i = 0; i < 30; i++) {
  const { state, action } = stateTraverseOrder[i]
  console.log(JSON.stringify({ state: state.content(), action, id: state.id() }))
}
