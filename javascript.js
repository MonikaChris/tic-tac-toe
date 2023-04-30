"use strict";

function GameBoard() {
    const rows = 3;
    const cols = 3;
    const board = [];

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
        }

        else return "Invalid Move";

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


function Controller(){

}



const board = GameBoard();
console.log(board.getBoard());