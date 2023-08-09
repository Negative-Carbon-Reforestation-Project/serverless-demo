import {useSelector} from "react-redux";
import {useEffect, useRef} from "react";
import olcs from "olcs/core";
import tiltDown from "../../resources/images/icons/distorted-tilt-down-arrow-512x512.svg";
import tiltUp from "../../resources/images/icons/distorted-tilt-up-arrow-512x512.svg";
import cameraIcon from "../../resources/images/icons/camera-control-512x512.svg";

/**
 * Container for the Camera controls
 * @returns {JSX.Element}
 */
const CameraControl = () => {
    const map = useSelector((state) => state.maps.value.map);
    const cesiumMap = useSelector((state) => state.maps.value.cesiumMap);
    const cesiumEnabled = useSelector((state) => state.maps.value.cesiumEnabled);

    const zoomTimerRef = useRef(0);
    const tiltTimerRef = useRef(0);
    const hideCameraControlsRef = useRef(0);

    const zoomControls = useRef();
    const cameraControl = useRef();
    const expandedCameraControls = useRef();

    /**
     * Zooms the map using the given modifier
     * @param modifier The amount the map is to be zoomed by. Negative values zoom out the map. The default is 0.5.
     */
    const zoom = (modifier=0.5) => {
        let view = map.getView();
        let currentZoomLevel = view.getZoom();
        view.setZoom(currentZoomLevel + modifier);
    }

    /**
     * Zooms the map using the given modifier in intervals
     * @param modifier The amount the map is to be zoomed by. Negative values zoom out the map. The default is 0.5.
     * @param timeout The time between intervals.
     * @remark Intervals are used to allow the user to hold down the zoom control to zoom in / out.
     * The intervals are cleared when the mouse is released.
     */
    const setZoomInterval = (modifier=0.5, timeout=300) => {
        zoomTimerRef.current = setInterval(() => {
            zoom(modifier);
        }, timeout);
    }

    /**
     * Tilts the map using the given angle
     * @param angle The angle to be tilted at. Negative angles tilt forward. The default is 0.05.
     */
    const tilt = (angle=0.05) => {
        let scene = cesiumMap.getCesiumScene();
        let camera = scene.camera;
        let pivot = olcs.pickBottomPoint(scene);

        if (!pivot)
        {
            return;
        }

        const transform = window.Cesium.Matrix4.fromTranslation(pivot);
        const axis = camera.right;
        olcs.rotateAroundAxis(camera, -angle, axis, transform, {})
    }

    /**
     * Tilts the map using the given angle in intervals.
     * @param angle The angle to be tilted at. Negative angles tilt forward. The default is 0.05.
     * @param timeout The time between intervals.
     * @remark Intervals are used to allow the user to hold down the tilt controls to tilt the map forward and backwards.
     * The intervals are cleared when the mouse is released.
     */
    const setTiltInterval = (angle=0.05, timeout=300) => {
        tiltTimerRef.current = setInterval(() => {
            tilt(angle);
        }, timeout);
    }

    /**
     * Toggles the visibility of the camera controls based on whether cesium is enabled.
     */
    const toggleCameraControls = () => {

        if (cesiumEnabled)
        {
            zoomControls.current.classList.remove("active-flex-column");
            cameraControl.current.classList.add("active");
        }
        else
        {
            zoomControls.current.classList.add("active-flex-column");
            cameraControl.current.classList.remove("active");
        }
    }

    /**
     * Shows the expanded camera controls
     */
    const showExpandedCameraControls = () => {
        expandedCameraControls.current.classList.add("active");
        expandedCameraControls.current.focus();
    }

    /**
     * Hides the expanded camera controls after the given amount of time
     * @param timeout The time it takes to hide the expanded camera controls. Default is 0 ms.
     */
    const hideExpandedCameraControls = (timeout) => {
        hideCameraControlsRef.current = setTimeout(() => expandedCameraControls.current.classList.remove("active"), timeout);
    }

    /**
     * Once the component is mounted onto the DOM, toggle the correct amount of camera controls
     * based on whether cesium is enabled.
     */
    useEffect(() => {
        toggleCameraControls();
    }, [cesiumEnabled])

    return (
        <>
            <div ref={zoomControls}
                 className="zoom-controls active-flex-column"
                 tabIndex={0}
                 aria-label="Zoom in and out controls"
            >
                <button className="zoom-in-control control"
                        aria-label="Zoom in"
                        title="Zoom in"
                        onClick={() => zoom()}
                        onMouseDown={() => setZoomInterval()}
                        onMouseUp={() => clearInterval(zoomTimerRef.current)}
                        onMouseLeave={() => clearInterval(zoomTimerRef.current)}
                        onTouchStart={() => setZoomInterval()}
                        onTouchEnd={() => clearInterval(zoomTimerRef.current)}
                >
                    +
                </button>

                <button className="zoom-out-control control"
                        aria-label="Zoom out"
                        title="Zoom out"
                        onClick={() => zoom(-0.5)}
                        onMouseDown={() => setZoomInterval(-0.5)}
                        onMouseUp={() => clearInterval(zoomTimerRef.current)}
                        onMouseLeave={() => clearInterval(zoomTimerRef.current)}
                        onTouchStart={() => setZoomInterval(-0.5)}
                        onTouchEnd={() => clearInterval(zoomTimerRef.current)}
                >
                    -
                </button>
            </div>
            
            <div ref={cameraControl} className="camera-controls">
                <button className="expand-camera-controls control"
                        aria-label="Toggle more camera controls"
                        onClick={() => {
                            clearTimeout(hideCameraControlsRef.current);
                            showExpandedCameraControls();
                        }}
                        onMouseOver={() => {
                            clearTimeout(hideCameraControlsRef.current);
                            showExpandedCameraControls();
                        }}
                        onMouseEnter={() => clearTimeout(hideCameraControlsRef.current)}
                        onMouseOut={() => hideExpandedCameraControls(800)}
                >
                    <img src={cameraIcon} alt="Camera icon" draggable={false}/>
                </button>

                <section ref={expandedCameraControls}
                         className="expanded-camera-controls"
                         aria-label="More camera controls for the map"
                         onMouseOver={() => clearTimeout(hideCameraControlsRef.current)}
                         onMouseOut={() => hideExpandedCameraControls(800)}
                         onFocus={() => clearTimeout(hideCameraControlsRef.current)}
                         onBlur={() => hideExpandedCameraControls(800)}
                >
                        <button className="zoom-in-camera camera-control"
                                aria-label="Zoom in"
                                title="Zoom in"
                                onClick={() => zoom()}
                                onMouseDown={() => setZoomInterval()}
                                onMouseUp={() => clearInterval(zoomTimerRef.current)}
                                onMouseLeave={() => clearInterval(zoomTimerRef.current)}
                                onTouchStart={() => setZoomInterval()}
                                onTouchEnd={() => clearInterval(zoomTimerRef.current)}
                        >
                            +
                        </button>

                        <button className="zoom-out-camera camera-control"
                                aria-label="Zoom out"
                                title="Zoom out"
                                onClick={() => zoom(-0.5)}
                                onMouseDown={() => setZoomInterval(-0.5)}
                                onMouseUp={() => clearInterval(zoomTimerRef.current)}
                                onMouseLeave={() => clearInterval(zoomTimerRef.current)}
                                onTouchStart={() => setZoomInterval(-0.5)}
                                onTouchEnd={() => clearInterval(zoomTimerRef.current)}
                        >
                            -
                        </button>

                        <button className="tilt-down-control camera-control"
                                aria-label="Tilt the map backwards"
                                title="Tilt backwards"
                                onClick={() => tilt()}
                                onMouseDown={() => setTiltInterval()}
                                onMouseUp={() => clearInterval(tiltTimerRef.current)}
                                onMouseLeave={() => clearInterval(tiltTimerRef.current)}
                                onTouchStart={() => setTiltInterval()}
                                onTouchEnd={() => clearInterval(tiltTimerRef.current)}
                        >
                            <img src={tiltDown} alt="Tilt down arrow" draggable={false}/>
                        </button>

                        <button className="tilt-up-control camera-control"
                                aria-label="Tilt the map forward"
                                title="Tilt forward"
                                onClick={() => tilt(-0.05)}
                                onMouseDown={() => setTiltInterval(-0.05)}
                                onMouseUp={() => clearInterval(tiltTimerRef.current)}
                                onMouseLeave={() => clearInterval(tiltTimerRef.current)}
                                onTouchStart={() => setTiltInterval(-0.05)}
                                onTouchEnd={() => clearInterval(tiltTimerRef.current)}
                        >
                            <img src={tiltUp} alt="Tilt up arrow" draggable={false}/>
                        </button>
                </section>
            </div>
        </>
    )
}

export default CameraControl;