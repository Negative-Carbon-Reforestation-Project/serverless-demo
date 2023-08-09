import {Steps} from "intro.js-react";
import {useDispatch, useSelector} from "react-redux";
import {toggleTutorial} from "../../redux/reducers/appReducer";
import {useRef} from "react";

/**
 * Container for Tutorial
 * @returns {JSX.Element}
 * @remark Uses Intro.js
 */
const Tutorial = () => {

    const stepRef = useRef();

    const tutorialEnabled = useSelector((state) => state.app.value.tutorialEnabled);
    const dispatch = useDispatch();


    /**
     * The steps in the tutorial
     * Documentation available at https://github.com/HiDeoo/intro.js-react
     */
    const steps = [
        {
            title: "Welcome",
            intro: "Let's take a quick tour!",
            tooltipClass: "tutorial-container"

        },
        {
            title: "Using Layers",
            element: ".layer-control",
            intro: "Use the layer control to toggle base and land cover layers on and off.",
            tooltipClass: "tutorial-container"
        },
        {
            title: "Using 3D Mode",
            element: ".layer-control",
            intro: "You can also toggle 3D mode by using the layer control.",
            tooltipClass: "tutorial-container"
        },
        {
            title: "Searching",
            intro: "Clicking on the map will place a marker that when clicked on will query the marker's location.",
            tooltipClass: "tutorial-container"
        },
        {
            title: "Searching",
            element: ".search-bar",
            intro: "Alternatively, you can also query locations directly using the search bar.",
            tooltipClass: "tutorial-container"
        },
        {
            title: "Using The Camera",
            element: ".zoom-controls",
            intro: "You can zoom in and out by using the zoom controls or by using your mousewheel.",
            tooltipClass: "tutorial-container"
        },
        {
            title: "Using The Camera",
            element: ".zoom-controls",
            intro: "In 3D mode, you are able to tilt the camera backwards and forwards",
            tooltipClass: "tutorial-container"
        },
        {
            title: "Start Exploring",
            intro: "You are all set to explore reforestation opportunities",
            tooltipClass: "tutorial-container"
        },
        {
            title: "Start Exploring",
            element: ".menu-button",
            intro: "If you'd like to see this tutorial again, click on Get Help by opening the menu",
            tooltipClass: "tutorial-container"
        },
    ]

    /**
     * Exit the tutorial
     * @remark When exiting the tutorial for the first time, a cookie indicating that the tutorial was shown is set.
     * This prevents the tutorial from being shown the next time the page is loaded -- unless it has expired or the user requested it
     */
    const exitTutorial = () => {
        dispatch(toggleTutorial({tutorialEnabled: false}));
        localStorage.setItem("onboarded", true);
    }

    /**
     * Handle functionality when the current step is changed
     * @param newStepIndex The new step's index
     * @param newElement The new step's element
     */
    const onAfterStepChangedHandler = (newStepIndex, newElement) => {

    }

    /**
     * Handle functionality before the current step is changed
     * @param nextStepIndex The next step's index
     * @param nextElement The next step's element
     */
    const onBeforeStepChangedHandler = (nextStepIndex, nextElement) => {

    }

    return (
        <>
            <Steps  ref={(steps) => stepRef.current = steps}
                    enabled={tutorialEnabled}
                    steps={steps}
                    initialStep={0}
                    onExit={() => exitTutorial()}
                    onBeforeChange={
                        (nextStepIndex, nextElement) => onBeforeStepChangedHandler(nextStepIndex, nextElement)
                    }
                    onAfterChange={
                        (newStepIndex, newElement) => onAfterStepChangedHandler(newStepIndex, newElement)
                    }
                    options={{
                        hideNext: false,
                        exitOnOverlayClick: false
                    }}
            />
        </>
    )
}

export default Tutorial;