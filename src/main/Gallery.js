import React, {Component} from 'react';
import {connect} from 'react-redux';
import './Gallery.css';
import './texts.css';

import portraitExample from "../../resources/images/portrait.jpg";
import portraitExample2 from "../../resources/images/portrait2.jpg";
import room from "../../resources/images/room.jpg";
import reflection from "../../resources/images/camera_reflection.png";
import img1 from "../../resources/images/img1.jpg";
import img2 from "../../resources/images/img2.jpg";
import img3 from "../../resources/images/img3.jpg";

import arrowUp from "../../resources/images/arrow_up.svg";
import arrowDown from "../../resources/images/arrow_down.svg";

import overlayArrowPrev from "../../resources/images/overlay_arrow_prev.svg";
import overlayArrowNext from "../../resources/images/overlay_arrow_next.svg";


import AsyncImage from "./AsyncImage";

const angleOffsetDeg = 16;     // in degrees

const btnRotSpeed = 1.0;
const numMaxImages = 3;    // how many images rolling gallery can show at the same time


const images = [
    portraitExample,
    portraitExample2,
    room,
    reflection,
    img1,
    img2,
    img3
]

let startIndex = 0;
let scrollDirection = 0;
let galleryCardSize = 220;
if (window.screen.height < 600) {
    galleryCardSize = 180;
}
else if (window.screen.height > 800 && window.screen.width > window.screen.height) {
    galleryCardSize = 260;
}

let overlaySwitchButtonLockTime = 100;  // ms

function angle2opacity(startAngle, endAngle, currentAngle) {
    let value = (1 - (currentAngle - startAngle) / (endAngle - startAngle));
    if (value > 1.0)
        return 1.0;
    else if (value < 0.0)
        return 0.0;
    return value;
}


