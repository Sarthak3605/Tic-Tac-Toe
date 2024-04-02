const boxes = document.querySelectorAll(".box");
const btn = document.querySelector(".btn");
const gameInfo = document.querySelector(".game-info");

let currentPlayer;
let gameGrid;

const winnigPositions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
];

function initGame() {
    currentPlayer = "X";
    gameGrid = ["", "", "", "", "", "", "", "", ""];
    boxes.forEach((box, index) => {
        box.innerText = "";
        box.style.pointerEvents = "all";
        box.style.userSelect = "none";
        box.classList = `box box${index+1}`;
    });
    btn.classList.remove("active");
    gameInfo.innerHTML = `Current Player - ${currentPlayer}`;
}

//calls the function
initGame();

function swapTurn() {
    if (currentPlayer === "X") {
        currentPlayer = "O";
    } else {
        currentPlayer = "X";
    }

    gameInfo.innerText = `Current Player - ${currentPlayer}`;
}


function checkGameOver() {
    let answer = "";

    winnigPositions.forEach((position) => {
        if ((gameGrid[position[0]] !== "" || gameGrid[position[1]] !== "" || gameGrid[position[2]] !== "") &&
            (gameGrid[position[0]] === gameGrid[position[1]]) && (gameGrid[position[1]] === gameGrid[position[2]])) {

            if (gameGrid[position[0]] === "X")
                answer = "X";
            else
                answer = "O";


            boxes.forEach((box) => {
                box.style.pointerEvents = "none";
            })


            boxes[position[0]].classList.add("win");
            boxes[position[1]].classList.add("win");
            boxes[position[2]].classList.add("win");

        }
    });

    if (answer !== "") {
        gameInfo.innerText = `Winner Player - ${answer}`;
        btn.classList.add("active");
        return;
    }


    let fillCount = 0;
    gameGrid.forEach((box) => {
        if (box !== "")
            fillCount++;
    });

    if (fillCount === 9) {
        gameInfo.innerText = "Game Tied !";
        btn.classList.add("active");
    }
}


function handleClick(index) {
    if (gameGrid[index] === "") {
        boxes[index].innerHTML = currentPlayer;

        gameGrid[index] = currentPlayer;
        boxes[index].style.pointerEvents = "none";

        //let's swap the turns calls new function
        swapTurn();

        //checks status of game calls another new function
        checkGameOver();
    }
}




boxes.forEach((box, index) => {
    box.addEventListener("click", () => {
        //calls another function
        handleClick(index);
    })
});

btn.addEventListener("click", initGame);