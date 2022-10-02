import React, {Component} from 'react';
import {connect} from "react-redux";
import "./App.css";

import Polaroid from "./Polaroid";

import portraitExample from './../../resources/images/portrait.jpg';
import portraitExample2 from './../../resources/images/portrait2.jpg';
import cameraImage from './../../resources/images/round_lense.png';
import room from "../../resources/images/room.jpg";

// this is a ratio meaning that per each 100px
// scroll the object will rotate on 180degrees
const deg2px = 180 / 2000;
const scale2px = 1.0 / 3000;

const fixedDegAdded = 36;
const fixedScaleAdded = 0.2;
const transitionTime = "850ms";

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            angle: 0,
            scale: 1.0,
            menuClass: "top-menu-holder wide-menu",
            cameraClass: "camera-view",
            cameraEnabled: true
        };
        this.locked = false;
    }


    componentDidMount() {
        window.addEventListener('wheel', this.handleScroll);
    }


    handleScroll = (event) => {

        if (this.locked) {
            console.log("LOCKED");
            return;
        }

        // if delta-time between two calls of this function gt delta_time_threshold -
        // we count it as a continuous scroll

        console.log("Scrolling inside component: deltaY", event.deltaY);
        let scrollAmount = event.deltaY;
        let addedAngle = deg2px * scrollAmount;
        let addedScale = scale2px * scrollAmount;
        console.log(`
            scrollAmount = ${scrollAmount},
            addedAngle = ${addedAngle},
            addedScale = ${addedScale}`);

        // console.log("this.state.angle = " + this.state.angle);

        let angle = 0;
        let scale = 0;
        if (scrollAmount > 0) {
            angle = this.state.angle + fixedDegAdded;
            scale = this.state.scale + fixedScaleAdded;
        }
        else {
            angle = this.state.angle - fixedDegAdded;
            scale = this.state.scale - fixedScaleAdded;
        }

        let menuClass = this.state.menuClass;
        let cameraClass = this.state.cameraClass;
        let cameraEnabled = this.state.cameraEnabled;

        // prevent from decreasing
        if (scale <= 1.0)
            scale = 1.0;

        if (scale >= 1.3) {
            menuClass = "top-menu-holder";
            // cameraClass += " invisible";
        }
        else if (scale < 1.3) {
            menuClass = menuClass + " wide-menu";
            // cameraClass = cameraClass.replace("invisible", "");
        }

        // cameraEnabled = scale < 2.0;
        // console.log(`scale = ${scale}, cameraEnabled = ${cameraEnabled}`);

        if (scale >= 2.0) {
            cameraClass += " camera-view-zooming";
        }
        else {
            cameraClass = cameraClass.replace(" camera-view-zooming", "");

            // TODO: также сделать display: none чтобы элемент не мешал эвентам?
        }


        this.setState({
            angle: angle,
            scale: scale,
            menuClass: menuClass,
            cameraClass: cameraClass,
            cameraEnabled: cameraEnabled
        });

        // adds cooldown to the scrolling event
        this.locked = true;
        let thisRef = this;
        setTimeout(function() {
            thisRef.locked = false;
            console.log("UNLOCKED");
        }, 750);            // timeout in ms
    }


    removeOverlay() {
        console.log("overlayRemove()");
        this.props.onPolaroidUnfocus();
    }


    render() {

        console.log("App.js render()");
        console.log("App.js store", this.props.storeData.focused);

        let overlayOpacity = 0.0;
        let polaroidScale = this.state.scale;
        let polaroidTranslateUp = 0;
        if (this.props.storeData.focused) {
            overlayOpacity = 1.0;
            polaroidScale = 1.1;
            polaroidTranslateUp = 80;       // when polaroid is focused lift it up a bit
        }

        return (
            <div className={"main"}>

                <div className={this.state.menuClass}>
                    <div className={"menu-item"}>
                        <p>
                            <a href={"https://google.com"}>
                                <span>ABOUT ME</span>
                            </a>
                        </p>
                    </div>
                    <div className={"menu-item"}>
                        <p>
                            <a href={"https://google.com"}>
                                <span>SOCIALS</span>
                            </a>
                        </p>
                    </div>
                    <div className={"menu-item"}>
                        <p>
                            <a href={"https://google.com"}>
                                <span>CONTACT</span>
                            </a>
                        </p>
                    </div>
                </div>


                <div className={this.state.cameraClass}>
                    <img
                        style={{
                            transition: `${transitionTime} ease`,
                            transform: `rotate(${this.state.angle}deg) scale(${this.state.scale})`,
                        }}
                        src={cameraImage}
                        alt={"camera-lenses"}
                        id={"rot-camera-image"}>
                    </img>

                    <div className={"overlay"}
                         onClick={() => this.removeOverlay()}
                         style={{
                             opacity: overlayOpacity
                    }}></div>

                    <Polaroid
                        style={{
                            transition: `${transitionTime} ease`,
                            transform: `scale(${polaroidScale}) translate(${0}px, ${-polaroidTranslateUp}px)`
                        }}
                        src={room}
                        alt={""} />
                </div>

                <div className={"gallery"} />

            </div>
        );
    }
}

export default connect(
    state => ({
        storeData: state
    }),
    dispatch => ({
        onPolaroidUnfocus: (values) => {
            dispatch({type: 'POLAROID_UNFOCUSED', values: values});
        }
    })
)(App);