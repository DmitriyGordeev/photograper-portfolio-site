import React, {Component} from 'react';
import {connect} from 'react-redux';
import './Gallery.css';
import portraitExample from "../../resources/images/portrait.jpg";
import portraitExample2 from "../../resources/images/portrait2.jpg";
import room from "../../resources/images/room.jpg";
import reflection from "../../resources/images/camera_reflection.png";
import img1 from "../../resources/images/img1.jpg";
import img2 from "../../resources/images/img2.jpg";
import img3 from "../../resources/images/img3.jpg";
import Polaroid from "./Polaroid";



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
            start_index: 0
        }
    }


    componentDidMount() {
        window.addEventListener('wheel', this.handleScroll);
    }


    handleScroll = (event) => {
        console.log("event.deltaY = " + event.deltaY);
        let angle = this.state.angle + event.deltaY * scroll2rotAngle;


        if (event.deltaY === 0) {
            scrollDirection = 0;
        }
        else if (event.deltaY > 0) {
            scrollDirection = 1;
        }
        else {
            scrollDirection = -1;
        }


        this.setState({
            ...this.state,
            angle: angle,
            start_index: startIndex
        });
    }


    onPhotoClick(index) {
        console.log(`Clicked on ${index}`);



        // TODO: enable overlay
        // TODO: make centered Polaroid visible
        // TODO: enable focus

        this.props.onFocus(index);
    }


    updateGallery() {

        let minAngle = 1;
        let maxAngle = angleOffsetDeg;
        let maxNegAngle = -angleOffsetDeg * numMaxImages;

        let out = [];

        for (let i = this.state.start_index;
             i < Math.min(images.length, this.state.start_index + numMaxImages);
             i++) {

            console.log(`[Cycle debug] [${i}] startIndex = ${startIndex}`);

            let angle = this.state.angle - i * angleOffsetDeg;
            let skewAngle = angle * 0.76;
            let rotYAngle = angle * 1.2;

            console.log(`[Cycle debug] [${i}] angle = ${angle}`);

            let opacity = 1.0;
            if (angle >= minAngle) {
                opacity = angle2opacity(minAngle, maxAngle, angle);
            }
            if (angle <= -minAngle) {
                opacity = angle2opacity(-minAngle, maxNegAngle, angle);
            }

            console.log(`[Cycle debug] [${i}] opacity = ${opacity}`);

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
                    <img src={images[i]} alt={""}/>
                    {/*<ImageHelper src={images[i]} alt={""} />*/}
                </div>
            );
        }

        return out.reverse();       // reverse because we need the right order of images layered
    }


    nextButton() {
        console.log(`[ nextButton() ] state.start_index = ${this.state.start_index} vs startIndex = ${startIndex}`);
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
            }
            else {
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
        }, 50);
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
            console.log(`angle = ${this.state.angle}, endAngle = ${endAngle}`);
            if (this.state.angle !== endAngle) {
                componentRef.setState({
                    ...this.state,
                    angle: this.state.angle -= btnRotSpeed,
                    start_index: startIndex
                });
            }
            else {
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
        }, 50);
    }


    removeOverlay() {
        console.log("overlayRemove()");
        this.props.onUnfocus();
    }


    render() {
        let overlayHeight = 0.0;
        let overlayWidth = 0.0;
        let polaroidOpacity = 0.0;
        let focusImgIndex = -1;
        if (this.props.storeData.focused) {
            overlayHeight = "100%";
            overlayWidth = "100%";
            polaroidOpacity = 1.0;
            focusImgIndex = this.props.storeData.imgIndex;
        }

        return (
            <div className={"gallery-container"} style={{opacity: this.props.opacity}}>
                <div>
                    <div className={"gallery"}>
                        {this.updateGallery()}
                    </div>
                    <div className={"control-panel"}>
                        <div className={"gallery-button next"} onClick={() => this.prevButton()}></div>
                        <div className={"gallery-button prev"} onClick={() => this.nextButton()}></div>
                    </div>
                </div>

                <div className={"text-holder"}>
                    <div>
                        <p>I have some text for ya</p>
                    </div>
                </div>

                {/* TODO: this is another overlay, ideally should be only one */}
                <div className={"overlay"}
                     onClick={() => this.removeOverlay()}
                     style={{
                         width: overlayWidth,
                         height: "100%"
                     }}></div>


                <Polaroid
                    style={{
                        opacity: polaroidOpacity,
                        transition: `${850}ms ease`,
                    }}
                    src={images[focusImgIndex]}
                    alt={""}/>

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