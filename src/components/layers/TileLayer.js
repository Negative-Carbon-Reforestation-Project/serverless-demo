import { useEffect } from "react";
import OLTileLayer from "ol/layer/Tile";
import {useSelector} from "react-redux";

/**
 * Container for custom OpenLayer TileLayers
 * @param source The source image(s) for this layer.
 * @param zIndex The z-index for layer rendering. Determines positioning of layers, default is 0.
 * @param preload The tiles to be preloaded, default is 0.
 * @param opacity The opacity for the tile, default is 1.
 * @returns {null}
 */
const TileLayer = ({ source, zIndex = 0, preload = 0, opacity=1, visible=false}) => {
    const map = useSelector((state) => state.maps.value.map);

    /**
     * Once the component is mounted onto the dom, construct a new tilelayer and append it
     * to the map using the shared MapContext.
     */
    useEffect(() => {
        if (!map)
        {
            return;
        }

        let tileLayer = new OLTileLayer({
            source,
            zIndex,
            preload,
            opacity,
            visible
        });

        map.addLayer(tileLayer);

        return () => {
            if (map)
            {
                map.removeLayer(tileLayer);
            }
        };

    }, [map]);

    return null;
};

export default TileLayer;