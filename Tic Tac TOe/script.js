console.log("Welcome to Tic Tac Toe");

let music = new Audio("background.mp3");
let audioTurn = new Audio("turn.mp3");
let gameOver = new Audio("game-over.mp3");
let turn = "X";
let isgameOver = false;

// Function to change the turn
const changeTurn = () => {
    return turn === "X" ? "O" : "X";
}

// Function to check for Win
const checkWin = () => {
    let boxtext = document.getElementsByClassName('boxtext');
    let wins = [
        [0, 1, 2, 5, 5, 0],
        [3, 4, 5, 5, 15, 0],
        [6, 7, 8, 5, 25, 0],
        [0, 3, 6, -5, 15, 90],
        [1, 4, 7, 5, 15, 90],
        [2, 5, 8, 15, 15, 90],
        [0, 4, 8, 5, 15, 45],
        [2, 4, 6, 5, 15, 135],
    ];

    wins.forEach(e => {
        if ((boxtext[e[0]].innerText === boxtext[e[1]].innerText) &&
            (boxtext[e[2]].innerText === boxtext[e[1]].innerText) &&
            (boxtext[e[0]].innerText !== "")) {
            document.querySelector('.Info').innerText = boxtext[e[0]].innerText + " WON!";
            isgameOver = true;
            document.querySelector('.imgbox').getElementsByTagName('img')[0].style.width = "200px";
            document.querySelector(".line").style.transform = `translate(${e[3]}vw, ${e[4]}vw) rotate(${e[5]}deg)`;
            document.querySelector(".line").style.width = "20vw";

            // Add class to disable boxes
            Array.from(boxes).forEach(box => box.classList.add('disabled'));
        }
    });
}

// Function to handle box clicks
const handleBoxClick = (event) => {
    let boxtext = event.target.querySelector('.boxtext');
    if (boxtext.innerText === '' && !isgameOver) {
        boxtext.innerText = turn;
        turn = changeTurn();
        audioTurn.play();
        checkWin();
        if (!isgameOver) {
            document.querySelector(".Info").innerText = "Turn for " + turn;
        }
    }
}

// Main GAME LOGIC
let boxes = document.getElementsByClassName("box");
Array.from(boxes).forEach(element => {
    element.addEventListener('click', handleBoxClick);
});

// Adding Onclick EventListener to Reset GAME!
let reset = document.getElementById("reset"); // Ensure there is an element with id="reset"
reset.addEventListener("click", () => {
    let boxtext = document.querySelectorAll('.boxtext');
    Array.from(boxtext).forEach(element => {
        element.innerText = "";
    });
    turn = "X";
    isgameOver = false;
    document.querySelector(".line").style.width = "0vw";
    document.querySelector(".Info").innerText = "Turn for " + turn;
    document.querySelector('.imgbox').getElementsByTagName('img')[0].style.width = "0px";

    // Remove class to enable boxes
    Array.from(boxes).forEach(box => box.classList.remove('disabled'));
});
