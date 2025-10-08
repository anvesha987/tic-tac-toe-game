let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset-btn");
let newBtn = document.querySelector("#new-btn");
let msgcon = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");

let turnO = true; //playerX, playerO

let winningPatterns = [
  [0, 1, 2],
  [0, 3, 6],
  [0, 4, 8],
  [1, 4, 7],
  [2, 4, 6],
  [2, 5, 8],
  [3, 4, 5],
  [6, 7, 8],
];

let count = 0;
boxes.forEach((box) => {
  box.addEventListener("click", () => {
    if (turnO) {
      box.innerText = "O";
      turnO = false;
      count++;
    } else {
      box.innerText = "X";
      turnO = true;
      count++;
    }
    box.disabled = true;

    checkWinner();
    if (count === 9) {
      Draw();
    }
  });
});

const disableBoxes = () => {
  for (let box of boxes) {
    box.disabled = true;
  }
};

const enableBoxes = () => {
  for (let box of boxes) {
    box.disabled = false;
    box.innerText = "";
  }
};

const showWinner = (winner) => {
  msg.innerText = `Congratulations, Winner is ${winner}`;
  msgcon.classList.remove("hide");
  disableBoxes();
};
const checkWinner = () => {
  for (let pattern of winningPatterns) {
    let pos1val = boxes[pattern[0]].innerText;
    let pos2val = boxes[pattern[1]].innerText;
    let pos3val = boxes[pattern[2]].innerText;

    if (pos1val != "" && pos2val != "" && pos3val != "") {
      if (pos1val === pos2val && pos2val === pos3val) {
        showWinner(pos1val);
      }
    }
  }
};

const Draw = () => {
  msg.innerText = "There is no winner";
  msgcon.classList.remove("hide");
  disableBoxes();
};

const resetGame = () => {
  turnO = true;
  enableBoxes();
  msgcon.classList.add("hide");
  count = 0;
};

newBtn.addEventListener("click", resetGame);
resetBtn.addEventListener("click", resetGame);
