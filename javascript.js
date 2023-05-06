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

    return { getBoard, move };
}


function Cell() {
    const value = 0;

    const getValue = () => value;

    const setValue = (player) => {
        value = player;
    }

    return { getValue, setValue };
}


// function Controller(){
//     const player1 = "X";
//     const player2 = "O";
//     const winner = false;

//     const playRound = () => {
//         move(player1);
//         if (isWinner(board)) {
//             winner = true;
//             return;
//         }
//         move(player2);
//         if (isWinner(board)) {
//             winner = true;
//         }
//     }

//     // const move = (player) => {
//     //     displayTurn(player);
//     //     { row, col } = getMove();

//     //     while (!board.move(row, col)) {
//     //         displayTurn(player);
//     //     }    
//     // }

//     const isWinner = (board) => {
//         //Check rows, cols, 2 diagnols
//         diag1 = [];
//         diag2 = [];
//         for(let i = 0; i < board.rows; i++) {
//             row = [];
//             col = [];
//             diag1.push(board[i][i]);
//             diag2.push(board[i][board.rows - i]);
//             for(let j = 0; j < board.cols; j++){
//                 row.push(board[i][j]);
//                 col.push(board[j][i]);
//             }
//             if (hasWin(row)) return true;
//             if (hasWin(col)) return true;
//         }
//         if (hasWin(diag1)) return true;
//         if (hasWin(diag2)) return true;

//         return false;
//     }

//     //Helper function - check if passed in row contains all X's or all O's
//     const hasWin = (arr) => {
//         elem = arr[0];

//         if (elem === 0) return false;

//         for(let i = 1; i < arr.length; i++) {
//             if (arr[i] !== elem) return false;
//         }

//         return true;
//     }
// }

const isWinner = (board) => {
    //Check rows, cols, 2 diagnols
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
    console.log(`arr: ${arr}`);
    const elem = arr[0];

    if (elem === 0) return false;

    for(let i = 1; i < arr.length; i++) {
        if (arr[i] !== elem) return false;
    }

    return true;
}



const board = GameBoard();
console.log(board.getBoard());
board.move('X', 0, 0);
board.move('X', 1, 0);
board.move('X', 0, 2);
console.log(board.getBoard());
console.log(isWinner([[0, 0, 'X'], [0, 0, 'X'], [0, 0, 'X']]));