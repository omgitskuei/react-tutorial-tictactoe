import React, { Fragment, useState } from "react";
import Square from "./components/Square";

let displayWinner = "";
let counterTurn = 0;
let end = false;

export default function Board() {
    // Component square used to each handle their own state
    // To collect data from multiple children, or to have two child components
    // communicate with each other, declare the shared state in their parent
    // component instead. The parent component can pass that state back down
    // to the children via props. This keeps the child components in sync with
    // each other and with their parent.
    const [stateSquares, setStateSquares] = useState(Array(9).fill(''));

    // A state to track which player (X or O) is active
    const [stateActivePlayer, setStateActivePlayer] = useState('X'); // Player X always goes first
    
    function handleClick(index) {
        if (end) {
            return;
        }

        console.log("It is player " + stateActivePlayer + "'s turn - Clicked square[" + index + "]");
        // Check if square already has a label
        if (stateSquares[index] === 'X' || stateSquares[index] === 'O') {
            console.log("This square already has a label (" + stateSquares[index] + ") - no change needed");
            return;
        }
        
        // Change the square label
        console.log("The square currently is not 'X' nor 'O' - change to " + stateActivePlayer);
        stateSquares[index] = stateActivePlayer;
        const cloneArr = stateSquares.slice(); // Clone and set stateSquare with the clone to force a re-render
        setStateSquares(cloneArr); // If you did setStateSquares(stateSquares); - No re-rendering would happen
        
        // Check if we have winner
        if (isWinner(stateActivePlayer, stateSquares)) {
            end = true;
            return;
        } else {
            counterTurn = counterTurn + 1;
        }

        // Change the active player
        if (stateActivePlayer === 'X') {
            console.log(`Swap the active player from ${stateActivePlayer} to O`);
            setStateActivePlayer('O');
        } else if (stateActivePlayer === 'O') {
            console.log(`Swap the active player from ${stateActivePlayer} to X`);
            setStateActivePlayer('X');
        }
    }
    
    // Check if we have a winner
    if (isWinner(stateActivePlayer, stateSquares)) {
        console.log(`Player ${stateActivePlayer} won!`);
        displayWinner = `Player ${stateActivePlayer} won!`;
    } else {
        displayWinner = `Turn ${counterTurn}`;
    }
    
    return (
        <Fragment>
            <div className="displayWinner">{displayWinner}</div>
            <div className='board-row'>
                <Square
                    propClass='square'
                    propValue={stateSquares[0]}
                    propOnClick={() => handleClick(0)}  // '() =>' passes the function without calling it
                ></Square>
                <Square
                    propClass='square'
                    propValue={stateSquares[1]}
                    propOnClick={() => handleClick(1)}  // {handleClick(1)} would have infinitely called function
                    // calls it once, triggering a re-render, which calls it again, etc.
                ></Square>
                <Square
                    propClass='square'
                    propValue={stateSquares[2]}
                    propOnClick={() => handleClick(2)}
                ></Square>
            </div>
            <div className='board-row'>
            <Square
                    propClass='square'
                    propValue={stateSquares[3]}
                    propOnClick={() => handleClick(3)}
                ></Square>
                <Square
                    propClass='square'
                    propValue={stateSquares[4]}
                    propOnClick={() => handleClick(4)}
                ></Square>
                <Square
                    propClass='square'
                    propValue={stateSquares[5]}
                    propOnClick={() => handleClick(5)}
                ></Square>
            </div>
            <div className='board-row'>
            <Square
                    propClass='square'
                    propValue={stateSquares[6]}
                    propOnClick={() => handleClick(6)}
                ></Square>
                <Square
                    propClass='square'
                    propValue={stateSquares[7]}
                    propOnClick={() => handleClick(7)}
                ></Square>
                <Square
                    propClass='square'
                    propValue={stateSquares[8]}
                    propOnClick={() => handleClick(8)}
                ></Square>
            </div>
        </Fragment>
    );
}

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
