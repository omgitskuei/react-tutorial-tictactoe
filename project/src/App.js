import React, { Fragment, useState } from "react";
import Board from "./components/Board";


export default function Game() {

    return (
        <div className="game">
          <div className="game-board">
            <Board propPassedToSquare="ha"/>
          </div>
          <div className="game-info">
            <ol>{/*TODO*/}</ol>
          </div>
        </div>
      );
}


