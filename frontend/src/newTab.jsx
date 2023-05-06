import React from "react";
import { useState, useEffect } from "react";
import { render } from "react-dom";
import './main.css';
import { getTime, getDate } from "./util";

function NewTab() {
    const [time, setTime] = useState(getTime());

    useEffect(() => {
        const clock = setInterval(() => {
            setTime(getTime());
        }, 1000);

        return () => clearInterval(clock); 
    })

    return (
        <>
            <div className="overlay background">
                <div className="clock">
                    <h2 className="clock__date">{getDate()}</h2>
                    <h1 className="clock__time">{time}</h1>
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