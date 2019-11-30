import Sokoban from "./sokoban";
import SolverFactory from "./solver/factory"

const keyCodeToDirection = { 37: "left", 38: "up", 39: "right", 40: "down" }
let sokoban = new Sokoban(refreshGameStats)

const canvas = document.getElementById('canvas')
canvas.width = 512
canvas.height = 512

let states = []
let currentStateIndex = 0

function refreshGameStats(stats) {
  const { stepCount, boxPushes, level } = stats

  $("#steps-taken").text(stepCount)
  $("#box-pushes").text(boxPushes)
  $("#level").text(level)
  $("#select-level").val(level)
}

function refreshSolverStats(stats) { }

document.addEventListener("DOMContentLoaded", () => {
  $("#reset-level").click(() => sokoban.resetLevel())
  $("#skip-level").click(() => sokoban.nextLevel())
  $(".reset-game").click(() => sokoban.resetGame())

  $("#select-level").change(() => {
    const levelAsText = $("#select-level").val()
    const level = parseInt(levelAsText)
    sokoban.startLevel(level)
  })

  $("#clear-states").click(() => {
    $("#state-text").val("")

    states = []
    currentStateIndex = 0

    $("#states-found").text(states.length)
    $("#current-state").text(currentStateIndex + 1)
  })
  $("#read-states").click(() => {
    const stateText = $("#state-text").val()
    states = stateText.split("\n")
    currentStateIndex = 0

    $("#states-found").text(states.length)
    $("#current-state").text(currentStateIndex + 1)
    sokoban.restoreState(JSON.parse(states[currentStateIndex]).state)
  })
  $("#previous-state").click(() => {
    if (currentStateIndex === 0) return
    currentStateIndex--
    $("#current-state").text(currentStateIndex + 1)
    sokoban.restoreState(JSON.parse(states[currentStateIndex]).state)
  })
  $("#next-state").click(() => {
    if (states.length === currentStateIndex + 1) return
    currentStateIndex++
    $("#current-state").text(currentStateIndex + 1)
    // sokoban.restoreState(JSON.parse(states[currentStateIndex]).state)
    sokoban.movePlayer(JSON.parse(states[currentStateIndex]).action)
  })

  document.addEventListener("keydown", () => {
    event.preventDefault()

    if (sokoban.levelCompleted()) {
      alert("You won!")
      sokoban.nextLevel()
    }

    const direction = keyCodeToDirection[event.keyCode]

    if (!direction) return

    sokoban.movePlayer(direction)
  })
})
