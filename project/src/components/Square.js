import React, { useState } from "react";

// Props as function variables
function Square({ propValue, propClass, propOnClick }) {
    // // Local States
    // const [stateValue, setStateValue] = useState("P");
    // ^ stateValue (String) has been moved to parent Board, and renamed stateSquares (Array<String>)
    // value is passed from Board to Square via propValue (a prop)

    // function handleClick() {
    //     if (stateValue === "X") {
    //         setStateValue("O");
    //     } else {
    //         setStateValue("X");
    //     }
    // }
    // ^ local handleClick has been moved to Board so that it can access stateSquares
    // handleClick is passed from Board to Square via propOnClick

    return (
        <button className={propClass} onClick={propOnClick}>
            {/* {stateValue} */}
            {propValue}
        </button>
    );
}

export default Square;
