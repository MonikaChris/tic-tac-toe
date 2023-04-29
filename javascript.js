"use strict";

function GameBoard() {
    rows = 3;
    cols = 3;
    board = [];

    for (i = 0; i < rows.length + 1; i++) {
        row = [];
        for (j = 0; j < cols.length + 1; j++) {
            row.push(0);
        }
        board.push(row);
    }

    const getBoard = () => board;

    return { getBoard };
}


function Cell() {
    value = 0;

    const getValue = () => value;

    const setValue = (player) => {
        value = player;
    }

    return { getValue, setValue };
}