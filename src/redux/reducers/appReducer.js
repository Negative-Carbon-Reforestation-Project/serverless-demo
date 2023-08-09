import {createSlice} from "@reduxjs/toolkit";

/**
 * Decide whether to show the tutorial
 * @returns {boolean} True if the tutorial hasn't been shown before; False otherwise
 *
 * @remark Uses local storage to persist
 */
const showTutorial = () => {
    let showTutorial = localStorage.getItem("onboarded");

    if (!showTutorial)
    {
        return true;
    }

    return showTutorial === "false";
}

/**
 * Toggles the guided tutorial
 * @param state The current state of the reducer
 * @param action The object containing information about the new state
 */
const toggleTutorialAction = (state, action) => {
    state.value.tutorialEnabled = action.payload.tutorialEnabled;
}

/**
 * Reducer configuration for the openlayers map and cesium map actions and events.
 */
const appSlice = createSlice({
    name: "app",
    initialState: {
        value: {tutorialEnabled: showTutorial()}
    },
    reducers: {
        toggleTutorial: (state, action) => toggleTutorialAction(state, action),
    }
});

export const {
    toggleTutorial
} = appSlice.actions;

export default appSlice.reducer;