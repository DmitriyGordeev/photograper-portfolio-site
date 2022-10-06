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

// import Polaroid from "../main/Polaroid";


const angleOffsetDeg = 16;     // in degrees

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

const scroll2rotAngle = 1 / 500;     // 1deg of rotation per 40px of scrolling


function angle2opacity(startAngle, endAngle, currentAngle) {
    let value = (1 - (currentAngle - startAngle) / (endAngle - startAngle));
    if (value > 1.0)
        return 1.0;
    else if (value < 0.0)
        return 0.0;
    return value;
}


// function angle2opacity_sigmoid(startAngle, endAngle, currentAngle) {
//     let value = (1 - (currentAngle - startAngle) / (endAngle - startAngle));
//     if (value > 1.0)
//         value = 1.0;
//     else if (value < 0.0)
//         value = 0.0;
//
//     return 1 / (1 + Math.exp(-value));
// }


class App extends React.Component {
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
        console.log(`angle = ${this.state.angle}`);

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
    }


    updateGallery() {

        let minAngle = 1;
        let maxAngle = angleOffsetDeg + 2;
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
                </div>
            );

            // angleOffset += angleOffsetDeg;
        }

        return out.reverse();       // reverse because we need the right order of images layered
    }


    nextButton() {
        let componentRef = this;
        let prev_start_index = startIndex;
        scrollDirection = 1;

        setInterval(() => {
            console.log(`startIndex = ${startIndex}, prev_start_index = ${prev_start_index}`);
            if (startIndex === prev_start_index) {
                componentRef.setState({
                    ...this.state,
                    angle: this.state.angle += 7,
                    start_index: startIndex
                });
            }
        }, 200);
    }


    render() {
        return (
            <div className={"gallery"}>
                {this.updateGallery()}
                <div className={"button"} onClick={() => this.nextButton()}></div>
            </div>
        );
    }
}

export default connect(
    state => ({
        storeData: state
    }),
    dispatch => ({
    })
)(App);