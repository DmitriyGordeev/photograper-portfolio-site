import React, {Component} from 'react';
import {connect} from "react-redux";
import "./App.css";

import portraitExample from './../../resources/images/portrait.jpg';
import cameraImage from './../../resources/images/round_lense.png';

// this is a ratio meaning that per each 100px
// scroll the object will rotate on 180degrees
const deg2px = 180 / 2000;
const scale2px = 1.0 / 3000;

const fixedDegAdded = 10;
const fixedScaleAdded = 0.12;
const transitionTime = "850ms";

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            angle: 0,
            scale: 1.0,
            menuClass: "top-menu-holder wide-menu"
        };
    }


    componentDidMount() {
        window.addEventListener('wheel', this.handleScroll);
    }

    handleScroll = (event) => {

        // console.log("Scrolling inside component: deltaY", event.deltaY);
        let scrollAmount = event.deltaY;
        let addedAngle = deg2px * scrollAmount;
        let addedScale = scale2px * scrollAmount;
        console.log(`
            scrollAmount = ${scrollAmount},
            addedAngle = ${addedAngle},
            addedScale = ${addedScale}`);

        // console.log("this.state.angle = " + this.state.angle);

        let angle = 0;
        let scale = 0;
        if (scrollAmount > 0) {
            angle = this.state.angle + fixedDegAdded;
            scale = this.state.scale + fixedScaleAdded;
        }
        else {
            angle = this.state.angle - fixedDegAdded;
            scale = this.state.scale - fixedScaleAdded;
        }

        let menuClass = this.state.menuClass;

        // prevent from decreasing
        if (scale <= 1.0)
            scale = 1.0;

        if (scale >= 1.3) {
            menuClass = "top-menu-holder";
        }
        else if (scale < 1.3) {
            menuClass = menuClass + " wide-menu";
        }

        this.setState({
            angle: angle,
            scale: scale,
            menuClass: menuClass
        });
    }


    render() {
        return (
            <div className={"main"}>
                <div className={this.state.menuClass}>
                    <div className={"menu-item"}>
                        <p>
                            <a href={"https://google.com"}>
                                <span>ABOUT ME</span>
                            </a>
                        </p>
                    </div>
                    <div className={"menu-item"}>
                        <p>
                            <a href={"https://google.com"}>
                                <span>SOCIALS</span>
                            </a>
                        </p>
                    </div>
                    <div className={"menu-item"}>
                        <p>
                            <a href={"https://google.com"}>
                                <span>CONTACT</span>
                            </a>
                        </p>
                    </div>
                </div>


                <div className={"camera-view"}>
                    <img
                        style={{
                            transition: `${transitionTime} ease`,
                            transform: `rotate(${this.state.angle}deg) scale(${this.state.scale})`,
                        }}
                        src={cameraImage}
                        alt={"camera-lenses"}
                        id={"rot-camera-image"}>
                    </img>

                    <img className={"in-camera"}
                         style={{
                             transition: `${transitionTime} ease`,
                             transform: `scale(${this.state.scale})`,
                         }}
                         src={portraitExample}
                         alt={""} />
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
        // onUpdateValues: (values) => {
        //     dispatch({ type: 'UPDATE_VALUES', values: values});
        // }
    })
)(App);