import React, {Component} from 'react';
import {connect} from "react-redux";
// import "./App.css";

import portraitExample from './../../resources/images/portrait.jpg';
import portraitExample2 from './../../resources/images/portrait2.jpg';
import cameraImage from './../../resources/images/round_lense.png';
import room from "../../resources/images/room.jpg";
import Polaroid from "../main/Polaroid";


class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            width: "auto",
            height: "auto",
            image: portraitExample
        }
        this.imgRef = React.createRef();
    }


    onImageLoad = () => {
        console.log(this.imgRef.current.clientWidth + ", " + this.imgRef.current.clientHeight); // actual image size
        let w = this.imgRef.current.clientWidth;
        let h = this.imgRef.current.clientHeight;

        if (w >= h) {
            this.setState({
                width: "500px",
                height: "auto"
            })
        }
        else {
            this.setState({
                width: "auto",
                height: "500px"
            })
        }
    };


    click() {
        console.log("Click!");
        let state = this.state;
        state.image = portraitExample2;
        this.setState({state});
    }


    render() {
        return (
            <div>
                {/*<div className={"holder"}>*/}
                {/*    <div className={"inner"}>*/}
                {/*        <img ref={this.imgRef}*/}
                {/*             style={{*/}
                {/*                 width: this.state.width,*/}
                {/*                 height: this.state.height*/}
                {/*             }}*/}
                {/*             onLoad={this.onImageLoad}*/}
                {/*             src={portraitExample}*/}
                {/*             alt={""}/>*/}
                {/*    </div>*/}
                {/*</div>*/}

                {/*<br />*/}

                {/*<div className={"holder"}>*/}
                {/*    <div className={"inner"}>*/}
                {/*        <img src={portraitExample2} alt={""}/>*/}
                {/*    </div>*/}
                {/*</div>*/}

                {/*<br />*/}

                {/*<div className={"holder"}>*/}
                {/*    <div className={"inner"}>*/}
                {/*        <img src={room} alt={""}/>*/}
                {/*    </div>*/}
                {/*</div>*/}


                <Polaroid
                    onClick={() => this.click()}
                    src={this.state.image}
                    alt={""} />

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
        }
    })
)(App);