import React, { Fragment } from "react"
import Square from "./Square";

let displayWinner = "";
let counterTurn = 0;
let end = false;

/** 
 * Function isWinner takes activePlayer (String) and arrSquares (Array<String>) 
 * returning boolean true if the activePlayer is the winner, otherwise returning false */
function isWinner(activePlayer, arrSquares) {
    let isWinner = false;
    
    const winningCombinations = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    winningCombinations.forEach(eachCombination => {
        const [ index1, index2, index3 ] = eachCombination; // note this deconstructs 3 numbers out of each num[]
        if (arrSquares[index1] === activePlayer
            && arrSquares[index2] === activePlayer
            && arrSquares[index3] === activePlayer) {
                isWinner = true;
                return;
        }
    });

    return isWinner;
}

function Board({ propAllSquares, propAppendAllSquares, propActivePlayer, propSwapPlayers, propOnClick }) {
    // Component square used to each handle their own state
    // To collect data from multiple children, or to have two child components
    // communicate with each other, declare the shared state in their parent
    // component instead. The parent component can pass that state back down
    // to the children via props. This keeps the child components in sync with
    // each other and with their parent.
    // const [propAllSquares, setpropAllSquares] = useState(Array(9).fill(''));
    // ^ Lifted up to Game

    // A state to track which player (X or O) is active
    // const [stateActivePlayer, setStateActivePlayer] = useState('X'); // Player X always goes first
    const latestAllSquares = propAllSquares[propAllSquares.length-1];
    
    function handleClick(index) {

        if (end) {
            console.log("Game has ended - no change needed");
            return;
        }

        console.log("It is player " + propActivePlayer + "'s turn - Clicked square[" + index + "]");
        // Check if square already has a label
        if (latestAllSquares[index] === 'X' || latestAllSquares[index] === 'O') {
            console.log("This square already has a label (" + latestAllSquares[index] + ") - no change needed");
            return;
        }
        
        // Change the square label
        console.log("The square currently is not 'X' nor 'O' - change to " + propActivePlayer);
        latestAllSquares[index] = propActivePlayer;
        const cloneArr = latestAllSquares.slice(); // Clone and set stateSquare with the clone to force a re-render
        propAppendAllSquares(cloneArr); // If you did setpropAllSquares(propAllSquares); - No re-rendering would happen
        
        // Check if we have winner
        if (isWinner(propActivePlayer, latestAllSquares)) {
            end = true;
            return;
        } else {
            counterTurn = counterTurn + 1;
        }

        // Change the active player
        if (propActivePlayer === 'X') {
            console.log(`Swap the active player from ${propActivePlayer} to O`);
            propSwapPlayers();
        } else if (propActivePlayer === 'O') {
            console.log(`Swap the active player from ${propActivePlayer} to X`);
            propSwapPlayers();
        }
    }
    
    // Check if we have a winner
    if (isWinner(propActivePlayer, latestAllSquares)) {
        console.log(`Player ${propActivePlayer} won!`);
        displayWinner = `Player ${propActivePlayer} won!`;
    } else {
        displayWinner = `Turn ${counterTurn}`;
    }
    
    return (
        <Fragment>
            <div className="displayWinner">{displayWinner}</div>
            <div className='board-row'>
                <Square
                    propClass='square'
                    propValue={latestAllSquares[0]}
                    propOnClick={() => handleClick(0)}  // '() =>' passes the function without calling it
                ></Square>
                <Square
                    propClass='square'
                    propValue={latestAllSquares[1]}
                    propOnClick={() => handleClick(1)}  
                    // {handleClick(1)} would have infinitely called function
                    // calls it once, triggering a re-render, which calls it again, etc.
                ></Square>
                <Square
                    propClass='square'
                    propValue={latestAllSquares[2]}
                    propOnClick={() => handleClick(2)}
                ></Square>
            </div>
            <div className='board-row'>
            <Square
                    propClass='square'
                    propValue={latestAllSquares[3]}
                    propOnClick={() => handleClick(3)}
                ></Square>
                <Square
                    propClass='square'
                    propValue={latestAllSquares[4]}
                    propOnClick={() => handleClick(4)}
                ></Square>
                <Square
                    propClass='square'
                    propValue={latestAllSquares[5]}
                    propOnClick={() => handleClick(5)}
                ></Square>
            </div>
            <div className='board-row'>
            <Square
                    propClass='square'
                    propValue={latestAllSquares[6]}
                    propOnClick={() => handleClick(6)}
                ></Square>
                <Square
                    propClass='square'
                    propValue={latestAllSquares[7]}
                    propOnClick={() => handleClick(7)}
                ></Square>
                <Square
                    propClass='square'
                    propValue={latestAllSquares[8]}
                    propOnClick={() => handleClick(8)}
                ></Square>
            </div>
        </Fragment>
    );
}

export default Board;