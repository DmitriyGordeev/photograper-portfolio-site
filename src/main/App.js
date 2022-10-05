import React, {Component} from 'react';
import {connect} from "react-redux";
import "./App.css";

import Polaroid from "./Polaroid";
import Menu from './Menu';

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


const images = [
    portraitExample,
    portraitExample2,
    room
];


class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            angle: 0,
            scale: 1.0,
            menuClass: "top-menu-holder wide-menu",
            cameraClass: "camera-view",
            cameraEnabled: true,
            active_polaroid_index: images.length - 1
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

        console.log("Scrolling inside component: deltaY", event.deltaY);
        let scrollAmount = event.deltaY;
        let addedAngle = deg2px * scrollAmount;
        let addedScale = scale2px * scrollAmount;
        console.log(`
            scrollAmount = ${scrollAmount},
            addedAngle = ${addedAngle},
            addedScale = ${addedScale}`);

        console.log("this.state.angle = " + this.state.angle);

        let angle = 0;
        let scale = 0;
        let active_polaroid_index = this.state.active_polaroid_index;
        if (scrollAmount > 0) {
            angle = this.state.angle + fixedDegAdded;
            scale = this.state.scale + fixedScaleAdded;
            active_polaroid_index -= 1;
        } else {
            angle = this.state.angle - fixedDegAdded;
            scale = this.state.scale - fixedScaleAdded;
            active_polaroid_index += 1;
        }


        // if (active_polaroid_index < 0) {
        //     active_polaroid_index = 0;
        // }
        if (active_polaroid_index >= images.length) {
            active_polaroid_index = images.length - 1;
        }


        let menuClass = this.state.menuClass;
        let cameraClass = this.state.cameraClass;
        let cameraEnabled = this.state.cameraEnabled;

        // prevent from decreasing
        if (scale <= 1.0)
            scale = 1.0;

        if (angle <= 0) {
            angle = 0;
        }

        if (scale >= 1.3) {
            menuClass = "top-menu-holder";
        } else if (scale < 1.3) {
            menuClass = menuClass + " wide-menu";
        }

        console.log(`scale = ${scale}, cameraEnabled = ${cameraEnabled}`);

        // when there is no images left on the camera-view we navigate to the gallery
        if (active_polaroid_index < 0) {
            cameraClass += " camera-view-zooming";
        } else {
            cameraClass = cameraClass.replace(" camera-view-zooming", "");
        }

        console.log("Active polaroid index = " + active_polaroid_index);

        this.setState({
            angle: angle,
            scale: scale,
            menuClass: menuClass,
            cameraClass: cameraClass,
            cameraEnabled: cameraEnabled,
            active_polaroid_index: active_polaroid_index
        });

        // adds cooldown to the scrolling event
        this.locked = true;
        let thisRef = this;
        setTimeout(function () {
            thisRef.locked = false;
            console.log("UNLOCKED");
        }, 750);            // timeout in ms
    }


    removeOverlay() {
        console.log("overlayRemove()");
        this.props.onPolaroidUnfocus();
    }


    updatePolaroids(polaroidScale, polaroidTranslateUp) {
        console.log(`active_polaroid_index = ${this.state.active_polaroid_index}`);
        let out = [];
        for (let i = 0; i < images.length; i++) {
            let opacity = 0.0;
            if (i === this.state.active_polaroid_index)
                opacity = 1.0;
            out.push(
                <Polaroid
                    key={i}
                    style={{
                        opacity: opacity,
                        transition: `${transitionTime} ease`,
                        transform: `
                                scale(${polaroidScale}) 
                                translate(${0}px, ${-polaroidTranslateUp}px)`
                    }}
                    src={images[i]}
                    alt={""}/>
            );
        }
        return out;
    }


    render() {

        let overlayOpacity = 1.0;
        let overlayHeight = 0;
        let polaroidScale = this.state.scale;
        let polaroidTranslateUp = 0;
        if (this.props.storeData.focused) {

            // change overlay's opacity to 1.0 (make it visible)
            // and size to 100% of the screen
            overlayOpacity = 1.0;
            overlayHeight = "100%";

            // change polaroid scale to const 1.0
            polaroidScale = 1.2;
            polaroidTranslateUp = 30;       // when polaroid is focused lift it up a bit
        }

        return (
            <div className={"main"}>

                <Menu />

                {/*<div className={this.state.menuClass}>*/}
                {/*    <div className={"menu-item"}>*/}
                {/*        <p>*/}
                {/*            <a href={"https://google.com"}>*/}
                {/*                <span>ABOUT ME</span>*/}
                {/*            </a>*/}
                {/*        </p>*/}
                {/*    </div>*/}
                {/*    <div className={"menu-item"}>*/}
                {/*        <p>*/}
                {/*            <a href={"https://google.com"}>*/}
                {/*                <span>SOCIALS</span>*/}
                {/*            </a>*/}
                {/*        </p>*/}
                {/*    </div>*/}
                {/*    <div className={"menu-item"}>*/}
                {/*        <p>*/}
                {/*            <a href={"https://google.com"}>*/}
                {/*                <span>CONTACT</span>*/}
                {/*            </a>*/}
                {/*        </p>*/}
                {/*    </div>*/}
                {/*</div>*/}


                <div className={this.state.cameraClass}>
                    <div className={"camera-background"}
                         style={{
                             backgroundImage: "url(" + cameraImage + ")",
                             transition: `${transitionTime} ease`,
                             transform: `rotate(${this.state.angle}deg) scale(${this.state.scale})`
                         }}>
                    </div>

                    <div className={"overlay"}
                         onClick={() => this.removeOverlay()}
                         style={{
                             opacity: overlayOpacity,
                             height: overlayHeight
                         }}></div>

                    {this.updatePolaroids(polaroidScale, polaroidTranslateUp)}

                </div>

                <div className={"gallery"}/>

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