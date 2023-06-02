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

    const clearBoard = () => {
        for (let i = 0; i < rows; i++) {
            for (let j = 0; j < cols; j++) {
                board[i][j].addToken("");
            }
        }
    }
    
    return { getBoard, move, clearBoard };
}
