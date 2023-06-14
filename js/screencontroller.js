"use strict";

function ScreenController() {
    //Create game instance
    const game = GameController();

    //Game State
    //Possible states: Playing, Static, Win, Tie
    let gameState = "Playing";
    
    //Get html elements
    const playerTurnDiv = document.querySelector('#turn');
    const boardDiv = document.querySelector('#board');

    const updateScreen = () => {
        const board = game.getBoard();
        const activePlayer = game.getActivePlayer();

        //Reset board display
        boardDiv.textContent = "";
        displayBoard(board, gameState);

        //Render game state
        if (gameState === 'Win') {
            playerTurnDiv.textContent = `${activePlayer} Wins!`;
        } else if (gameState === 'Tie') {
            playerTurnDiv.textContent = `It's a tie!`;
        } else if (gameState === 'Static') {
            playerTurnDiv.textContent = 'Thanks for playing!'
        } else playerTurnDiv.textContent = `${activePlayer}'s turn...`;

        //Allows board to render before asking to play again
        setTimeout(() => {
            if (gameState === 'Win' || gameState === 'Tie') {
                playAgain(board);
            }
        });
    }

    const playAgain = (board) => {
        let res = prompt("Would you like to play again? Enter 'Yes' or 'No'.");
        const validResponses = ["yes", "y", "no", "n"];

        while (res !== null && !validResponses.includes(res.toLowerCase())) {
            res = prompt("Would you like to play again? Enter 'Yes' or 'No'.");
        }

        if (res === null || res.toLowerCase() === "no" || res.toLowerCase() === "n") {
            playerTurnDiv.textContent = "Thanks for playing!"
            gameState = "Static";
            updateScreen();
        } else {
            game.clearBoard();
            gameState = "Playing"
            updateScreen();
        }
    }

    const displayBoard = (board, gameState) => {
        const rows = board.length;
        const cols = board[0].length;

        //Freeze board if done playing, otherwise add event listener
        if (gameState === "Static") {
            boardDiv.removeEventListener("click", clickHandlerCell);
        } else {
            boardDiv.addEventListener("click", clickHandlerCell);
        }

        for (let i = 0; i < rows; i++) {
            for (let j=0; j < cols; j++) {
                const cellButton = document.createElement("div");
                cellButton.dataset.row = i;
                cellButton.dataset.col = j;
                cellButton.textContent = board[i][j].getValue();
                cellButton.className = 'cell';

                //Different colors for X and O
                if (board[i][j].getValue() === 'X') {
                    cellButton.classList.remove('o');
                    cellButton.classList.add('x');
                } else {
                    cellButton.classList.remove('x');
                    cellButton.classList.add('o');
                }
                
                //Draw border lines
                if (i == 0) {
                    cellButton.classList.add('top-cell');
                }
                if (i == rows - 1) {
                    cellButton.classList.add('bottom-cell');
                }
                if (j == 0) {
                    cellButton.classList.add('left-cell');
                }
                if (j == cols - 1) {
                    cellButton.classList.add('right-cell');
                }
                
                boardDiv.appendChild(cellButton);
            }
        }

        //Format board as grid
        boardDiv.style.gridTemplateColumns = `repeat(${cols}, 1fr)`;
        boardDiv.style.gridTemplateRows = `repeat(${rows}, 1fr)`;
    }

    const clickHandlerCell = (e) => {
        const col = e.target.dataset.col;
        const row = e.target.dataset.row;

        //Confirm a cell was clicked
        if (!row || !col){
            return;
        }

        gameState = game.playRound(row, col);
        updateScreen();
    }

    updateScreen();
}

ScreenController();