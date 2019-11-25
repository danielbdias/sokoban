import Sokoban from "./sokoban";

const keyCodeToDirection = { 37: "left", 38: "up", 39: "right", 40: "down" }
let sokoban = new Sokoban(refreshGameStats)

const canvas = document.getElementById('canvas')
canvas.width = 512
canvas.height = 512

function refreshGameStats(stats) {
  const { stepCount, boxPushes, level } = stats

  $("#steps-taken").text(stepCount)
  $("#box-pushes").text(boxPushes)
  $("#level").text(level)
  $("#select-level").val(level)
}

document.addEventListener("DOMContentLoaded", () => {
  $("#reset-level").click(() => sokoban.resetLevel())
  $("#skip-level").click(() => sokoban.nextLevel())
  $(".reset-game").click(_ => sokoban.resetGame())

  $("#select-level").change(() => {
    const levelAsText = $("#select-level").val()
    const level = parseInt(levelAsText)
    sokoban.startLevel(level)
  })

  $("#start-solver").click(() => console.log(JSON.stringify(sokoban.currentState())))
  $("#stop-solver").click(() => {
    sokoban.restoreState({"stepCount":16,"boxPushes":3,"level":1,"board":[["#","#","#","#","#","#","#","#"],["#","#","#"," "," ","."," ","#"],["#","#"," ",".","$","#"," ","#"],["#","#"," ","*"," "," "," ","#"],["#","#"," "," ","#","@","#","#"],["#","#","#"," "," ","$","#","#"],["#","#","#","#","#","#","#","#"],["#","#","#","#","#","#","#","#"]]})
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
