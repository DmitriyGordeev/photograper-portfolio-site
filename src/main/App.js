import React, {Component} from 'react';
import {connect} from "react-redux";
import "./App.css";
import "./about.css";
import './socials.css';
import './contact.css';
import './texts.css';

import Polaroid from "./Polaroid";
import MenuVert from "./MenuVert";
import Gallery from "./Gallery";
import HelloScreen from "./HelloScreen";

import portraitExample from './../../resources/images/portrait.jpg';
import portraitExample2 from './../../resources/images/portrait2.jpg';
import cameraImageSvg from './../../resources/images/camera-lense4.svg';
import room from "../../resources/images/room.jpg";
import closeButton from "../../resources/images/close.svg";
import instagramIcon from "../../resources/images/instagram_icon.svg";
import vkIcon from "../../resources/images/vk_icon.svg";


const fixedDegAdded = 36;
const fixedScaleAdded = 0.2;
const transitionTime = "850ms";


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
    socialsOn: false
};


class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = state0;
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

        // // console.log("Component Did Mount");
    }


    componentDidUpdate(prevProps) {
        // // Typical usage (don't forget to compare props):
        // if (this.props.userID !== prevProps.userID) {
        //     this.fetchData(this.props.userID);
        // }


        if (!this.state.galleryMode && this.props.storeData.galleryMode) {
            this.setState({...this.state,
                galleryMode: true,
                angle: 0,
                scale: 1.0,
                cameraClass: this.state.cameraClass + " camera-view-zooming",
                active_polaroid_index: images.length - 1});
        }
        else if (this.state.galleryMode && !this.props.storeData.galleryMode) {
            this.setState(state0);
        }
    }


    handleScroll = (event) => {

        if (this.props.storeData.galleryMode) {
            return;
        }

        if (this.locked) {
            return;
        }

        // // console.log("Scrolling inside component: deltaY", event.deltaY);
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
        // // console.log("overlayRemove()");
        this.props.onPolaroidUnfocus();
    }


    updatePolaroids(polaroidScale, polaroidTranslateUp) {
        if (this.props.storeData.galleryMode) {
            return [];
        }

        // // console.log(`active_polaroid_index = ${this.state.active_polaroid_index}`);
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


    stopClickPropagation(e) {
        e.stopPropagation();
    }


    resetValuesOnBack() {
        // let cameraClass = this.state.cameraClass.replace(" camera-view-zooming", "");
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

        let camContainerWidth = 450;
        if (this.props.storeData.focused) {

            // change overlay's opacity to 1.0 (make it visible)
            // and size to 100% of the screen
            overlayOpacity = 1.0;
            overlayHeight = "160vh";

            // change polaroid scale to const 1.0
            polaroidScale = 1.2;
            polaroidTranslateUp = 30;       // when polaroid is focused lift it up a bit
        }


        let aboutPos = "100vw";
        // let aboutPos = window.innerWidth;
        if (this.props.storeData.aboutMe) {
            aboutPos = `calc(100vw - ${this.state.aboutDialogWidth}px)`;
            // aboutPos = window.innerWidth - this.state.aboutDialogWidth;
        }

        // adjusting sizes for `AboutMe` in case it's mobile device
        let aboutMeDialogWidth = document.body.clientWidth * 0.6;
        let aboutMeDialogHeight = document.body.clientHeight;
        if (document.body.clientWidth <= 480) {
            aboutMeDialogWidth = document.body.clientWidth;
        }


        // TODO: remove 100vh
        // let socialsTopPos = "100vh";
        let socialsTopPos = window.innerHeight;
        if (this.props.storeData.socialOpen) {
            socialsTopPos = 0;
        }

        let contactBottomPos = window.innerHeight;
        // let contactBottomPos = 1467;
        if (this.props.storeData.contactDialogOpen) {
            contactBottomPos = window.innerHeight - document.body.clientHeight;
        }

        console.log("this.props.storeData.contactDialogOpen = " + this.props.storeData.contactDialogOpen);
        console.log(`document.body.clientHeight = ${document.body.clientHeight}`);
        console.log(`window.innerHeight = ${window.innerHeight}`);




        // Mobile -----------------------------------------------------------------------
        let sideMenuContainerWidth = "100%";
        console.log("window.innerWidth = " + window.innerWidth);
        console.log("window.screen.width = " + window.screen.width);

        let cameraViewContainerHeight = "100%";
        if (window.screen.width <= 480) {
            sideMenuContainerWidth = '30%';
            cameraViewContainerHeight = '70%';
            camContainerWidth = window.screen.width * 0.6;

            if (this.props.storeData.focused) {
                polaroidScale += 0.5;
            }
        }

        console.log(`sideMenuContainerWidth = ${sideMenuContainerWidth}`);

        return (
            <div className={"main"}>

                {/* MENU ----------------------------------------- */}
                <div className={"side-menu-container"} style={{
                    // height: this.props.storeData.galleryMode ? "fit-content" : "100%",
                    height: this.props.storeData.galleryMode ? "fit-content" : sideMenuContainerWidth,
                }}>
                    <MenuVert/>
                </div>


                {/* CAMERA VIEW ------------------------------------*/}
                <div className={"camera-view-container"} style={{
                    // height: this.props.storeData.galleryMode ? 0 : "100%",
                    height: this.props.storeData.galleryMode ? 0 : cameraViewContainerHeight,
                }}>
                    <div className={this.state.cameraClass}>

                        <div className={"camera-container"} style={{
                            width: camContainerWidth * this.state.scale,
                            height: camContainerWidth + camContainerWidth * (this.state.scale - 1) * 0.3,
                        }}>

                            <div id={"round-point"} onClick={() => {}}/>

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


                {/* GALLERY VIEW ------------------------------------*/}
                <div className={"gallery-side"}>
                    <Gallery opacity={this.props.storeData.galleryMode ? 1.0 : 0.0} />
                </div>


                {/* 'ABOUT ME' DIALOG ------------------------------------*/}
                <div ref={this.aboutRef}
                     className={"about-dialog"}
                     style={{left: aboutPos, width: aboutMeDialogWidth, height: aboutMeDialogHeight }}>

                    <div className={"header-bar"}>
                        <div id={"about-close-button"} onClick={() => {this.props.closeAboutDialog()}}>
                            <img src={closeButton} alt={""}/>
                        </div>
                    </div>

                    <div id={"about-content-wrapper"}>
                        <div id={"about-top-block"}>
                            <p>About Me</p><br/>
                            <div style={{margin: "0 auto", width: "fit-content"}}>
                                <div className={"about-photo-wrapper"}>
                                    <img src={portraitExample2} alt={""}/>
                                </div>
                            </div>
                        </div>
                        <div id={"about-bottom-block"}>
                            <br/><p style={{fontSize: 19, textAlign: "center", color: "white"}}>HI, MY NAME IS </p>

                            {/* TODO: текстовые элементы появляются постепенно (но только впервый раз?) */}

                            <p>I'M A PROFESSIONAL PHOTOGRAPHER AND VIDEO EDITOR.
                                I TRAVEL AROUND THE WORLD AND CAPTURE MOMENTS TO SHARE WITH EVERYONE</p>

                            <div className={"write-me-button"}
                                 onClick={() => {this.props.openContactDialog()}}>
                                WRITE ME
                            </div><br/>
                            <p className={"about-socials"}>Or, You can also find me here</p>
                            <div className={"socials-stroke"}>
                                <div><img src={instagramIcon} alt={"instagram_icon"}/></div>
                                <div><img src={vkIcon} alt={"instagram_icon"}/></div>
                            </div>
                        </div>
                    </div>
                </div>


                <div className={"socials-dialog"}
                     style={{top: socialsTopPos}}
                     onClick={() => {this.props.closeSocialDialog()}}>
                    <div onClick={(e) => {this.stopClickPropagation(e)}}>
                        <p style={{marginTop: 20, marginBottom: 20}}>MY SOCIALS</p>

                        <div className={"socials-item"}>
                            <div>
                                <p>Instagram</p>
                            </div>
                        </div>

                        <div className={"socials-item"}>
                            <div>
                                <p>VK</p>
                            </div>
                        </div>

                    </div>
                </div>


                {/*<div style={{bottom: contactBottomPos}} className={"test-box"} />*/}


                <div className={"contact-dialog-overlay"}
                     style={{
                         bottom: contactBottomPos,
                         width: document.body.clientWidth,
                         height: document.body.clientHeight}}
                     onClick={() => {this.props.closeContactDialog()}}>

                    <div id={"contact-dialog"}
                         onClick={(e) => {this.stopClickPropagation(e)}}>

                        <p>WRITE ME</p>
                        <div>
                            <input type="email" id="email" placeholder={"your email"}
                                   size="30" required />
                        </div>
                        <div>
                            <textarea rows={5} id={"message"} placeholder={"Your message"} required />
                        </div>

                        <input id={"submit"} type={"submit"} value={"SEND"} />

                        <p id={"plain-email"}>
                            <span>or you can copy my email</span><br/>
                            <span>email@email.com</span>
                        </p>
                    </div>
                </div>

                <HelloScreen />

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
        },
        closeSocialDialog: (values) => {
            dispatch({type: 'SOCIAL_DIALOG_CLOSE'});
        },
        openContactDialog: (values) => {
            dispatch({type: 'CONTACT_DIALOG_OPEN'});
        },
        closeContactDialog: (values) => {
            dispatch({type: 'CONTACT_DIALOG_CLOSE'});
        },
        galleryOn: (values) => {
            dispatch({type: 'GALLERY_MODE_ON'});
        }
    })
)(App);