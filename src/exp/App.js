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

    // componentDidMount() {
    //
    //     const load = url => {
    //         return new Promise(res => {
    //             const img = new Image();
    //
    //             // we disable cache for demo
    //             img.src = url + '?r=' + Math.random();
    //
    //             // further wait for the decoding
    //             img.onload = (evt) => {
    //                 console.log("img.naturalWidth = " + img.naturalWidth +
    //                     ", img.naturalHeight = " + img.naturalHeight);
    //                 img.decode().then(() => res(img));
    //             };
    //         });
    //     }
    //
    //
    //     let thisRef = this;
    //
    //
    //     const getImgs = imgs => {
    //         const promises = imgs.map(async url => {
    //             const image = await load(url);
    //             console.log("map.promise");
    //
    //             thisRef.setState({
    //                 ...thisRef.state,
    //                 div: <div className={"photo"} style={{backgroundImage: `url(${image.src})`}} />,
    //                 loaded: true});
    //
    //         });
    //         return Promise.all(promises);
    //     }
    //
    //     getImgs([img1]).then(() => {
    //         console.log("then() callback");
    //     });
    // }

    render() {

        return (
            <div style={{
                width: "100%",
                height: "100%",
                background: "green"
            }}>
                <AsyncImage src={img1} />
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