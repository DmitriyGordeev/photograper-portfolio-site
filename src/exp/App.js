import React, {Component} from 'react';
import {connect} from "react-redux";
import "./App.css";


import portraitExample from './../../resources/images/portrait.jpg';
import portraitExample2 from './../../resources/images/portrait2.jpg';
import cameraImage from './../../resources/images/round_lense.png';
import room from "../../resources/images/room.jpg";

// import Polaroid from "../main/Polaroid";


const angleOffset = 15;     // in degrees

const images = [
    portraitExample,
    portraitExample2,
    room
]


const scroll2rotAngle = 1 / 30;     // 1deg of rotation per 40px of scrolling


class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            angle: 0,
            opacity: 1.0
        }
    }


    componentDidMount() {
        window.addEventListener('wheel', this.handleScroll);
    }

    handleScroll = (event) => {
        console.log("event.deltaY = " + event.deltaY);

        let angle = this.state.angle + event.deltaY * scroll2rotAngle;
        console.log(`angle = ${angle}`);

        let opacity = this.state.opacity;

        if (angle >= 60) {
            opacity = 0.5;
        }

        this.setState({
            ...this.state,
            angle: angle,
            opacity: opacity});
    }



    updateGallery() {

    }





    render() {
        return (
            <div>

                <div className={"common rot"}
                     style={{
                         opacity: this.state.opacity,
                         transform: `skew(0deg, ${this.state.angle - 15}deg) rotateY(${(this.state.angle - 15) * 1.1}deg)`
                }}>
                    <img src={room} alt={""}/>
                </div>


                <div className={"common rot"}
                     style={{
                         opacity: this.state.opacity,
                         transform: `skew(0deg, ${this.state.angle}deg) rotateY(${this.state.angle * 1.1}deg)`
                     }}>
                    <img src={portraitExample} alt={""}/>
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
    })
)(App);