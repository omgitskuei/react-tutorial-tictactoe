import React, { Fragment, useState } from "react";
import Square from "./components/Square";

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
        if (stateActivePlayer === 'X') {
            console.log("It is player " + stateActivePlayer + "'s turn - Clicked square[" + index + "]");
            if (stateSquares[index] === 'X' || stateSquares[index] === 'O') {
                console.log("This square already has a label (" + stateSquares[index] + ") - no change needed");
            } else {
                console.log("The square currently is not 'X' nor 'O' - change to " + stateActivePlayer);
                stateSquares[index] = stateActivePlayer;
                // Clone the entire array and set stateSquare with the clone to force a re-render
                const cloneArr = stateSquares.slice();
                setStateSquares(cloneArr);

                // setStateSquares(stateSquares);  // This is an error - No re-rendering happens
                console.log('Swap the active player from ' + stateActivePlayer + ' to O')
                setStateActivePlayer('O');
            }
        } else if (stateActivePlayer === 'O') {
            console.log("It is player " + stateActivePlayer + "'s turn - Clicked square[" + index + "]");
            if (stateSquares[index] === 'X' || stateSquares[index] === 'O') {
                console.log("This square already has a label (" + stateSquares[index] + ") - no change needed");
            } else {
                console.log("The square currently is not 'X' nor 'O' - change to " + stateActivePlayer);
                stateSquares[index] = stateActivePlayer;
                const cloneArr = stateSquares.slice();
                setStateSquares(cloneArr);

                console.log('Swap the active player from ' + stateActivePlayer + ' to X')
                setStateActivePlayer('X');
            }
        }
    }

    return (
        <Fragment>
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
                <button className='square'>4</button>
                <button className='square'>5</button>
                <button className='square'>6</button>
            </div>
            <div className='board-row'>
                <button className='square'>7</button>
                <button className='square'>8</button>
                <button className='square'>9</button>
            </div>
        </Fragment>
    );
}
