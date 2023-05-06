import React from "react";
import { useState, useEffect } from "react";
import FishSim from "../physics";
import FishDetails from "./fishDetails";

export default function FishDetails({fish}) {

    useEffect(() => {

    }, []);

    return (
        <>
            <canvas id="matter-canvas" class="overlay"></canvas>
        </>
    );
}