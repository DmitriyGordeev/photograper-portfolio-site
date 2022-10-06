import React, {Component} from 'react';
import {connect} from "react-redux";
import "./App.css";


import portraitExample from './../../resources/images/portrait.jpg';
import portraitExample2 from './../../resources/images/portrait2.jpg';
import cameraImage from './../../resources/images/round_lense.png';
import room from "../../resources/images/room.jpg";
import reflection from "../../resources/images/camera_reflection.png";

// import Polaroid from "../main/Polaroid";


const angleOffsetDeg = 17;     // in degrees

const numMaxImages = 3;     // how many images rolling gallery can show at the same time

const images = [
    portraitExample,
    portraitExample2,
    room,
    reflection
]


const scroll2rotAngle = 1 / 30;     // 1deg of rotation per 40px of scrolling


function angle2opacity(startAngle, endAngle, currentAngle) {
    return (1 - (currentAngle - startAngle) / (endAngle - startAngle));
}


class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            angle: 0
        }
    }


    componentDidMount() {
        window.addEventListener('wheel', this.handleScroll);
    }

    handleScroll = (event) => {
        console.log("event.deltaY = " + event.deltaY);

        let angle = this.state.angle + event.deltaY * scroll2rotAngle;
        // console.log(`angle = ${angle}`);

        let opacity = this.state.opacity;

        if (angle >= 60) {
            opacity = 0.5;
        }

        this.setState({
            ...this.state,
            angle: angle
        });
    }



    updateGallery() {

        let minAngle = 10;
        let maxAngle = 20;

        let out = [];
        let angleOffset = (numMaxImages - 1) * angleOffsetDeg;

        for (let i = 0; i < images.length; i++) {

            let angle = this.state.angle - angleOffset;
            let skewAngle = angle * 0.76;
            let rotYAngle = angle * 1.2;

            console.log(`angle = ${angle}`);

            let opacity = 1.0;
            if (this.state.angle - angleOffset >= minAngle) {
                opacity = angle2opacity(minAngle, maxAngle, angle);
            }
            if (this.state.angle - angleOffset <= -minAngle) {
                opacity = angle2opacity(-minAngle, -maxAngle, angle);
            }
            console.log(`angle = ${angle}, opacity = ${opacity}`);

            let display = "block";
            if (opacity < 0.3) {
                display = "none";
                // todo: setState() start_index += 1 ? а как start_index -= 1 ?
                //  break ?
                // Сделать порциями будет легче
            }

            out.push(
                <div className={"common rot"}
                     key={i}
                     style={{
                         opacity: opacity,
                         display: display,
                         transform: `skew(0deg, ${skewAngle}deg) rotateY(${rotYAngle}deg)`
                     }}>
                    <img src={images[i]} alt={""}/>
                </div>
            );

            angleOffset -= angleOffsetDeg;
        }

        return out;
    }





    render() {
        return (
            <div>
                {this.updateGallery()}
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