import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';

import App from "./App";
import './index.css'


import textData from "./TextData";


console.log(textData.menuAboutMe());


const initialState = {
    helloScreen: true,
    galleryMode: false,
    focused: false,
    aboutMe: false,
    socialOpen: false,
    contactDialogOpen: false,
    lang: 0
};


function reducer(state = initialState, action) {

    // TODO: switch - case
    if(action.type === "POLAROID_FOCUSED") {
        return {...state, focused: true};
    }
    else if (action.type === "POLAROID_UNFOCUSED") {
        return {...state, focused: false};
    }
    if(action.type === "GALLERY_FOCUSED") {
        return {...state, focused: true};
    }
    else if (action.type === "GALLERY_UNFOCUSED") {
        return {...state, focused: false};
    }

    else if (action.type === "ABOUT_DIALOG_OPEN") {
        // // console.log("[reducer()] ABOUT_DIALOG_OPEN");
        return {...state, aboutMe: true};
    }
    else if (action.type === "ABOUT_DIALOG_CLOSE") {
        // // console.log("[reducer()] ABOUT_DIALOG_CLOSE");
        return {...state, aboutMe: false};
    }

    else if (action.type === "SOCIAL_DIALOG_OPEN") {
        // // console.log("[reducer()] SOCIAL_DIALOG_OPEN");
        return {...state, socialOpen: true};
    }
    else if (action.type === "SOCIAL_DIALOG_CLOSE") {
        // // console.log("[reducer()] SOCIAL_DIALOG_CLOSE");
        return {...state, socialOpen: false};
    }


    else if (action.type === "CONTACT_DIALOG_OPEN") {
        // // console.log("[reducer()] CONTACT_DIALOG_OPEN");
        return {...state, contactDialogOpen: true};
    }
    else if (action.type === "CONTACT_DIALOG_CLOSE") {
        // // console.log("[reducer()] CONTACT_DIALOG_CLOSE");
        return {...state, contactDialogOpen: false};
    }


    else if (action.type === "GALLERY_MODE_ON") {
        // // console.log("[reducer()] GALLERY_MODE_ON");
        return {...state, galleryMode: true};
    }
    else if (action.type === "GALLERY_MODE_OFF") {
        // // console.log("[reducer()] GALLERY_MODE_OFF");
        return {...state, galleryMode: false};
    }

    else if (action.type === "HELLOSCREEN_HIDDEN") {
        return {...state, helloScreen: false};
    }

    else if (action.type === "LANG") {
        textData.switch();
        return {...state, lang: textData.lang};
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
        </div>
    </Provider>,
root);