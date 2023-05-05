import React from "react";
import { render } from "react-dom";
import './main.css';
import Matter from "matter-js";

function NewTab() {
    return (
        <>
            <div>
                <h1>Fishbowl</h1>
                <p>pee pee poo poo</p>
            </div>

            <script type="text/javascript" src="./physics.js"></script>
            <img src="./fish/test/fish-a.png"/>
            <img src="./fish/test/fish-a.png"/>
            <img src="./fish/test/fish-a.png"/>
        </>
        
    );
}

render(<NewTab />, document.getElementById("react-target"));