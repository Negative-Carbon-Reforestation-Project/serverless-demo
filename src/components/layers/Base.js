import TileLayer from "./TileLayer";
import {aerial, osm, terrain, toner, topographical} from "../map/LayerSources";
import React from "react";

/**
 * Container for base layers
 * @returns {JSX.Element}
 */
const Base = () => {
    return (
        <>
            <TileLayer source={osm} zIndex={0} visible={true} preload={4}/>
            <TileLayer source={aerial} zIndex={0} preload={Infinity}/>
            <TileLayer source={toner} zIndex={0}/>
            <TileLayer source={topographical} zIndex={0} preload={Infinity}/>
            <TileLayer source={terrain} zIndex={0}/>
        </>
    );
}

export default Base;