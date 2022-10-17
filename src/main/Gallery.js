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

import AsyncImage from "./AsyncImage";

const angleOffsetDeg = 16;     // in degrees

const btnRotSpeed = 1;
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

const scroll2rotAngle = 1 / 300;     // 1deg of rotation per 40px of scrolling

const galleryCardSize = 220;

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
            classLeft: "left-collapsed",
            classRight: "right-expanded",
            class1: "class-invisible",
            class2: "class-invisible",
            class3: "class-invisible",
            class4: "class-invisible",
            class5: "class-invisible"
        }

        this.firstUpdateHappend = false;
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


            setTimeout(() => {
                thisRef.setState({...thisRef.state, class2: "class-visible"});
            }, 900);


            setTimeout(() => {
                thisRef.setState({...thisRef.state, class3: "class-visible"});
            }, 1000);

            setTimeout(() => {
                thisRef.setState({...thisRef.state, class4: "class-visible"});
            }, 1100);

            setTimeout(() => {
                thisRef.setState({...thisRef.state, class5: "class-visible"});
            }, 1200);

            setTimeout(() => {
                thisRef.setState({
                    ...thisRef.state,
                    classLeft: "left",
                    classRight: "right"
                });
            }, 1300);
        }
    }


    handleScroll = (event) => {
        // // // console.log("event.deltaY = " + event.deltaY);
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
        // // console.log(`Clicked on ${index}`);

        this.setState({
            ...this.state,
            focusedImageIndex: index,
            focused: true
        })

        // TODO: enable overlay
        // TODO: make centered Polaroid visible
        // TODO: enable focus

        // this.props.onFocus(index);
    }


    updateGallery() {

        let minAngle = 1;
        let maxAngle = angleOffsetDeg;
        let maxNegAngle = -angleOffsetDeg * numMaxImages;

        let out = [];

        for (let i = this.state.start_index;
             i < Math.min(images.length, this.state.start_index + numMaxImages);
             i++) {

            // // console.log(`[Cycle debug] [${i}] startIndex = ${startIndex}`);

            let angle = this.state.angle - i * angleOffsetDeg;
            let skewAngle = angle * 0.76;
            let rotYAngle = angle * 1.2;

            // // console.log(`[Cycle debug] [${i}] angle = ${angle}`);

            let opacity = 1.0;
            if (angle >= minAngle) {
                opacity = angle2opacity(minAngle, maxAngle, angle);
            }
            if (angle <= -minAngle) {
                opacity = angle2opacity(-minAngle, maxNegAngle, angle);
            }

            // // console.log(`[Cycle debug] [${i}] opacity = ${opacity}`);

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

                    {/*<img src={images[i]} alt={""} />*/}
                    {/*<ImageHelper src={images[i]} alt={""} />*/}

                    <AsyncImage size={galleryCardSize} hfix={true} src={images[i]} />
                </div>
            );
        }

        return out.reverse();       // reverse because we need the right order of images layered
    }


    nextButton() {
        // // console.log(`[ nextButton() ] state.start_index = ${this.state.start_index} vs startIndex = ${startIndex}`);
        if (startIndex >= images.length - 1) {
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
                    start_index: startIndex
                });
            } else {
                // Once we stopped rotating, clear interval and reset scrollDirection
                scrollDirection = 0;
                clearInterval(id);

                // current setState() will sync startIndex and this.start.index (Bad design - need refactoring)
                componentRef.setState({
                    ...this.state,
                    angle: this.state.angle,
                    start_index: startIndex
                });
            }
        }, 30);
    }


    prevButton() {
        if (this.state.start_index === 0) {
            return;
        }

        let componentRef = this;
        let endAngle = this.state.angle - angleOffsetDeg;       // we need to rotate to this angle
        scrollDirection = -1;
        startIndex -= 1;

        let id = setInterval(() => {
            // // console.log(`angle = ${this.state.angle}, endAngle = ${endAngle}`);
            if (this.state.angle !== endAngle) {
                componentRef.setState({
                    ...this.state,
                    angle: this.state.angle -= btnRotSpeed,
                    start_index: startIndex
                });
            } else {
                // Once we stopped rotating, clear interval and reset scrollDirection
                scrollDirection = 0;
                clearInterval(id);

                // forcing rerender to update with the new startIndex value (this is bad design - need to refactor)
                componentRef.setState({
                    ...this.state,
                    angle: this.state.angle,
                    start_index: startIndex
                });
            }
        }, 30);
    }


    removeOverlay() {
        this.setState({
            ...this.state,
            focused: false
        })
    }



    render() {
        let overlayWidth = 0;
        let cardOpacity = 0;
        let idx = this.state.focusedImageIndex;
        if (this.state.focused) {
            overlayWidth = "100%";
            cardOpacity = 1.0;
            idx = (idx === -1) ? 0 : idx;       // if idx == -1 we set it to 0, otherwise leave as is
            console.log("idx = " + idx);
        }

        return (
            <div className={"gallery-container " + this.state.class1}>

                <div className={this.state.classLeft}>
                    <div className={"control-panel"}>
                        <div className={"gallery-button next"} onClick={() => this.prevButton()}>
                            <div><img className={"arrow"} src={arrowUp} alt={""}/></div>
                            <p>previous</p>
                        </div>
                        <div className={"gallery-button prev"} onClick={() => this.nextButton()}>
                            <div><img className={"arrow"} src={arrowDown} alt={""}/></div>
                            <p>next</p>
                        </div>
                    </div>
                    <div className={"gallery"}>
                        {this.updateGallery()}
                    </div>
                </div>

                <div className={this.state.classRight}>
                    <div className={"text-container"}>
                        <h1 className={"description text center-text " + this.state.class2}>Hi, my name is </h1>
                        <h2 className={"description text left-text " + this.state.class3}>I like photography and video-editing</h2>
                        <h2 className={"description text right-text " + this.state.class4}>I travel around the world <br/>to capture memorable moments</h2>
                        <h2 className={"description text left-text " + this.state.class5}>You can find my profile here</h2>
                    </div>
                </div>

                <div className={"gallery-overlay"}
                     onClick={() => this.removeOverlay()}
                     style={{
                         width: overlayWidth,
                         height: "100%"
                     }}>

                    {/* appears when we click on the gallery image */}
                    {/*<div className={"gallery-focus-image"}*/}
                    {/*     style={{opacity: cardOpacity}}*/}
                    {/*     onClick={() => this.removeOverlay()}>*/}

                    {/*    <img style={{display: this.state.focused ? "block" : "none"}}*/}
                    {/*         src={images[idx]}*/}
                    {/*         alt={""}/>*/}
                    {/*</div>*/}


                    <div className={"gallery-focus-image-holder"}
                         style={{
                             opacity: cardOpacity,
                             display: this.state.focused ? "block" : "none"
                         }}
                         onClick={() => this.removeOverlay()}>

                        <AsyncImage size={300} src={images[idx]} hfix={false} />
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