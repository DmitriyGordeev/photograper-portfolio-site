import React, {Component} from 'react';
import {connect} from "react-redux";
import "./App.css";

import cameraImage from './../../resources/images/camera.jpg';


class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <div className={"main"}>
                <img src={cameraImage} alt={"camera-lenses"} className={"aspect-ratio"} />
            </div>
        );
    }
}

export default connect(
    state => ({
        storeData: state
    }),
    dispatch => ({
        // onUpdateValues: (values) => {
        //     dispatch({ type: 'UPDATE_VALUES', values: values});
        // }
    })
)(App);