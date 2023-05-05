import React from "react";
import { render } from "react-dom";
import './main.css';

function NewTab() {
    return (
        <div>
            <h1>Fishbowl</h1>
            <p>pee pee poo poo</p>
        </div>
    );
}

render(<NewTab />, document.getElementById("react-target"));