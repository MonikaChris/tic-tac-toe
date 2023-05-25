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
        if (board[row][col] === 0) {
            board[row][col] = player;
            return true;
        }

        else return false;
    }
    
    return { getBoard, move };
}

function Cell() {
    let value = 0;

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

        if (isWinner(board)) {
            return "You Win!";
        }

        else{
            switchPlayerTurn();
        }
    }

    const isWinner = (board) => {
        //Check rows, cols, 2 diagnols
        console.log(`board: ${board}`);
        let diag1 = [];
        let diag2 = [];
        for(let i = 0; i < board.length; i++) {
            let row = [];
            let col = [];
            diag1.push(board[i][i]);
            diag2.push(board[i][board.length - 1 - i]);
            for(let j = 0; j < board[0].length; j++) {
                row.push(board[i][j]);
                col.push(board[j][i]);
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
    
        if (elem === 0) return false;
    
        for(let i = 1; i < arr.length; i++) {
            if (arr[i] !== elem) return false;
        }
    
        return true;
    }

    return { switchPlayerTurn, getActivePlayer, playRound, getBoard: board.getBoard }
}


function screenController() {
    //Get html elements
    const playerTurnDiv = document.querySelector('#turn');
    const boardDiv = document.querySelector('#board');

    //Get game data
    const game = GameController();
    const board = game.getBoard();
    let activePlayer = game.getActivePlayer();


    const updateScreen = () => {
        //clear board
        boardDiv.textContent = "";

        //Display current player
        playerTurnDiv.textContent = `${activePlayer.name}'s turn...`;

        displayBoard();
    }

    const displayBoard = () => {
        board.forEach((row) => {
        row.forEach((cell, idx) => {
            const cellButton = document.createElement("button");
            cellButton.dataset.row = row;
            cellButton.dataset.col = idx;
            cellButton.textContent = cell.getValue();
            cellButton.addEventListener("click", clickHandlerCell);
            cell.className = 'cell';
            
            //Border lines
            if (row == 0) {
                cellButton.classList.add('top-cell');
            }
            if (row == board.rows - 1) {
                cellButton.classList.add('bottom-cell');
            }
            if (idx == 0) {
                cellButton.classList.add('left-cell');
            }
            if (idx == board.cols - 1) {
                cellButton.classList.add('right-cell');
            }
            
            boardDiv.appendChild(cellButton);
            })
        })

        //Format board
        boardDiv.style.gridTemplateColumns = `repeat(${board.cols}, 1fr)`;
        boardDiv.style.gridTemplateRows = `repeat(${board.rows}, 1fr)`;
    }

    const clickHandlerCell = (e) => {
        const col = e.target.col;
        const row = e.target.row;

        board.playRound(row, col);
    }

    updateScreen();
}

screenController();