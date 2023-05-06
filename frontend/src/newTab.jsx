import React from "react";
import { render } from "react-dom";
import './main.css';
import { getTime, getDate } from "./util";

function NewTab() {
    return (
        <>
            <div className="overlay background">
                <div className="clock">
                    <h2 className="clock__date">{getDate()}</h2>
                    <h1 className="clock__time">{getTime()}</h1>
                </div>
            </div>

            <div className="panel foreground">
                <button className="button button--primary">fishbowl</button>
            </div>

            <script type="text/javascript" src="./physics.js"></script>
        </>
        
    );
}

render(<NewTab />, document.getElementById("react-target"));