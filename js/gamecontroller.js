"use strict";

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
        for (let i = 0; i < board.length; i++) {
            let row = [];
            let col = [];
            diag1.push(board[i][i].getValue());
            diag2.push(board[i][board.length - 1 - i].getValue());
            for (let j = 0; j < board[0].length; j++) {
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

    return { switchPlayerTurn, getActivePlayer, playRound, getBoard: board.getBoard, clearBoard: board.clearBoard }
}
