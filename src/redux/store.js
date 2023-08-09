import {combineReducers} from "@reduxjs/toolkit";
import mapReducer from "./reducers/mapReducer";
import appReducer from "./reducers/appReducer";

const {configureStore} = require("@reduxjs/toolkit");

const reducers = combineReducers({
    maps: mapReducer,
    app: appReducer
});

/**
 * Redux store configuration for the app
 */
const store = configureStore({
    reducer: reducers,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                // Ignore these field paths in all actions
                ignoredActionPaths: ['payload.map', 'payload.cesiumMap', 'payload.layer'],
                // Ignore these paths in the state
                ignoredPaths: ['maps.value.map', 'maps.value.cesiumMap']
            }
        })
    });

export default store;