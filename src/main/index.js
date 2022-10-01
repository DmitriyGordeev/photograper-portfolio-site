import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';

// import App from "./App";
import './index.css'
import portraitImage from './../../resources/images/rafaella-mendes-diniz-et_78QkMMQs-unsplash.jpg';


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
            <img src={portraitImage} alt={"portrait"} className={"aspect-ratio"} />
        </div>
    </Provider>,
root);