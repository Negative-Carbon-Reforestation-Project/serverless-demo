import React, {useEffect} from 'react';
import Map from "../map/Map";
import Layers from "../layers/Layers";
import Controls from "../controls/Controls";
import Overlays from "../overlays/Overlays";
import SearchBar from "../base/SearchBar";
import LayerControl from "../controls/LayerControl";
import CameraControl from "../controls/CameraControl";
import Base from "../layers/Base";
import LandCover from "../layers/LandCover";
import Tutorial from "../overlays/Tutorial";
import Marker from "../overlays/Marker";

/**
 * Component for the React applicaation
 * @returns {JSX.Element}
 */
const App = () => {
    /**
     * Once the component is mounted onto the DOM, dynamically update the page's title and the viewport tag.
     *
     * The user-scalable tag prevents zooming in on mobile webpages. i0S might not support this feature.
     */
    useEffect(() =>{
        document.title = "Negative Carbon Reforestation Project - Maps";

        let viewportMetaTag = document.querySelector("meta[name=viewport]");
        viewportMetaTag.setAttribute("content", "initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no");
    })

    return (
        <div className="map-container">
            <SearchBar />
            <Map>
                <Layers>
                    <Base/>
                    <LandCover/>
                </Layers>

                <Controls>
                    <LayerControl/>
                    <CameraControl/>
                </Controls>

                <Overlays>
                    <Marker/>
                </Overlays>
            </Map>
            <Tutorial/>
        </div>
    )
};

export default App;
