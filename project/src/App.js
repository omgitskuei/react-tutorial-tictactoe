import React, { Fragment, useState } from "react";
import Board from "./components/Board";

export default function Game() {
    const [stateActivePlayer, setStateActivePlayer] = useState("X"); // Player X always goes first
    const [stateAllSquares, setStateAllSquares] = useState([Array(9).fill('')]);
    const latestSquares = stateAllSquares[stateAllSquares.length-1];

    function appendAllSquares(arr) {
        setStateAllSquares([...stateAllSquares, arr])
    }

    function swapPlayers() {
        setStateActivePlayer((stateActivePlayer === "X") ? "O" : "X")
    }

    return (
        <div className="game">
            <div className="game-board">
                <Board
                    propAllSquares={stateAllSquares}
                    propAppendAllSquares={appendAllSquares}
                    propActivePlayer={stateActivePlayer}
                    propSwapPlayers={swapPlayers}
                />
            </div>
            <div className="game-info">
                <ol>{/*TODO*/}</ol>
            </div>
        </div>
    );
}
