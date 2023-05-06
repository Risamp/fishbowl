import React from "react";
import { useState, useEffect } from "react";
import { render } from "react-dom";
import './main.css';
import FishSim from "./physics";
import Clock from "./components/clock.jsx";

function NewTab() {
    const [fishType, setFishType] = useState("none");
    const [fishSim, setFishSim] = useState(new FishSim(onEnterBowl));

    function onEnterBowl(type) {
        if (fishType != type) {
            setFishType(type);
        }
    }

    useEffect(() => {
    }, []);

    return (
        <>
            <div className="overlay background">
                <Clock />
            </div>

            <div className="panel foreground">
                <button className="button button--primary" onClick={() => fishSim.addFish(fishType)}>{fishType}</button>
            </div>

            <script type="text/javascript" src="./physics.js"></script>
        </>
        
    );
}

render(<NewTab />, document.getElementById("react-target"));