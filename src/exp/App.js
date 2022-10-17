import React, {Component} from 'react';
import {connect} from "react-redux";
import "./App.css";

import portraitExample from './../../resources/images/portrait.jpg';
import portraitExample2 from './../../resources/images/portrait2.jpg';
import cameraImage from './../../resources/images/round_lense.png';
import room from "../../resources/images/room.jpg";
import reflection from "../../resources/images/camera_reflection.png";
import img1 from "../../resources/images/img1.jpg";
import img2 from "../../resources/images/img2.jpg";
import img3 from "../../resources/images/img3.jpg";
import arrowUp from "../../resources/images/arrow_up.svg";


import AsyncImage from "./AsyncImage";


const images = [
    portraitExample,
    portraitExample2,
    room,
    reflection,
    img1,
    img2,
    img3
]


class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loaded: false,
        }
    }


    render() {

        return (
            <div style={{
                width: "100%",
                height: "100%",
                background: "green"
            }}>
                <AsyncImage size={300} src={img1} hfix={true} />
                <div className={"button"}/>
            </div>
        );
    }
}

export default connect(
    state => ({
        storeData: state
    }),
    dispatch => ({})
)(App);