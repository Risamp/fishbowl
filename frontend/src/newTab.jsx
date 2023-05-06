import React, { useEffect, useState } from "react";
import { render } from "react-dom";
import FishSim from "./physics";
import Clock from "./components/clock.jsx";
import './main.css';
import FishDetails from "./components/fishDetails.jsx";
import showData from "./showData";


function NewTab() {
    const [bowlFish, setBowlFish] = useState({});
    const [fishData, setFishData] = useState([]);
    const [fishSim, setFishSim] = useState(new FishSim(onEnterBowl));

    function onEnterBowl(type) {
        console.log(type);
        showData(type);
    }

    // async function fetchFish() {
    //     let response = await fetch('http://localhost:5000/fish');
    //     let data = await response.json(); 
    //     console.log(data);
    //     setFishData(data);
    // }
    
    // useEffect(() => {
    //     //fetchFish();
    // }, []);

    // useEffect(() => {
    //     fishData.forEach((fish) => {
    //         fishSim.addFish(fish.scientific_name);
    //     })
    // }, [fishData]);

    return (
        <>
            <div className="overlay background">
                <Clock />
                <svg className="bowl-rear" id="b" data-name="Calque 2" xmlns="http://www.w3.org/2000/svg" width="550" height="80" viewBox="0 0 301 44">
                    <defs>
                        <linearGradient id="d" data-name="Dégradé sans nom 295" x1="37.253" y1="-42.383" x2="263.747" y2="88.383" gradientTransform="matrix(1, 0, 0, 1, 0, 0)" gradientUnits="userSpaceOnUse">
                        <stop offset="0" stop-color="#f7f7f7"/>
                        <stop offset=".38" stop-color="#f0f0ed"/>
                        <stop offset=".994" stop-color="#e0e0d5"/>
                        </linearGradient>
                    </defs>
                    <g id="c" data-name="Calque 1">
                        <ellipse cx="150.5" cy="23" rx="150.5" ry="21" fill="url(#d)"/>
                        <path d="M9.498,24.966S32.587,8,150.654,8s141.156,16.966,141.156,16.966" fill="none" stroke="#f7f7f7" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"/>
                    </g>
                </svg>
                <FishDetails/>
            </div>

            <div className="panel foreground">
                <svg className="bowl" id="b" data-name="bowl" xmlns="http://www.w3.org/2000/svg" width="550" height="200" viewBox="0 0 302.312 98">
                    <defs>
                        <linearGradient id="d" data-name="Dégradé sans nom 295" x1="31.807" y1="-44.222" x2="260.671" y2="87.913" gradientTransform="matrix(1, 0, 0, 1, 0, 0)" gradientUnits="userSpaceOnUse">
                        <stop offset="0" stop-color="#f7f7f7"/>
                        <stop offset=".38" stop-color="#f0f0ed"/>
                        <stop offset=".994" stop-color="#e0e0d5"/>
                        </linearGradient>
                    </defs>
                    <g id="c" data-name="Calque 1">
                        <path d="M70.87,78.91s13.132,9.09,80.286,9.09,80.286-9.09,80.286-9.09" fill="none" stroke="#fff" stroke-linecap="round" stroke-linejoin="round" stroke-width="20"/>
                        <path d="M.502,10S8.908,86.848,151.187,86.848,301.502,10,301.502,10c0,0-41.391,19.563-150.836,19.563S.502,10,.502,10Z" fill="url(#d)"/>
                        <path d="M10,10s23.089,16.966,141.156,16.966S292.312,10,292.312,10" fill="none" stroke="#fff" stroke-linecap="round" stroke-linejoin="round" stroke-width="20"/>
                    </g>
                </svg>
            </div>
            
        </>
        
    );
}

render(<NewTab />, document.getElementById("react-target"));