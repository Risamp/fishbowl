import React from "react";
import { useState, useEffect } from "react";

export default function FishDetails({fish}) {

    useEffect(() => {

    }, []);

    return (
        <div>
            {fish != null &&
                <h1>{fish.name}</h1>
            }
        </div>
    );
}