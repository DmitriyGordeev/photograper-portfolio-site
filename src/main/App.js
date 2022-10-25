import React, {Component} from 'react';
import {connect} from "react-redux";
import "./App.css";
import "./about.css";
import './socials.css';
import './contact.css';
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
import closeButton from "../../resources/images/close.svg";
import instagramIcon from "../../resources/images/instagram_icon.svg";
import vkIcon from "../../resources/images/vk_icon.svg";

import jquery from 'jquery';

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
    socialsOn: false,
    galleryLabelClass: "gallery-label "
};


class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = state0;
        this.locked = false;
        this.aboutRef = React.createRef();
        this.touchMovePrevY = 0;
    }


    componentDidMount() {
        // this will define how wide is 'About Me' dialog window
        this.setState({
            ...this.state,
            aboutDialogWidth: this.aboutRef.current.offsetWidth
        });
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

        console.log(`scrollDelegate(${scrollAmount})`);

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


    sendEmail() {
        console.log("sendEmail click()");
        jquery.post(
            "./request.php",
            {"text": "HELLO THERE!"}
        ).done(
            function( data ) {
                console.log("POST RESPONSE:" + data);
                alert("RESPONSE data:" + data);
            }
        );
    }


    render() {

        let overlayOpacity = 1.0;
        let overlayHeight = 0;

        let polaroidScale = this.state.scale;
        let polaroidTranslateUp = 0;

        let camContainerWidth = 450;
        if (this.props.storeData.focused) {

            // change overlay's opacity to 1.0 (make it visible)
            overlayOpacity = 1.0;
            overlayHeight = window.innerHeight * 1.55;

            // change polaroid scale to const 1.0
            polaroidScale = 1.2;
            polaroidTranslateUp = 30;       // when polaroid is focused lift it up a bit
        }

        // TODO: vw -> to innerWidth
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

        let socialsTopPos = window.innerHeight;
        if (this.props.storeData.socialOpen) {
            socialsTopPos = 0;
        }

        let contactBottomPos = window.innerHeight;
        let contactTopPos = -window.innerHeight;
        if (this.props.storeData.contactDialogOpen) {
            contactBottomPos = window.innerHeight - document.body.clientHeight;
            contactTopPos = 0;
            // contactBottomPos = window.innerHeight;
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
                polaroidScale += 0.6;
                polaroidTranslateUp = 60;
                overlayHeight = window.innerHeight;
            }
        }

        // PADS -----------------------------------------------------------------------
        // todo: this is a duplicate with above
        if (window.screen.width > 480 && window.screen.width <= 900) {
            sideMenuContainerWidth = '30%';
            cameraViewContainerHeight = '70%';
            camContainerWidth = window.screen.width * 0.55;

            if (this.props.storeData.focused) {
                polaroidScale += 0.6;
            }
        }


        // gallery-label:
        if (this.props.storeData.galleryMode) {
            if (!this.state.galleryLabelClass.includes('label-small')) {
                this.setState({
                    ...this.state,
                    galleryLabelClass: this.state.galleryLabelClass + " label-small"
                })
            }
        }


        return (
            <div className={"main"}>

                {/* MENU ----------------------------------------- */}
                <div className={"side-menu-container"} style={{
                    height: this.props.storeData.galleryMode ? "fit-content" : sideMenuContainerWidth,
                }}>
                    <MenuVert/>
                </div>


                {/* CAMERA VIEW ------------------------------------*/}
                <div className={"camera-view-container"} style={{
                    height: this.props.storeData.galleryMode ? 0 : cameraViewContainerHeight,
                }}>
                    <div className={this.state.cameraClass}>

                        <div className={"camera-container"} style={{
                            // width: camContainerWidth * this.state.scale,
                            // height: camContainerWidth + camContainerWidth * (this.state.scale - 1) * 0.3,
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
                                <div><img src={instagramIcon} alt={"instagram_icon"} onClick={() => {
                                    window.open("https://google.com");
                                }}/></div>
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
                                <a  target="_blank" href={"https://google.com"}>Instagram</a>
                            </div>
                        </div>

                        <div className={"socials-item"}>
                            <div>
                                <a  target="_blank" href={"https://google.com"}>VK</a>
                            </div>
                        </div>

                    </div>
                </div>


                <div className={"contact-dialog-overlay"}
                     style={{
                         top: contactTopPos,
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

                        <input id={"submit"} type={"submit"} value={"SEND"} onClick={() => {this.sendEmail()}}/>

                        <p id={"plain-email"}>
                            <span>or you can copy my email</span><br/>
                            <span>email@email.com</span>
                        </p>
                    </div>
                </div>

                <HelloScreen />

                <div className={this.state.galleryLabelClass}>
                    <p>Gallery</p>
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