"use strict";

function GameBoard() {
    const rows = 3;
    const cols = 3;
    let board = [];

    for (let i = 0; i < rows; i++) {
        const row = [];
        for (let j = 0; j < cols; j++) {
            row.push(Cell());
        }
        board.push(row);
    }

    const getBoard = () => board;

    const move = (player, row, col) => {
        if (board[row][col].getValue() === "") {
            board[row][col].addToken(player);
            return true;
        }

        else return false;
    }
    
    return { getBoard, move };
}

function Cell() {
    let value = "";

    const addToken = (player) => {
        value = player;
    }

    const getValue = () => value;

    return { addToken, getValue };
}

function GameController(){
    const player1 = "X";
    const player2 = "O";
    const board = GameBoard();
    
    let activePlayer = player1;

    const switchPlayerTurn = () => {
        activePlayer = activePlayer === player1 ? player2 : player1;
    }

    const getActivePlayer = () => activePlayer;

    const playRound = (row, col) => {
        if (!board.move(activePlayer, row, col)) {
            return "Invalid move";
        }

        if (isWinner(board.getBoard())) {
            return "Win";
         }

        if (isTie()) {
            return "Tie";
        }
        
        switchPlayerTurn();
            return "Playing";

    }

    const isTie = () => {
        const gameBoard = board.getBoard();

        for (let i = 0; i < gameBoard.length; i++){
            for (let j = 0; j < gameBoard[0].length; j++) {
                if (gameBoard[i][j].getValue() === "") return false;
            }
        }
        return true;
    }

    const isWinner = (board) => {
        //Check rows, cols, 2 diagnols
        let diag1 = [];
        let diag2 = [];
        for(let i = 0; i < board.length; i++) {
            let row = [];
            let col = [];
            diag1.push(board[i][i].getValue());
            diag2.push(board[i][board.length - 1 - i].getValue());
            for(let j = 0; j < board[0].length; j++) {
                row.push(board[i][j].getValue());
                col.push(board[j][i].getValue());
            }
            if (hasWin(row)) return true;
            if (hasWin(col)) return true;
        }
        if (hasWin(diag1)) return true;
        if (hasWin(diag2)) return true;
    
        return false;
    }
    
    //isWinner helper function - check if passed in row contains all X's or all O's
    const hasWin = (arr) => {
        const elem = arr[0];
    
        if (elem === "") return false;
    
        for(let i = 1; i < arr.length; i++) {
            if (arr[i] !== elem) return false;
        }
    
        return true;
    }

    return { switchPlayerTurn, getActivePlayer, playRound, getBoard: board.getBoard }
}


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

        //clear board
        boardDiv.textContent = "";

        //Display current player or win/tie
        if (gameState === 'Win') {
            playerTurnDiv.textContent = `${activePlayer} Wins!`;
        }

        else if (gameState === 'Tie') {
            playerTurnDiv.textContent = `It's a tie!`;
        }

        else {
            playerTurnDiv.textContent = `${activePlayer}'s turn...`;
        }

        displayBoard(board);
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