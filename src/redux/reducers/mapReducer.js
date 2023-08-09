import {View} from "ol";
import {createSlice} from "@reduxjs/toolkit";
import {layerMap} from "../../components/map/LayerSources";

/**
 * Initializes the openlayers map
 * @param state The current state of the reducer
 * @param action The object containing information about the new state
 */
const addMapAction = (state, action) => {
    state.value.map = action.payload.map;
}

/**
 * Adds a layer onto the map
 * @param state The current state of the reducer
 * @param action The object containing information about the new state
 */
const addMapLayerAction = (state, action) => {
    state.value.map.addLayer(action.payload.map);
}

/**
 * Sets the map view
 * @param state The current state of the reducer
 * @param action The object containing information about the new state
 */
const setMapViewAction = (state, action) => {

    state.value.map.setView(new View({
        center: action.payload.center,
        zoom: action.payload.zoom ?? 6
    }));
}

/**
 * Pans the map view slowly
 * @param state The current state of the reducer
 * @param action The object containing information about the new state
 */
const panMapViewAction = (state, action) => {

    let view = state.value.map.getView();

    view.animate({
        center: action.payload.center,
        zoom: action.payload.zoom,
        duration: action.payload.duration
    });
}

/**
 * Toggles a layer's visibility on the map
 * @param state The current state of the reducer
 * @param action The object containing information about the new state
 */
const toggleLayerVisibilityAction = (state, action) => {
    let layerIndex = Number(action.payload.layerIndex);
    let layers = state.value.map.getLayers();

    let isVisible = layers.item(layerIndex).getVisible();

    layers.item(layerIndex).setVisible(!isVisible);
}

/**
 * Toggles a base layer's visibility on the map
 * @param state The current state of the reducer
 * @param action The object containing information about the new state
 * @remark If other base layers are visibile, they will be toggled off.
 */
const toggleBaseLayerVisibilityAction = (state, action) => {
    let layerIndex = Number(action.payload.layerIndex);
    let layers = state.value.map.getLayers();

    for (let i = 0; i <= 4; i++)
    {
        layers.item(i).setVisible(false);
    }

    layers.item(layerIndex).setVisible(true);
}

/**
 * Removes a layer from the map
 * @param state The current state of the reducer
 * @param action The object containing information about the new state
 */
const removeMapLayerAction = (state, action) => {
    state.value.map.removeLayer(action.payload.map);
}

/**
 * Initializes the cesium version of the openlayers map
 * @param state The current state of the reducer
 * @param action The object containing information about the new state
 */
const addCesiumMapAction = (state, action) => {
    state.value.cesiumMap = action.payload.cesiumMap;
}

/**
 * Toggles cesium on/off
 * @param state The current state of the reducer
 * @param action The object containing information about the new state
 */
const toggleCesiumEnabledAction = (state) => {
    let cesiumMap = state.value.cesiumMap;
    let cesiumEnabled = cesiumMap.getEnabled();

    state.value.cesiumMap.setEnabled(!cesiumEnabled);
    state.value.cesiumEnabled = !cesiumEnabled;
}

/**
 * Creates a marker at the given coordinates
 * @param state The current state of the reducer
 * @param action The object containing information about the new state
 */
const addMarkerAction = (state, action) => {
    let marker = state.value.map.getOverlayById("map-marker");
    marker.setPosition(action.payload.position);
}


/**
 * Removes a given marker
 * @param state The current state of the reducer
 * @param action The object containing information about the new state
 */
const removeMarkerAction = (state, action) => {
    let marker = state.value.map.getOverlayById("map-marker");
    marker.setPosition(undefined);
}

/**
 * Sets the browser history's state
 * @param state The current state of the reducer
 * @param action The object containing information about the new state
 * @remark
 */
const setHistoryStateAction = (state, action) => {
    if (window.location.hash !== "")
    {
        let [base, mode, view, marker] = window.location.hash
            .split("&")
            .map((entry) => entry.split("=")[1]);

        action.payload.base = action.payload.base ?? base;
        action.payload.mode = action.payload.mode ?? mode;

        let [zoom, ...center] = view.split(",");
        action.payload.view = action.payload.view ?? {
            zoom: zoom,
            center: center
        };

        action.payload.marker = action.payload.marker ?? marker.split(",");
    }


    let base = `base=${action.payload.base}`;
    let mode = `mode=${action.payload.mode}`;
    let view = `view=${action.payload.view.zoom},${action.payload.view.center[0]},${action.payload.view.center[1]}`;
    let marker = `marker=${action.payload.marker[0]},${action.payload.marker[1]}`;

    let hash = `#${base}&${mode}&${view}&${marker}`;
    window.history.pushState(action.payload, 'mapViewState', hash);
    state.value.mapHash = hash;
}

/**
 * Reads the browser history's state
 * @param state The current state of the reducer
 * @param action The object containing information about the new state
 * @remark The map is initialiazed based on the hash parameters:
 *   base: The active base layer. Default is "default"
 *   mode: 2D or 3D mode. Default is 2D
 *   view: The view or center of the map. Defaults to Washington state.
 *   marker: The coordinates of an active marker. Defaults to "!,!" if inactive.
 */
const readHistoryStateAction = (state) => {
    let [base, mode, view, marker] = window.location.hash
        .split("&")
        .map((entry) => entry.split("=")[1]);

    toggleBaseLayerVisibilityAction(state, {payload: {layerIndex: layerMap.get(base)}});

    let viewTokens = view.split(",");

    if (viewTokens.length === 3)
    {
        let [zoom, ...center] = viewTokens.map(token => parseFloat(token));
        setMapViewAction(state, {payload: {center: center, zoom: zoom}});
    }

    let markerTokens = marker.split(",");

    if (markerTokens.length === 2 && markerTokens[0] !== "!")
    {
        let position = markerTokens.map(token => parseFloat(token));
        addMarkerAction(state, {payload: {position: position}});
    }

    if (mode === "3D")
    {
        toggleCesiumEnabledAction(state);
    }

}

/**
 * Reducer configuration for the openlayers map and cesium map actions and events.
 */
const mapsSlice = createSlice({
    name: "maps",
    initialState: {
        value: {map: undefined, cesiumEnabled: false, cesiumMap: undefined, mapHash: undefined}
    },
    reducers: {
        addMap: (state, action) => addMapAction(state, action),
        setMapView: (state, action) => setMapViewAction(state, action),
        panMapView: (state, action) => panMapViewAction(state, action),
        addMapLayer: (state, action) => addMapLayerAction(state, action),
        removeMapLayer: (state, action) => removeMapLayerAction(state, action),
        addMarker: (state, action) => addMarkerAction(state, action),
        removeMarker: (state, action) => removeMarkerAction(state, action),
        toggleLayerVisibility: (state, action) => toggleLayerVisibilityAction(state, action),
        toggleBaseLayerVisibility: (state, action) => toggleBaseLayerVisibilityAction(state, action),
        addCesiumMap: (state, action) => addCesiumMapAction(state, action),
        toggleCesiumEnabled: (state) => toggleCesiumEnabledAction(state),
        setHistoryState: (state, action) => setHistoryStateAction(state, action),
        readHistoryState: (state, action) => readHistoryStateAction(state, action),
    }
});

export const {
    addMap,
    setMapView,
    panMapView,
    addMapLayer,
    removeMapLayer,
    addMarker,
    removeMarker,
    toggleLayerVisibility,
    toggleBaseLayerVisibility,
    addCesiumMap,
    toggleCesiumEnabled,
    setHistoryState,
    readHistoryState
} = mapsSlice.actions;

export default mapsSlice.reducer;