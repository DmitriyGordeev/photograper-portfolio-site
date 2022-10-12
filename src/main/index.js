import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';

import App from "./App";
import './index.css'




document.addEventListener("wheel", (event) => {
    // event.preventDefault();
    // event.stopPropagation();
    // now define custom functionality

    // console.log("event.deltaX = " + event.deltaX, " | event.deltaY = ", event.deltaY);

}, { passive: false });




const initialState = {};

function reducer(state = initialState, action) {

    console.log("[reducer()] STORE:", state);

    // TODO: switch - case
    if(action.type === "POLAROID_FOCUSED") {
        console.log("[reducer()] POLAROID_FOCUSED");
        return {...state, focused: true};
    }
    else if (action.type === "POLAROID_UNFOCUSED") {
        console.log("[reducer()] POLAROID_UNFOCUSED");
        return {...state, focused: false};
    }
    if(action.type === "GALLERY_FOCUSED") {
        console.log("[reducer()] GALLERY_FOCUSED imgIndex = " + action.imgIndex);
        return {...state, focused: true};
    }
    else if (action.type === "GALLERY_UNFOCUSED") {
        console.log("[reducer()] GALLERY_UNFOCUSED");
        return {...state, focused: false};
    }
    else if (action.type === "ABOUT_DIALOG_OPEN") {
        console.log("[reducer()] ABOUT_DIALOG_OPEN");
        return {...state, aboutMe: true};
    }
    else if (action.type === "ABOUT_DIALOG_CLOSE") {
        console.log("[reducer()] ABOUT_DIALOG_CLOSE");
        return {...state, aboutMe: false};
    }

    return state;
}

const store = createStore(reducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

const root = document.getElementById('app');
ReactDOM.render(
    <Provider store={store}>
        <div style={{width: "100%", height: "100%"}}>
            <App />
            {/*<img src={cameraImage} alt={"camera-lenses"} className={"aspect-ratio"} />*/}
        </div>
    </Provider>,
root);