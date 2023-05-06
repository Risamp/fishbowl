import React, { useEffect, useState } from "react";
import { render } from "react-dom";
import FishSim from "./physics";
import Clock from "./components/clock.jsx";
import './main.css';
import Matter from "matter-js";


function NewTab() {
    const [fishType, setFishType] = useState("none");
    const [fishSim, setFishSim] = useState(new FishSim(onEnterBowl));

    function onEnterBowl(type) {
        if (fishType != type) {
            setFishType(type);
        }
    }

    async function fetchFish() {
        let response = await fetch('http://localhost:5000/fish');
        let data = await response.json(); 
        console.log(data)
    }
    
    useEffect(() => {
        fetchFish();
    }, []);

    return (
        <>
            <div className="overlay background">
                <Clock />
            </div>

            <div className="panel foreground">
                <button className="button button--primary" onClick={() => fishSim.addFish(fishType)}>{fishType}</button>
            </div>
        </>
        
    );
}

render(<NewTab />, document.getElementById("react-target"));