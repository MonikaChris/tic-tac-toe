"use strict";

function screenController() {
    //Create game instance
    const game = GameController();

    //Game State
    let gameState = "Playing";
    
    //Get html elements
    const playerTurnDiv = document.querySelector('#turn');
    const boardDiv = document.querySelector('#board');

    const updateScreen = () => {
        const board = game.getBoard();
        const activePlayer = game.getActivePlayer();

        //clear board display
        boardDiv.textContent = "";
        console.log("ran");
        displayBoard(board);

        //Display current player or win/tie
        if (gameState === 'Win') {
            playerTurnDiv.textContent = `${activePlayer} Wins!`;
            playAgain(board);
            return;
        }

        else if (gameState === 'Tie') {
            playerTurnDiv.textContent = `It's a tie!`;
            playAgain(board);
            return;
        }

        else {
            playerTurnDiv.textContent = `${activePlayer}'s turn...`;
        }

    }

    const playAgain = (board) => {
        let res = prompt("Would you like to play again? Enter 'Yes' or 'No'.");

        while (res !== null && res.toLowerCase() !== "yes" && res.toLowerCase() !== "y" && res.toLowerCase() !== "no" && res.toLowerCase() !== "n") {
            let res = prompt("Would you like to play again? Enter 'Yes' or 'No'.");
        }

        if (res === null) return;

        if (res.toLowerCase() === "yes" || res.toLowerCase() === "y") {
            board.clearBoard();
            updateScreen();
        }

        if (res.toLowerCase() === "no" || res.toLowerCase() === "n") {
            playerTurnDiv.textContent = "Thanks for playing!"
        }
    }

    const displayBoard = (board) => {
        const rows = board.length;
        const cols = board[0].length;

        for (let i = 0; i < rows; i++) {
            for (let j=0; j < cols; j++) {
                const cellButton = document.createElement("div");
                cellButton.dataset.row = i;
                cellButton.dataset.col = j;
                cellButton.textContent = board[i][j].getValue();
                cellButton.addEventListener("click", clickHandlerCell);
                cellButton.className = 'cell';
                
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

        gameState = game.playRound(row, col);
        updateScreen();
    }

    updateScreen();
}

screenController();