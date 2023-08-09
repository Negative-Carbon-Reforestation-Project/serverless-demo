import markerIcon from "../../resources/images/icons/map-marker-100x100.png";
import {useSelector} from "react-redux";
import {toLonLat} from "ol/proj";
import {useRef, useState} from "react";
import QueryMenu from "./QueryMenu";

/**
 * Container for the Marker overlay
 * @returns {JSX.Element}
 * @remark On click, controls whether the query menu is displayed.
 */
const Marker = () => {

    const queryMenuRef = useRef();
    const [coordinates, setCoordinates] = useState();
    const map = useSelector((state) => state.maps.value.map);

    /**
     * Sets the query coordinates to the marker's current position
     */
    const setQueryCoordinates = () => {
        let markerPosition = map.getOverlayById("map-marker").getPosition();
        let longLatCoordinates = toLonLat(markerPosition);

        setCoordinates(longLatCoordinates);
    }

    return (
        <>
            <div id="map-marker"
                 className="map-marker"
                 onClick={() => setQueryCoordinates()}
            >
                <img  src={markerIcon} alt="Marker icon"/>
            </div>

            <QueryMenu ref={queryMenuRef} coordinates={coordinates}/>
        </>


    )
}

export default Marker;