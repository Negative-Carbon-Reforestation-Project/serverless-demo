import { useEffect } from "react";
import OLVectorLayer from "ol/layer/Vector";
import {useSelector} from "react-redux";

/**
 * Container for custom OpenLayer VectorLayers
 * @param source The source image(s) for this layer
 * @param style The style function for the layer
 * @param zIndex The z-index for layer rendering. Determines positioning of layers, default is 0.
 * @param opacity The opacity for the tile, default is 1.
 * @returns {null}
 */
const VectorLayer = ({ source, style, zIndex = 0, opacity=1}) => {
    const map = useSelector((state) => state.maps.value.map);

    /**
     * Once the component is mounted onto the DOM, construct a vector layer and append it to the map
     * using the shared MapContext.
     */
    useEffect(() => {
        if (!map)
        {
            return;
        }

        let vectorLayer = new OLVectorLayer({
            source,
            style,
            zIndex,
            opacity
        });

        map.addLayer(vectorLayer);

        return () => {
            if (map)
            {
                map.removeLayer(vectorLayer);
            }
        };

    }, [map]);

    return null;
};

export default VectorLayer;