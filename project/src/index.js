import React, { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./styles.css";

import App from "./App";

// this is the bridge between the component you created in the App.js file and the web browser
const root = createRoot(document.getElementById("root"));
root.render(
    <StrictMode>
        <h1>Tick tack toe React tutorial</h1>
        <App />
        <br></br>
        <section>
            <h2>Components</h2>
            <p>
                The app above has two components; Board and Square. Board is the
                (common) parent of multiple (9) squares.
            </p>
            <h3>Component Board</h3>
            <p>
                Board has a state called stateSquares which is an array with
                length 9 (corresponding to each of the 9 squares). <br></br>
                <code>
                    const [stateSquares, setStateSquares] =
                    useState(Array(9).fill(''));
                </code>
                The stateSquares array hold strings - this is what each of the
                Squares will display as button label. Each item in the array is
                declared/initialized with '' empty string.
            </p>
            <h3>Component Square</h3>
            <p>
                Board has a state called stateSquares which is an array with
                length 9 (corresponding to each of the 9 squares). The
                stateSquares array hold strings - this is what each of the
                Squares will display as button label.
            </p>
        </section>
    </StrictMode>
);
