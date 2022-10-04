import React, {Component} from 'react';
import {connect} from "react-redux";
// import "./App.css";

import portraitExample from './../../resources/images/portrait.jpg';
import portraitExample2 from './../../resources/images/portrait2.jpg';
import cameraImage from './../../resources/images/round_lense.png';
import room from "../../resources/images/room.jpg";
import Polaroid from "../main/Polaroid";



const images = [
    portraitExample,
    portraitExample2,
    room
]


class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            width: "auto",
            height: "auto",
            active_polaroid_index: images.length - 1
        }
        this.imgRef = React.createRef();
    }


    click() {
        this.setState({
            ...this.state,
            active_polaroid_index: this.state.active_polaroid_index - 1
        })
    }


    updatePolaroids() {
        console.log(`active_polaroid_index = ${this.state.active_polaroid_index}`);
        let out = [];
        for (let i = 0; i < images.length; i++) {
            let opacity = 0.0;
            if (i === this.state.active_polaroid_index)
                opacity = 1.0;
            out.push(
                <Polaroid
                    key={i}
                    style={{opacity: opacity }}
                    onClick={() => this.click()}
                    src={images[i]}
                    alt={""} />
            );
        }
        return out;
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


                {/*<Polaroid*/}
                {/*    style={{opacity: 1 - this.state.opacity}}*/}
                {/*    onClick={() => this.click()}*/}
                {/*    src={portraitExample}*/}
                {/*    alt={""} />*/}

                {/*<Polaroid*/}
                {/*    style={{opacity: this.state.opacity}}*/}
                {/*    onClick={() => this.click()}*/}
                {/*    src={portraitExample2}*/}
                {/*    alt={""} />*/}

                {this.updatePolaroids()}

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