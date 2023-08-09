import React from "react";
import useMap from "./useMap";

/**
 * Container for the OpenLayer Map
 * @param children The child components
 * @param zoom Initial resolution for the view
 * @param center Initial center for the view
 * @returns {JSX.Element}
 */
const Map = ({ children }) => {
    const { mapRef } = useMap();

    return (
            <div ref={mapRef} className="ol-map" tabIndex={0} aria-label="Map. Use arrow keys to pan the map." role="application">
                {children}
            </div>
    )
}

export default Map;