let counter = 0;
let gameBoard = (function() {

    let Board = ["", "", "", "", "","","","",""];

    let winningCombinations = [
        [0,1,2],
        [3,4,5],
        [6,7,8],
        [0,3,6],
        [1,4,7],
        [2,5,8],
        [0,4,8],
        [2,4,6]
    ]

    return {
        Board: Board,
        clickSquare: function(player) {
            document.querySelectorAll('td').forEach(item => {
                item.addEventListener('click', event => {
                    player.markSquare(item.id.replace('_',''));
                })
            });       
        },
        checkWin: function() {
        console.log(Board);
            return winningCombinations.some(combination => {
                return combination.every(index => {
                    return Board[index] === "X"
                }) || combination.every(index => {
                    return Board[index] === "O"
            })
        })
        }
    }
})();



let displayController = (function() {
    'use strict';

    function updateView(square) {
            console.log(square);
            document.querySelector("#_"+square).textContent = gameBoard.Board[square];
            if (gameBoard.checkWin() && counter %2 === 0) {
                alert("Player X Wins!");
            }
            else if (gameBoard.checkWin() && counter %2 !== 0) {
                alert("Player O Wins!");
            }
            else if (counter == 8) {
                alert("TIE!");
            }
            counter++;
    }
    return {
        updateView: updateView
    }
})();

function createPlayer(name) {
    return {
        name: name,
        markSquare(square) {
            if (gameBoard.Board[square] === "") {
                if (counter %2 === 0) {
                    gameBoard.Board[square] = "X";
                }
                else {
                    gameBoard.Board[square] = "O";
                }
                
                displayController.updateView(square);
            }
        }
    }
}

function gameFlow() {
    let player1 = createPlayer("Phil");
    gameBoard.clickSquare(player1);

    let resetGame = document.getElementById("resetbutton");
    resetGame.addEventListener('click', function() {
        console.log("reset");
        for (let i =0; i<=8; i++) {
            document.querySelector("#_"+i).textContent="";
            gameBoard.Board[i] = "";
        }
        counter = 0;
    });
        
}
gameFlow();