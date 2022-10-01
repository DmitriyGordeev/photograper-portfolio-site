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
                <div id={"top-menu-holder"}>
                    <div className={"menu-item"}>
                        <p>
                            <a href={"https://google.com"}>
                                <span>About me</span>
                            </a>
                        </p>
                    </div>
                    <div className={"menu-item"}>
                        <p>
                            <a href={"https://google.com"}>
                                <span>Socials</span>
                            </a>
                        </p>
                    </div>
                    <div className={"menu-item"}>
                        <p>
                            <a href={"https://google.com"}>
                                <span>Contact</span>
                            </a>
                        </p>
                    </div>
                </div>
                <img src={cameraImage} alt={"camera-lenses"} className={"aspect-ratio"}/>
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