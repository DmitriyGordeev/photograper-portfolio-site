import React, {Component} from 'react';
import {connect} from "react-redux";
import "./App.css";

// import cameraImage from './../../resources/images/camera.jpg';
import cameraImage from './../../resources/images/round_lense.png';

// this is a ratio meaning that per each 100px
// scroll the object will rotate on 180degrees
const deg2px = 180 / 2000;

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            angle: 0
        };
    }


    componentDidMount() {
        window.addEventListener('wheel', this.handleScroll);
    }


    // handleScroll(event) {
    //     // console.log("Scrolling inside component: deltaY", event.deltaY);
    //     // let scrollAmount = event.deltaY;
    //     // let addedAngle = deg2px * scrollAmount;
    //     // console.log(`scrollAmount = ${scrollAmount}, addedAngle = ${addedAngle}`);
    //
    //     console.log(this);
    //     console.log(this.state.angle);
    //
    //     // this.setState({
    //     //     angle: angle
    //     // });
    // }


    handleScroll = (event) => {

        console.log("Scrolling inside component: deltaY", event.deltaY);
        let scrollAmount = event.deltaY;
        let addedAngle = deg2px * scrollAmount;
        console.log(`scrollAmount = ${scrollAmount}, addedAngle = ${addedAngle}`);
        console.log("this.state.angle = " + this.state.angle);

        let angle = this.state.angle + addedAngle;

        this.setState({
            angle: angle
        });
    }


    render() {
        return (
            <div className={"main"}>
                <div id={"top-menu-holder"}>
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
                <img
                    style={{
                        transform: `rotate(${this.state.angle}deg)`,
                        transition: "150ms ease"
                    }}
                    src={cameraImage}
                    alt={"camera-lenses"}
                    className={"aspect-ratio"}/>
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