import React, {Component} from 'react';
import {connect} from "react-redux";
import "./App.css";

// import cameraImage from './../../resources/images/camera.jpg';
import cameraImage from './../../resources/images/round_lense.png';

// this is a ratio meaning that per each 100px
// scroll the object will rotate on 180degrees
const deg2px = 180 / 2000;

const scale2px = 1.0 / 3000;

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            angle: 0,
            scale: 1.0,
            menuClass: "top-menu-holder"
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

        let angle = this.state.angle + addedAngle;
        let scale = this.state.scale + addedScale;
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
                <img
                    style={{
                        transition: "250ms ease",
                        transform: `rotate(${this.state.angle}deg) scale(${this.state.scale})`,
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