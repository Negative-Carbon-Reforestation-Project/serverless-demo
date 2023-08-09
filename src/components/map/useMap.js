import { useRef, useEffect } from "react";
import {View, Map, Overlay} from "ol";
import OLCesium from "olcs/OLCesium";
import {CesiumTerrainProvider} from "cesium";
import {useDispatch, useSelector} from "react-redux";
import {
    addCesiumMap,
    addMap,
    addMarker, readHistoryState,
    removeMarker, setHistoryState, setMapView,
    toggleBaseLayerVisibility, toggleCesiumEnabled
} from "../../redux/reducers/mapReducer";
import {layerMap} from "./LayerSources";

/**
 * Encapsulated logic for the OL Map
 * @returns {{mapRef: React.MutableRefObject<undefined>}}
 */
const useMap = () => {
    const mapRef = useRef();
    const map = useSelector((state) => state.maps.value.map);
    const dispatch = useDispatch();


    let updateViewHash = true;

    /**
     * Once the component is mounted onto the DOM, construct a new map with the given view.
     *
     * @remarks The view is bounded to Washington state with the extent property.
     */
    useEffect(() => {
        let center = [-13613892.456811214, 6009767.707538246];
        let zoom = 6;

        let options = {
            view: new View({
                zoom,
                center
            }),
            layers: [],
            controls: [],
            overlays: []
        };

        let mapObject = new Map(options);

        mapObject.setTarget(mapRef.current);
        dispatch(addMap({map: mapObject}));

        return () => mapObject.setTarget(undefined);
    }, []);

    /**
     * Once the component is mounted onto the DOM, read the url hash if one is present and initialize the map
     * before layers are composed. If a url hash isn't present, we set a default hash.
     */
    useEffect(() => {
        if (!map)
        {
            return;
        }

        map.once("precompose", () => {
            if (window.location.hash === "")
            {
                dispatch(setHistoryState({
                    base: "default",
                    mode: "2D",
                    view: {
                        zoom: 6,
                        center: [-13613892.456811214, 6009767.707538246]
                    },
                    marker: [-13757940.547983468,6057128.033048746]
                }));

                dispatch(addMarker({position: [-13757940.547983468,6057128.033048746]}));
            }
            else
            {
                dispatch(readHistoryState());
            }
        });
    }, [map]);

     /**
      * Once the component is mounted onto the DOM, determine whether to update the view hash when the map is moved..
      * If the state of the map changes, this function is called again.
      *
      * @remark When the map is moved, the new history state is pushed and if the history state is popped (browser back)
      * the previous state is loaded.
      */
    useEffect(() => {
        if (!map)
        {
            return;
        }

        map.on("moveend", () => {
            if (!updateViewHash)
            {
                updateViewHash = true;
                return;
            }

            let center = map.getView().getCenter();
            let zoom = map.getView().getZoom();

            dispatch(setHistoryState({
                view: {
                    zoom: zoom,
                    center: center
                }
            }));
        });

        window.onpopstate = (event) => {
            if (event.state !== null)
            {
                dispatch(readHistoryState());
            }

            updateViewHash = false;
        };

    }, [map]);

    /**
     * Once the component is mounted onto the DOM, generate the 3D cesium map and the world terrain.
     * If the state of the map changes, this function is called again.
     *
     * @remark window.Cesium is imported from Cesium.js script in index.html
     */
    useEffect(() => {
        if (!map)
        {
            return;
        }

        window.Cesium.Ion.defaultAccessToken = process.env.REACT_APP_CESIUMTOKEN;

        let cesiumMapObject = new OLCesium({map: map});
        let scene = cesiumMapObject.getCesiumScene();
        scene.terrainProvider = new CesiumTerrainProvider({
            url: window.Cesium.IonResource.fromAssetId(1)
        });

        dispatch(addCesiumMap({cesiumMap: cesiumMapObject}))
    }, [map]);


    /**
     * Once the component is mounted onto the DOM, create a marker overlay on click.
     *
     * @remark When markers are added and removed, the hash is updated accordingly.
     */
    useEffect(() => {
        if (!map) {
            return;
        }

        let marker = new Overlay({
            id: "map-marker",
            element: document.getElementById("map-marker"),
            autoPan: true,
            autoPanAnimation: { duration: 250 }
        });

        map.addOverlay(marker);
        marker.setPosition(undefined);

        map.on("singleclick", (event) => {

            let marker = map.getOverlayById("map-marker");

            if (marker.getPosition() === undefined)
            {
                dispatch(addMarker({position: event.coordinate}));

                dispatch(setHistoryState({
                    marker: event.coordinate
                }));
            }
            else
            {
                dispatch(removeMarker());

                dispatch(setHistoryState({
                    marker: ["!", "!"]
                }));
            }

            return () => {
                if (map)
                {
                    dispatch(removeMarker());
                }
            };
        });

    }, [map]);

    return { mapRef }
}

export default useMap;