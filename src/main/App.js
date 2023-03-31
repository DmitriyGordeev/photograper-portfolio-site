import React, {Component} from 'react';
import {connect} from "react-redux";
import "./App.css";
import './texts.css';
import './GalleryLabel.css';

import Polaroid from "./Polaroid";
import MenuVert from "./MenuVert";
import Gallery from "./Gallery";
import HelloScreen from "./HelloScreen";

import portraitExample from './../../resources/images/portrait.jpg';
import portraitExample2 from './../../resources/images/portrait2.jpg';
import cameraImageSvg from './../../resources/images/camera-lense12.svg';
import room from "../../resources/images/room.jpg";

import jquery from 'jquery';
import AboutDialog from "./AboutDialog";
import SocialsDialog from "./SocialsDialog";
import ContactDialog from "./ContactDialog";
import textData from "./TextData";

const fixedDegAdded = 36;
const fixedScaleAdded = 0.2;
const transitionTime = "650ms";


const images = [
    portraitExample,
    portraitExample2,
    room
];

let state0 = {
    angle: 0,
    scale: 1.0,
    cameraClass: "camera-view",
    cameraEnabled: true,
    active_polaroid_index: images.length - 1,
    galleryOpacity: 0.0,
    galleryMode: false,
    galleryLabelClass: "gallery-label "
};


