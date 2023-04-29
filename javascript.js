"use strict";

function GameBoard() {
    const rows = 3;
    const cols = 3;
    let board = [];

    for (let i = 0; i < rows; i++) {
        let row = [];
        for (let j = 0; j < cols; j++) {
            row.push(0);
        }
        board.push(row);
    }

    const getBoard = () => board;

    return { getBoard };
}


function Cell() {
    const value = 0;

    const getValue = () => value;

    const setValue = (player) => {
        value = player;
    }

    return { getValue, setValue };
}


const board = GameBoard();
console.log(board.getBoard());