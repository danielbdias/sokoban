import Sokoban from "./sokoban";

const keyCodeToDirection = { 37: "left", 38: "up", 39: "right", 40: "down" }

document.addEventListener("DOMContentLoaded", () => {
  let sokoban = new Sokoban();

  $("#dialog").dialog({
    autoOpen: false,
    modal: true,
    width: 520,
    height: 600,
    dialogClass: "no-close"
  });

  function createNewGame(level) {
    $("#dialog").dialog("close");
    $("#canvas").show();
    sokoban = new Sokoban(level);
    $("#steps-taken").text(sokoban.board.stepCount);
    $("#box-pushes").text(sokoban.board.boxPushes);
    $("#level").text(sokoban.level + 1);
    $("#select-level").val(sokoban.level + 1);
  }

  $("#reset-level").click(event => createNewGame(sokoban.level));

  $("#skip-level").click(event => {
    if (sokoban.level < 30) {
      createNewGame(sokoban.level + 1);
    }
  });

  $(".reset-game").click(event => createNewGame(0));

  $("#select-level").change(event => {
    const level = $("#select-level").val();
    createNewGame(parseInt(level - 1));
  });



  document.addEventListener("keydown", () => {
    event.preventDefault();

    const direction = keyCodeToDirection[event.keyCode]
    if (direction) sokoban.board.movePlayer(direction);

    $("#steps-taken").text(sokoban.board.stepCount);
    $("#box-pushes").text(sokoban.board.boxPushes);

    if (sokoban.board.gameOver()) {
      if(sokoban.level === 29) {
        $("#canvas").hide();
        $("#dialog").dialog("open");
        return;
      }

      createNewGame(sokoban.level + 1);
    }
  });
});
