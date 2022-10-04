import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';

import './index.css'
import Polaroid from "../main/Polaroid";
import portraitExample2 from "../../resources/images/portrait2.jpg";
import portraitExample from "../../resources/images/portrait.jpg";
import room from "../../resources/images/room.jpg";

import App from "./App.js";


const initialState = {};

function reducer(state = initialState, action) {

    console.log("[reducer()] STORE:", state);

    if(action.type === "POLAROID_FOCUSED") {
        console.log("[reducer()] POLAROID_FOCUSED");
        return {...state, focused: true};
    }
    else if (action.type === "POLAROID_UNFOCUSED") {
        console.log("[reducer()] POLAROID_UNFOCUSED");
        return {...state, focused: false};
    }
    return state;
}

const store = createStore(reducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

const root = document.getElementById('app');
ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
root);