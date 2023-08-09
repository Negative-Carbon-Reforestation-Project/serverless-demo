import React, {useEffect, useRef, useState} from "react";
import layerIcon from "../../resources/images/icons/layer-control-20x20.png";
import osmPreview from "../../resources/images/backdrops/osm-preview-195x197.png";
import aerialPreview from "../../resources/images/backdrops/aerial-preview-195x197.png";
import blackWhitePreview from "../../resources/images/backdrops/bw-preview-195x197.png";
import terrainPreview from "../../resources/images/backdrops/terrain-preview-195x197.png";
import topoPreview from "../../resources/images/backdrops/topo-preview-195x197.png";

import moreLayers from "../../resources/images/icons/more-layers.png";
import slopesPreview from "../../resources/images/icons/slopes-preview.png";
import firePreview from "../../resources/images/icons/fire-preview.png";
import soilPreview from "../../resources/images/icons/soil-preview.png";
import treeDensityPreview from "../../resources/images/icons/tree-density-preview.png";
import {useDispatch} from "react-redux";
import {
    setHistoryState,
    toggleBaseLayerVisibility,
    toggleCesiumEnabled,
    toggleLayerVisibility
} from "../../redux/reducers/mapReducer";
import exitIcon from "../../resources/images/icons/exit-icon-50x50.png";
import {layerMap} from "../map/LayerSources";

/**
 * Container for the Layer switch control
 * @returns {JSX.Element}
 * @constructor
 */
