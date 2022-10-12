import React, {Component} from 'react';
import {connect} from "react-redux";
import "./App.css";

import Polaroid from "./Polaroid";
import MenuVert from "./MenuVert";
import Gallery from "./Gallery";

import portraitExample from './../../resources/images/portrait.jpg';
import portraitExample2 from './../../resources/images/portrait2.jpg';
import cameraImage from './../../resources/images/round_lense.png';
import room from "../../resources/images/room.jpg";
import manPhoto from "../../resources/images/man_photo.jpg";


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
            active_polaroid_index: images.length - 1,
            galleryOpacity: 0.0,
            galleryMode: false,
            borderWidth: 15,
            aboutDialogWidth: 0,
        };
        this.locked = false;
        this.aboutRef = React.createRef();
    }


    componentDidMount() {
        window.addEventListener('wheel', this.handleScroll);

        // this will define how wide is 'About Me' dialog window
        this.setState({
            ...this.state,
            aboutDialogWidth: this.aboutRef.current.offsetWidth
        });
    }


    handleScroll = (event) => {

        if (this.state.galleryMode) {
            return;
        }

        if (this.locked) {
            return;
        }

        console.log("Scrolling inside component: deltaY", event.deltaY);
        let scrollAmount = event.deltaY;
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

        // when there is no images left on the camera-view we navigate to the gallery
        let galleryMode = this.state.galleryMode;

        if (active_polaroid_index < 0) {
            cameraClass += " camera-view-zooming";
            galleryMode = true;
        } else {
            cameraClass = cameraClass.replace(" camera-view-zooming", "");
        }

        this.setState({
            angle: angle,
            scale: scale,
            menuClass: menuClass,
            cameraClass: cameraClass,
            cameraEnabled: cameraEnabled,
            active_polaroid_index: active_polaroid_index,
            // galleryOpacity: galleryOpacity,
            galleryMode: galleryMode,
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
        if (this.state.galleryMode) {
            return [];
        }

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

        let camContainerWidth = 450;
        if (this.props.storeData.focused) {

            // change overlay's opacity to 1.0 (make it visible)
            // and size to 100% of the screen
            overlayOpacity = 1.0;
            overlayHeight = "100%";

            // change polaroid scale to const 1.0
            polaroidScale = 1.2;
            polaroidTranslateUp = 30;       // when polaroid is focused lift it up a bit
        }


        let aboutPos = "100vw";
        console.log("this.props.storeData.aboutMe = " + this.props.storeData.aboutMe);
        if (this.props.storeData.aboutMe) {
            aboutPos = `calc(100vw - ${this.state.aboutDialogWidth}px)`;
        }


        return (
            <div className={"main"} >

                {/* MENU ----------------------------------------- */}
                <div className={"side-menu-container"} style={{
                    height: this.state.galleryMode ? "fit-content" : "100%",
                }}>
                    <MenuVert galleryMode={this.state.galleryMode}/>
                </div>


                {/* CAMERA VIEW ------------------------------------*/}
                <div className={"camera-view-container"} style={{
                    height: this.state.galleryMode ? 0 : "100%",
                }}>
                    <div className={this.state.cameraClass}>

                        <div className={"camera-container"} style={{
                            width: camContainerWidth * this.state.scale,
                            height: camContainerWidth + camContainerWidth * (this.state.scale - 1) * 0.3,
                            // background: this.state.scale > 1.0 ? "#1E4BA2" : "transparent"
                        }}>

                            <div id={"round-point"} onClick={() => {}}/>

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
                                 }}>
                            </div>

                            {this.updatePolaroids(polaroidScale, polaroidTranslateUp)}

                        </div>
                    </div>
                </div>


                {/* GALLERY VIEW ------------------------------------*/}
                <div className={"gallery-side"}>
                    <Gallery opacity={this.state.galleryMode ? 1.0 : 0.0} />
                    {/*<Gallery opacity={1.0} />*/}
                </div>


                {/* ABOUT DIALOG ------------------------------------*/}
                <div ref={this.aboutRef}
                     className={"about-dialog"}
                     style={{left: aboutPos}}>

                    <div style={{
                        background: "white",
                        width: 100,
                        height: 100,
                        marginTop: 10,
                        marginLeft: 10
                    }} onClick={() => {this.props.closeAboutDialog()}} />

                </div>


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
        },
        closeAboutDialog: (values) => {
            dispatch({type: 'ABOUT_DIALOG_CLOSE'});
        }
    })
)(App);