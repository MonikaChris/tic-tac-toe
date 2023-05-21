"use strict";

function GameBoard() {
    const rows = 3;
    const cols = 3;
    let board = [];

    for (let i = 0; i < rows; i++) {
        const row = [];
        for (let j = 0; j < cols; j++) {
            row.push(0);
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

    const drawBoard = () => {
        const boardDiv = document.querySelector('#board');

        for (let i = 0; i < rows; i++) {
            for (let j = 0; j < cols; j++) {
                const cell = document.createElement('div');
                cell.textContent = board[i][j]
                cell.className = 'cell';

                if (i == 0) {
                    cell.classList.add('top-border');
                }
                if (i == rows - 1) {
                    cell.classList.add('bottom-border');
                }
                if (j == 0) {
                    cell.classList.add('left-border');
                }
                if (j == cols - 1) {
                    cell.classList.add('right-border');
                }

                boardDiv.appendChild(cell);
            }
        }

        //Format board
        boardDiv.style.gridTemplateColumns = `repeat(${cols}, 1fr)`;
        boardDiv.style.gridTemplateRows = `repeat(${rows}, 1fr)`;
    }

    return { getBoard, move, drawBoard };
}

function Controller(){
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
    
    //Helper function - check if passed in row contains all X's or all O's
    const hasWin = (arr) => {
        const elem = arr[0];
    
        if (elem === 0) return false;
    
        for(let i = 1; i < arr.length; i++) {
            if (arr[i] !== elem) return false;
        }
    
        return true;
    }

    return { switchPlayerTurn, getActivePlayer, playRound }
}






const board = GameBoard();
board.drawBoard();
// console.log(board.getBoard());
// board.move('X', 0, 0);
// board.move('X', 1, 0);
// board.move('X', 0, 1);
// console.log(board.getBoard());
// console.log(isWinner(board.getBoard()));
//console.log(isWinner([['X', 0, 0], ['X', 0, 0], [0, 'X', 0]]));