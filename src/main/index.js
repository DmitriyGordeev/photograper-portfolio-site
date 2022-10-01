import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';

import App from "./App";
import './index.css'




document.addEventListener("wheel", (event) => {
    event.preventDefault();
    // event.stopPropagation();
    // now define custom functionality

    console.log("event.deltaX = " + event.deltaX, " | event.deltaY = ", event.deltaY);

}, { passive: false });




const initialState = {};

function reducer(state = initialState, action) {

    console.log("STORE:", state);

    if(action.type === "UPDATE_VALUES") {
        console.log("[reducer()]: UPDATE_VALUES");
        return {...state, values: action.values};
    }
    return state;
}

const store = createStore(reducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

const root = document.getElementById('app');
ReactDOM.render(
    <Provider store={store}>
        <div>
            <App />
            {/*<img src={cameraImage} alt={"camera-lenses"} className={"aspect-ratio"} />*/}
        </div>
    </Provider>,
root);