class Gallery extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            angle: 0,
            start_index: 0,
            focusedImageIndex: -1,
            focused: false,
            class1: "class-invisible",
            gallerySwitchButtonLocked: false,
        }

        this.firstUpdateHappend = false;
        this.overlaySwitchButtonLocked = false;
    }

    componentDidMount() {
        // window.addEventListener('wheel', this.handleScroll);
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.storeData.galleryMode && !this.firstUpdateHappend) {
            // THIS WILL BE CALLED ONCE
            this.firstUpdateHappend = true;

            let thisRef = this;
            setTimeout(() => {
                thisRef.setState({...thisRef.state, class1: "class-visible"});
            }, 800);
        }
    }

    handleScroll = (event) => {

        // let angle = this.state.angle + event.deltaY * scroll2rotAngle;
        //
        //
        // if (event.deltaY === 0) {
        //     scrollDirection = 0;
        // } else if (event.deltaY > 0) {
        //     scrollDirection = 1;
        // } else {
        //     scrollDirection = -1;
        // }
        //
        //
        // this.setState({
        //     ...this.state,
        //     angle: angle,
        //     start_index: startIndex
        // });
    }

    onPhotoClick(index) {
        this.setState({
            ...this.state,
            focusedImageIndex: index,
            focused: true
        })
    }

    updateGallery() {

        let minAngle = 1;
        let maxAngle = angleOffsetDeg;
        let maxNegAngle = -angleOffsetDeg * numMaxImages;

        let out = [];

        for (let i = this.state.start_index;
             i < Math.min(images.length, this.state.start_index + numMaxImages);
             i++) {

            let angle = this.state.angle - i * angleOffsetDeg;
            let skewAngle = angle * 0.76;
            let rotYAngle = angle * 1.2;

            let opacity = 1.0;
            if (angle >= minAngle) {
                opacity = angle2opacity(minAngle, maxAngle, angle);
            }
            if (angle <= -minAngle) {
                opacity = angle2opacity(-minAngle, maxNegAngle, angle);
            }

            let display = "block";
            if (opacity <= 0.0) {
                display = "none";

                if (scrollDirection > 0) {
                    startIndex += 1;
                    if (startIndex > images.length - 1)
                        startIndex = images.length - 1;
                }

                if (scrollDirection < 0) {
                    startIndex -= 1;
                    if (startIndex < 0)
                        startIndex = 0;
                }
            }

            out.push(
                <div className={"common rot"}
                     key={i}
                     onClick={() => this.onPhotoClick(i)}
                     style={{
                         opacity: opacity,
                         display: display,
                         transform: `skew(0deg, ${skewAngle}deg) rotateY(${rotYAngle}deg)`
                     }}>
                    <AsyncImage size={galleryCardSize} hfix={true} src={images[i]}/>
                </div>
            );
        }

        return out.reverse();       // reverse because we need the right order of images layered
    }

    nextButton() {
        if (startIndex >= images.length - 1 || this.state.gallerySwitchButtonLocked) {
            return;
        }

        let componentRef = this;
        let prev_start_index = startIndex;
        scrollDirection = 1;

        let id = setInterval(() => {
            if (startIndex === prev_start_index) {
                componentRef.setState({
                    ...this.state,
                    angle: this.state.angle += btnRotSpeed,
                    start_index: startIndex,
                    gallerySwitchButtonLocked: true
                });
            } else {
                // Once we stopped rotating, clear interval and reset scrollDirection
                scrollDirection = 0;
                clearInterval(id);

                // current setState() will sync startIndex and this.start.index (Bad design - need refactoring)
                componentRef.setState({
                    ...this.state,
                    angle: this.state.angle,
                    start_index: startIndex,
                    gallerySwitchButtonLocked: false
                });
            }
        }, 30);
    }

    prevButton() {
        if (this.state.start_index === 0 || this.state.gallerySwitchButtonLocked) {
            return;
        }

        let componentRef = this;
        let endAngle = this.state.angle - angleOffsetDeg;       // we need to rotate to this angle
        scrollDirection = -1;
        startIndex -= 1;

        let id = setInterval(() => {
            // if (this.state.angle !== endAngle) {
            if (this.state.angle > endAngle) {
                componentRef.setState({
                    ...this.state,
                    angle: this.state.angle -= btnRotSpeed,
                    start_index: startIndex,
                    gallerySwitchButtonLocked: true
                });
            } else {
                // Once we stopped rotating, clear interval and reset scrollDirection
                scrollDirection = 0;
                clearInterval(id);

                // forcing rerender to update with the new startIndex value (this is bad design - need to refactor)
                componentRef.setState({
                    ...this.state,
                    angle: this.state.angle,
                    start_index: startIndex,
                    gallerySwitchButtonLocked: false
                });
            }
        }, 30);
    }

    nextOverlayButton(e) {
        e.stopPropagation();

        if (this.overlaySwitchButtonLocked) {
            console.log("Button is locked!");
            return;
        }

        if (this.state.focusedImageIndex >= images.length - 1) {
            return;
        }

        this.overlaySwitchButtonLocked = true;

        this.setState({
            ...this.state,
            focusedImageIndex: this.state.focusedImageIndex + 1
        }, () => {
            // adding a little cooldown on the overlay-buttons, so can't spam
            setTimeout(() => {this.overlaySwitchButtonLocked = false;},
                overlaySwitchButtonLockTime);
        });
    }

    prevOverlayButton(e) {
        e.stopPropagation();

        if (this.overlaySwitchButtonLocked) {
            console.log("Button is locked!");
            return;
        }

        if (this.state.focusedImageIndex <= 0) {
            return;
        }

        this.overlaySwitchButtonLocked = true;

        this.setState({
            ...this.state,
            focusedImageIndex: this.state.focusedImageIndex - 1
        }, () => {
            // adding a little cooldown on the overlay-buttons, so can't spam
            setTimeout(() => {this.overlaySwitchButtonLocked = false;},
                overlaySwitchButtonLockTime);
        });
    }

    removeOverlay() {
        this.setState({
            ...this.state,
            focused: false,
            focusedImageIndex: -1
        })
    }

    render() {
        let overlayWidth = 0;
        let cardOpacity = 0;
        let idx = this.state.focusedImageIndex;
        console.log("FOCUSED IMAGE idx = " + idx);
        let focusedImageLeftPos = document.body.clientWidth;
        if (this.state.focused) {
            overlayWidth = "100%";
            cardOpacity = 1.0;
            idx = (idx === -1) ? 0 : idx;       // if idx == -1 we set it to 0, otherwise leave as is
            focusedImageLeftPos = 0;
        }

        /* Adjust size of the focused image on mobile screens */
        let focusedImageSize = 400;
        let nextImg = arrowDown;
        let prevImg = arrowUp;
        if (window.screen.width <= 480) {
            focusedImageSize = window.innerWidth * 0.9;
            nextImg = overlayArrowNext;
            prevImg = overlayArrowPrev;
        }
        else if (window.screen.width >= 1440) {
            focusedImageSize =  window.innerWidth * 0.4;
        }


        return (
            <div className={"gallery-container " + this.state.class1}
                 style={{opacity: this.props.opacity}}>

                <div className={"left"}>
                    <div className={"gallery"}>
                        {this.updateGallery()}
                    </div>
                    <div className={"control-panel"}>

                        <div className={"gallery-button prev"}
                             style={{
                                 opacity: this.state.start_index === 0 ? 0.0 : 1.0,
                                 cursor: this.state.start_index === 0 ? "default" : "pointer"
                             }}
                             onClick={() => this.prevButton()}>
                            <div className={this.state.gallerySwitchButtonLocked ? "locked-button" : ""}>
                                <img className={"arrow"} src={prevImg} alt={""}/>
                            </div>
                            <p className={this.state.gallerySwitchButtonLocked ? "locked-button" : ""}>previous</p>
                        </div>

                        <div className={"gallery-button next"}
                             style={{
                                 opacity: this.state.start_index >= (images.length - 1) ? 0.0 : 1.0,
                                 cursor: this.state.start_index >= (images.length - 1) ? "default" : "pointer"
                             }}
                             onClick={() => this.nextButton()}>
                            <div className={this.state.gallerySwitchButtonLocked ? "locked-button" : ""}>
                                <img className={"arrow"} src={nextImg} alt={""}/>
                            </div>
                            <p className={this.state.gallerySwitchButtonLocked ? "locked-button" : ""}>next</p>
                        </div>
                    </div>
                </div>


                {/* FOCUSED IMAGE and OVERLAY */}
                <div className={"gallery-overlay"}
                     onClick={() => this.removeOverlay()}
                     style={{
                         width: overlayWidth,
                         height: "100%"
                     }}>

                    <div className={"gallery-focus-image-holder"}
                         style={{
                             opacity: cardOpacity,
                             left: focusedImageLeftPos
                         }}
                         onClick={() => this.removeOverlay()}>
                        <AsyncImage tag={""} size={focusedImageSize} src={images[idx]} hfix={false}/>
                    </div>

                    <div className={"overlay-button-holder"}>
                        <div className={"overlay-button"}
                             style={{
                                 opacity: this.state.focusedImageIndex === 0 ? 0.0 : 1.0,
                                 cursor: this.state.focusedImageIndex === 0 ? "default" : "pointer"
                             }}
                             onClick={(e) => this.prevOverlayButton(e)}>
                            <img className={"arrow"} src={overlayArrowPrev} alt={""}/>
                        </div>
                        <div className={"overlay-button"}
                             style={{
                                 opacity: this.state.focusedImageIndex >= (images.length - 1) ? 0.0 : 1.0,
                                 cursor: this.state.focusedImageIndex >= (images.length - 1) ? "default" : "pointer"
                             }}
                             onClick={(e) => this.nextOverlayButton(e)}>
                            <div><img className={"arrow"} src={overlayArrowNext}
                                      alt={""}/></div>
                        </div>
                    </div>


                </div>

            </div>
        )
    }
}

export default connect(
    state => ({storeData: state}),
    dispatch => ({
        onFocus: (imgIndex) => {
            dispatch({type: 'GALLERY_FOCUSED', imgIndex: imgIndex});
        },
        onUnfocus: (imgIndex) => {
            dispatch({type: 'GALLERY_UNFOCUSED'});
        }
    })
)(Gallery)