class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = state0;
        this.locked = false;
        this.touchMovePrevY = 0;
    }


    componentDidUpdate(prevProps, prevState, snapshot) {
        if(!this.props.storeData.helloScreen) {
            this.assignScrollingEvents();
        }

        if (!this.state.galleryMode && this.props.storeData.galleryMode) {
            this.setState({...this.state,
                galleryMode: true,
                angle: 0,
                scale: 1.0,
                galleryLabelClass: this.state.galleryLabelClass + " label-small",
                cameraClass: this.state.cameraClass + " camera-view-zooming",
                active_polaroid_index: images.length - 1});
        }
        else if (this.state.galleryMode && !this.props.storeData.galleryMode) {
            this.setState(state0);
        }
    }


    assignScrollingEvents() {
        window.addEventListener('wheel', this.handleScroll);
        window.addEventListener('touchmove', this.handleTouchMove);
        window.addEventListener('touchend', () => { this.touchMovePrevY = 0; });
    }


    handleScroll = (event) => {
        if (this.props.storeData.galleryMode) {
            return;
        }
        if (this.locked) {
            return;
        }
        this.scrollDelegate(event.deltaY);
    }


    handleTouchMove = (event) =>  {
        if (this.props.storeData.galleryMode) {
            return;
        }
        if (this.locked) {
            return;
        }
        if (event.touches.length === 1) {
            let touchMoveYAmount = 0;
            if (this.touchMovePrevY !== 0)
                touchMoveYAmount = event.touches[0].clientY - this.touchMovePrevY;
            this.touchMovePrevY = event.touches[0].clientY;
            this.scrollDelegate(-touchMoveYAmount);
        }
    }


    scrollDelegate(scrollAmount) {
        let angle = 0;
        let scale = 0;
        let active_polaroid_index = this.state.active_polaroid_index;

        if (scrollAmount === 0)
            return;

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

        // let menuClass = this.state.menuClass;
        let cameraClass = this.state.cameraClass;
        let cameraEnabled = this.state.cameraEnabled;

        // prevent from decreasing
        if (scale <= 1.0)
            scale = 1.0;

        if (angle <= 0) {
            angle = 0;
        }

        // when there is no images left on the camera-view we navigate to the gallery
        if (active_polaroid_index < 0) {
            cameraClass += " camera-view-zooming";
            this.props.galleryOn();
        }

        this.setState({
            angle: angle,
            scale: scale,
            cameraClass: cameraClass,
            cameraEnabled: cameraEnabled,
            active_polaroid_index: active_polaroid_index,
        });

        // adds cooldown to the scrolling event
        this.locked = true;
        let thisRef = this;
        setTimeout(function () {
            thisRef.locked = false;
        }, 750);            // timeout in ms
    }


    removeOverlay() {
        this.props.onPolaroidUnfocus();
    }


    updatePolaroids(polaroidScale, polaroidTranslateUp) {
        if (this.props.storeData.galleryMode) {
            return [];
        }

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





    resetValuesOnBack() {
        this.setState({...this.state,
            angle: 0,
            scale: 1.0,
            active_polaroid_index: images.length - 1,
            cameraClass: cameraClass,
            galleryMode: false});
    }



    render() {
        let overlayOpacity = 1.0;
        let overlayHeight = 0;
        let polaroidScale = this.state.scale;
        let polaroidTranslateUp = 0;
        let camContainerWidth = 550;
        if (this.props.storeData.focused) {
            // change overlay's opacity to 1.0 (make it visible)
            overlayOpacity = 1.0;
            overlayHeight = window.innerHeight * 1.55;

            // change polaroid scale to const 1.0
            // polaroidScale = 1.2;
            polaroidScale = 2.0;
            polaroidTranslateUp = 30;       // when polaroid is focused lift it up a bit
        }


        // Mobile screen adjustments ----------------
        let sideMenuContainerWidth = "100%";
        let cameraViewContainerHeight = "100%";
        let cameraViewContainerTopOffset = 0;
        if (window.screen.width <= 900) {
            sideMenuContainerWidth = '30%';
            cameraViewContainerHeight = '70%';
            camContainerWidth = window.screen.width * 0.55;

            if (window.screen.width <= 480) {
                camContainerWidth = window.screen.width * 0.6;
            }

            if (this.props.storeData.focused) {
                polaroidScale = this.state.scale + 0.8;
                if (window.screen.width <= 480) {
                    polaroidTranslateUp = 60;
                    overlayHeight = window.innerHeight;
                }
            }
        }
        if (window.screen.height <= 600) {
            cameraViewContainerTopOffset = '5%';
            cameraViewContainerHeight = '65%';
        }



        return (
            <div className={"main"}>

                {/* MENU ----------------------------------------- */}
                <div className={"side-menu-container"} style={{
                    height: this.props.storeData.galleryMode ? "fit-content" : sideMenuContainerWidth,
                }}>
                    <MenuVert/>
                </div>


                {/* Camera view  ------------------------------------*/}
                <div className={"camera-view-container"} style={{
                    top: cameraViewContainerTopOffset,
                    height: this.props.storeData.galleryMode ? 0 : cameraViewContainerHeight,
                }}>
                    <div className={this.state.cameraClass}>

                        <div className={"camera-container"} style={{
                            width: camContainerWidth + camContainerWidth * (this.state.scale - 1) * 0.5,
                            height: camContainerWidth + camContainerWidth * (this.state.scale - 1) * 0.5
                        }}>

                            <div id={"round-point"}/>

                            <div className={"camera-background"}
                                 style={{
                                     backgroundImage: "url(" + cameraImageSvg + ")",
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

                            <Polaroid style={{
                                opacity: 1.0,
                                transition: `${transitionTime} ease`,
                                transform: `scale(${polaroidScale}) translate(${0}px, ${-polaroidTranslateUp}px)`
                            }} src={images[this.state.active_polaroid_index]}/>

                        </div>
                    </div>
                </div>


                {/* Gallery view ------------------------------------*/}
                <div className={"gallery-side"}>
                    <Gallery opacity={this.props.storeData.galleryMode ? 1.0 : 0.0} />
                </div>


                <AboutDialog />
                <SocialsDialog />
                <ContactDialog />
                <HelloScreen />

                <div className={"lang-button"} onClick={() => {this.props.switchLang()}}></div>

                {/* Red bar with the animation */}
                <div className={this.state.galleryLabelClass}>
                    <p>{textData.galleryLabel()}</p>
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
        openContactDialog: (values) => {
            dispatch({type: 'CONTACT_DIALOG_OPEN'});
        },
        galleryOn: (values) => {
            dispatch({type: 'GALLERY_MODE_ON'});
        },
        switchLang: () => {
            dispatch({type: 'LANG'});
        }

    })
)(App);