const LayerControl = () => {
    const dispatch = useDispatch();

    const layerMenuCollapsedRef = useRef();
    const layerMenuExpandedRef = useRef();
    const hideMenuTimerRef = useRef(0);
    const hideExpandedMenuTimerRef = useRef(0);
    const lastBaseLayerRef = useRef(0);

    /**
     * Shows the collapsed layer menu
     *
     * @remark Sets focus to it when shown and if on a smaller viewport, shows the expanded menu instead.
     */
    const showCollapsedLayerMenu = () => {

        if(window.matchMedia("(max-width: 600px)").matches)
        {
            showExpandedLayerMenu();
        }
        else
        {
            layerMenuCollapsedRef.current.classList.add("active-flex");
            layerMenuCollapsedRef.current.focus();
        }
    }

    /**
     * Hides the collapsed layer menu after the given amount of time
     * @param timeout The time it takes to hide the collapsed menu. Default is 0 ms.
     * @remark The timeout ID is tracked in hideMenuTimer to allow the timeout to be cleared if a child receives focus
     */
    const hideCollapsedLayerMenu = (timeout=0) => {
        hideMenuTimerRef.current = setTimeout(() => layerMenuCollapsedRef.current.classList.remove("active-flex"), timeout);
    }

    /**
     * Shows the expanded layer menu
     *
     * @remark Hides the collapsed menu when shown and also sets focus
     */
    const showExpandedLayerMenu = () => {
        layerMenuCollapsedRef.current.classList.remove("active-flex");
        layerMenuExpandedRef.current.classList.add("active-flex");
        layerMenuExpandedRef.current.focus();
    }

    /**
     * Hides the expanded layer menu after the given amount of time
     * @param timeout The time it takes to hide the expanded menu. Default is 0 ms.
     * @remark The timeout ID is tracked in hideMenuTimer to allow the timeout to be cleared if a child receives focus
     */
    const hideExpandedLayerMenu = (timeout=0) => {
        hideExpandedMenuTimerRef.current = setTimeout(() => layerMenuExpandedRef.current.classList.remove("active-flex"), timeout);
    }

    /**
     * Toggles a layer's visibility
     * @param event The click event
     */
    const toggleLayer = (event) => {
       let layerName = event.currentTarget.getAttribute("data-layer-name");
       let layerIndex = layerMap.get(layerName);
       dispatch(toggleLayerVisibility({layerIndex: layerIndex}));
    }

    /**
     * Toggles the base layer visibility
     * @remark Only one base layer can be active, so disabling other base layers is required.
     * @param event The click event
     */
    const toggleBaseLayer = (event) => {
        let layerName = event.currentTarget.getAttribute("data-layer-name");
        let layerIndex = layerMap.get(layerName);
        dispatch(toggleBaseLayerVisibility({layerIndex: layerIndex}));

        let lastBaseLayerGroups = document.querySelectorAll(`button[data-layer-name='${lastBaseLayerRef.current}']`);
        lastBaseLayerGroups.forEach((group) => group.classList.remove("layer-active"));

        lastBaseLayerRef.current = layerName;
        let currentBaseLayerGroups = document.querySelectorAll(`button[data-layer-name='${lastBaseLayerRef.current}']`);
        currentBaseLayerGroups.forEach((group) => group.classList.add("layer-active"));

        dispatch(setHistoryState({base: layerName}));
    }

    /**
     * Toggles 3D mode
     */
    const toggleCesiumView = (event) => {
        dispatch(toggleCesiumEnabled());
        dispatch(setHistoryState({mode: event.currentTarget.checked ? "3D" : "2D"}));
    }

    useEffect(() => {
        if (window.location.hash !== "")
        {
            let [base, mode] = window.location.hash
                .split("&")
                .map((entry) => entry.split("=")[1]);

            let defaultBaseLayerGroups = document.querySelectorAll(`button[data-layer-name='${base}']`);
            defaultBaseLayerGroups.forEach((group) => group.classList.add("layer-active"));
            lastBaseLayerRef.current = base;

            document.querySelector(".cesium-option-toggle").checked = mode === "3D";
        }
    }, [])

    return (
        <>
            <button className="layer-control"
                    aria-label="View layer options"
                    onMouseOver={() => {
                        clearTimeout(hideMenuTimerRef.current);
                        showCollapsedLayerMenu();
                    }}
                    onClick={() => {
                        clearTimeout(hideMenuTimerRef.current);
                        showCollapsedLayerMenu();
                    }}
                    onMouseEnter={() => clearTimeout(hideMenuTimerRef.current)}
                    onMouseOut={() => hideCollapsedLayerMenu(800)}
            >
                <img className="layer-control-icon" src={layerIcon} alt="Layer icon" draggable={false}/>
                <p>Layers</p>
            </button>

            <div ref={layerMenuCollapsedRef}
                 className="layer-menu-collapsed topo-skin"
                 aria-label="Layer options"
                 onMouseOver={() => clearTimeout(hideMenuTimerRef.current)}
                 onMouseOut={() => hideCollapsedLayerMenu(800)}
                 onFocus={() => clearTimeout(hideMenuTimerRef.current)}
                 onBlur={() => hideCollapsedLayerMenu(800)}
                 tabIndex={0}
            >
                <button className="layer-group"
                        aria-label="Toggle default base layer"
                        title="Toggle the default base layer"
                        onClick={(event) => toggleBaseLayer(event)}
                        data-layer-name="default"
                >
                    <img className="layer-preview" src={osmPreview} alt="Layer icon" draggable={false}/>
                    <p>Default</p>
                </button>

                <button className="layer-group"
                        aria-label="Toggle aerial base layer"
                        title="Toggle the aerial view base layer"
                        onClick={(event) => toggleBaseLayer(event)}
                        data-layer-name="aerial"
                >
                    <img className="layer-preview" src={aerialPreview} alt="Layer icon" draggable={false}/>
                    <p>Aerial</p>
                </button>

                <button className="layer-group"
                        aria-label="Toggle black and white base layer"
                        title="Toggle the black and white base layer"
                        onClick={(event) => toggleBaseLayer(event)}
                        data-layer-name="toner"
                >
                    <img className="layer-preview" src={blackWhitePreview} alt="Layer icon" draggable={false}/>
                    <p>Toner</p>
                </button>

                <button className="layer-group"
                        aria-label="Toggle topographical base layer"
                        title="Toggle the topographical base layer"
                        onClick={(event) => toggleBaseLayer(event)}
                        data-layer-name="topo"
                >
                    <img className="layer-preview" src={topoPreview} alt="Layer icon" draggable={false}/>
                    <p>Topo</p>
                </button>

                <button className="layer-group"
                        aria-label="Toggle terrain base layer"
                        title="Toggle the terrain base layer"
                        onClick={(event) => toggleBaseLayer(event)}
                        data-layer-name="terrain"
                >
                    <img className="layer-preview" src={terrainPreview} alt="Layer icon" draggable={false}/>
                    <p>Terrain</p>
                </button>

                <button id="more-layers"
                        className="layer-group"
                        onClick={() => showExpandedLayerMenu()}
                        title="View more layer options"
                        aria-label="View more layer options"
                >
                    <img className="layer-preview"  src={moreLayers} alt="Layer icon" draggable={false}/>
                    <p>More</p>
                </button>
            </div>

            <div ref={layerMenuExpandedRef}
                 className="layer-menu-expanded topo-skin"
                 aria-label="More layer options"
                 tabIndex={0}
            >
                <button className="expanded-menu-exit" aria-label="Close layer menu" onClick={() => hideExpandedLayerMenu()}>
                    <img className="expanded-menu-exit-icon"
                         src={exitIcon}
                         alt="Exit layer menu icon"
                         draggable={false}
                    />
                </button>
                <section className="landcover-layers">
                    <p>Landcover</p>

                    <section className="landcover-layer-previews" aria-label="Landcover layer options" tabIndex={0}>
                        <button className="layer-group"
                                aria-label="Toggle slope landcover layer"
                                title="Toggle the slope landcover layer"
                                onClick={(event) => toggleLayer(event)}
                                data-layer-name="slope"
                        >
                            <img className="layer-preview" src={slopesPreview} alt="Layer icon" draggable={false}/>
                            <p>Slope</p>
                        </button>

                        <button className="layer-group"
                                aria-label="Toggle wildfires landcover layer"
                                title="Toggle the wildfires landcover layer"
                                onClick={(event) => toggleLayer(event)}
                                data-layer-name="wildfires"
                        >
                            <img className="layer-preview" src={firePreview} alt="Layer icon" draggable={false}/>
                            <p>Wildfires</p>
                        </button>

                        <button
                            className="layer-group"
                            aria-label="Toggle soil landcover layer"
                            title="Toggle the soil landcover layer"
                            onClick={(event) => toggleLayer(event)}
                            data-layer-name="soil"
                        >
                            <img className="layer-preview" src={soilPreview} alt="Layer icon" draggable={false}/>
                            <p>Soil</p>
                        </button>

                        <button className="layer-group"
                                aria-label="Toggle tree density landcover layer"
                                title="Toggle the tree density landcover layer"
                                onClick={(event) => toggleLayer(event)}
                                data-layer-name="density"
                        >
                            <img className="layer-preview" src={treeDensityPreview} alt="Layer icon" draggable={false}/>
                            <p>Density</p>
                        </button>
                    </section>
                </section>

                <section className="base-layers">
                    <p>Base</p>

                    <section className="base-layer-previews" aria-label="Base layer options" tabIndex={0}>
                        <button className="layer-group"
                                aria-label="Toggle default base layer"
                                title="Toggle the default base layer"
                                onClick={(event) => toggleBaseLayer(event)}
                                data-layer-name="default"
                        >
                            <img className="layer-preview" src={osmPreview} alt="Layer icon" draggable={false}/>
                            <p>Default</p>
                        </button>

                        <button className="layer-group"
                                aria-label="Toggle aerial base layer"
                                title="Toggle the aerial view base layer"
                                onClick={(event) => toggleBaseLayer(event)}
                                data-layer-name="aerial"
                        >
                            <img className="layer-preview" src={aerialPreview} alt="Layer icon" draggable={false}/>
                            <p>Aerial</p>
                        </button>

                        <button className="layer-group"
                                aria-label="Toggle black and white base layer"
                                title="Toggle the black and white base layer"
                                onClick={(event) => toggleBaseLayer(event)}
                                data-layer-name="toner"
                        >
                            <img className="layer-preview" src={blackWhitePreview} alt="Layer icon" draggable={false}/>
                            <p>Toner</p>
                        </button>

                        <button className="layer-group"
                                aria-label="Toggle topographical base layer"
                                title="Toggle the topographical base layer"
                                onClick={(event) => toggleBaseLayer(event)}
                                data-layer-name="topo"
                        >
                            <img className="layer-preview" src={topoPreview} alt="Layer icon" draggable={false}/>
                            <p>Topo</p>
                        </button>

                        <button className="layer-group"
                                aria-label="Toggle terrain base layer"
                                title="Toggle the terrain base layer"
                                onClick={(event) => toggleBaseLayer(event)}
                                data-layer-name="terrain"
                        >
                            <img className="layer-preview" src={terrainPreview} alt="Layer icon" draggable={false}/>
                            <p>Terrain</p>
                        </button>
                    </section>
                </section>

                <section className="cesium-option">
                    <input className="cesium-option-toggle" type="checkbox" id="Toggle 3D View" onClick={(event) => toggleCesiumView(event)}/>
                    <label htmlFor="Toggle 3D View">Toggle 3D View</label>
                </section>
            </div>
        </>
    )
}

export default LayerControl;