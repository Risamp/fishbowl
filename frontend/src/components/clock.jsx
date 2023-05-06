import React from "react";
import { useState, useEffect } from "react";
import { getTime, getDate } from "../util";

export default function Clock() {
    const [time, setTime] = useState(getTime());

    useEffect(() => {
        const clock = setInterval(() => {
            setTime(getTime());
        }, 1000);

        return () => clearInterval(clock); 
    }, []);

    return (
        <div className="clock">
            <h2 className="clock__date">{getDate()}</h2>
            <h1 className="clock__time">{time}</h1>
        </div>
    );
}