import React from "react";
import { render } from "react-dom";
import './main.css';

function NewTab() {
    return (
        <>
            <div className="overlay background">
                <h1>{Date()}</h1>
            </div>

            <div className="panel foreground">
                <button>fishbowl</button>
            </div>

            <script type="text/javascript" src="./physics.js"></script>
        </>
        
    );
}

render(<NewTab />, document.getElementById("react-target"));