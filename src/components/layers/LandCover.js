import TileLayer from "./TileLayer";
import {slope, soil, totalOpportunity, wildfires} from "../map/LayerSources";
import React from "react";

/**
 * Container for Landcover layers
 * @returns {JSX.Element}
 */
const LandCover = () => {
    return (
        <>
            <TileLayer source={slope} zIndex={1} opacity={.6}/>
            <TileLayer source={wildfires} zIndex={2} opacity={.3}/>
            <TileLayer source={soil} zIndex={3}/>
            <TileLayer source={totalOpportunity} zIndex={4}/>
        </>
    )
}

export default LandCover;