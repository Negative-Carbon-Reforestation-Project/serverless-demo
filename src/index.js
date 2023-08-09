import React from 'react';
import ReactDOM from 'react-dom';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Index from "./components/pages/Index";
import store  from "./redux/store";
import { Provider } from "react-redux";
import Fallback from "./components/pages/Fallback";

const Mission = React.lazy(() => import("./components/pages/Mission"));
const App = React.lazy(() => import("./components/pages/App"));
const Terms = React.lazy(() => import("./components/pages/Terms"));
const Privacy = React.lazy(() => import("./components/pages/Privacy"));
const Accessibility = React.lazy(() => import("./components/pages/Accessibility"));
const AppEmbed = React.lazy(() => import("./components/pages/AppEmbed"));

ReactDOM.render(
    <React.StrictMode>
        <Provider store={store}>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Index/>}/>

                    <Route path="/mission" element={
                        <React.Suspense fallback={<Fallback/>}>
                            <Mission/>
                        </React.Suspense>
                    }/>

                    <Route path="/terms" element={
                        <React.Suspense fallback={<Fallback/>}>
                            <Terms/>
                        </React.Suspense>
                    }/>

                    <Route path="/privacy" element={
                        <React.Suspense fallback={<Fallback/>}>
                            <Privacy/>
                        </React.Suspense>
                    }/>

                    <Route path="/accessibility" element={
                        <React.Suspense fallback={<Fallback/>}>
                            <Accessibility/>
                        </React.Suspense>
                    }/>

                    <Route path="/maps" element={
                        <React.Suspense fallback={<Fallback/>}>
                            <App/>
                        </React.Suspense>
                    }/>

                    <Route path="/maps/embed" element={
                        <React.Suspense fallback={<Fallback/>}>
                            <AppEmbed/>
                        </React.Suspense>
                    }/>

                </Routes>
            </BrowserRouter>
        </Provider>
    </React.StrictMode>,
    document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
