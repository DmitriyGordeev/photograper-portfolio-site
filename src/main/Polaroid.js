import React, {Component} from 'react';
import {connect} from "react-redux";
import "./Polaroid.css";

import AsyncImage from "./AsyncImage";

class Polaroid extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            className: "polaroid-card polaroid-card-hover",
            width: "auto",
            height: "auto"
        }
    }

    getClassFocused() {
        let className = this.state.className.replace("polaroid-card-hover", "");
        className = className + " active";
        return className
    }

    getClassUnfocused() {
        let className = this.state.className.replace("active", "");
        className = className + " polaroid-card-hover";
        return className
    }

    click = (e) => {
        this.props.onPolaroidFocus();

        // if focused already - the second click will cancel the effect
        if (this.props.storeData.focused) {
            this.props.onPolaroidUnfocus();
        }
    }


    render() {

        let className = this.getClassUnfocused();
        if (this.props.storeData.focused) {
            className = this.getClassFocused();
        }

        let imageSize = 330;
        if (window.screen.width <= 480) {
            imageSize = 160;
        }

        return (
            <div className={className}
                 onClick={this.click}
                 style={{
                     ...this.props.style,
            }}>
                <div className={"inner"}>
                    <AsyncImage size={imageSize} src={this.props.src} tag={"polaroid"} hfix={false} />
                    <div className={"filter"} style={{
                        opacity: this.props.storeData.focused ? 0.0 : 1.0
                    }}/>
                </div>
            </div>
        )
    }
}


export default connect(
    state => ({
        storeData: state
    }),
    dispatch => ({
        onPolaroidFocus: (values) => {
            dispatch({type: 'POLAROID_FOCUSED', values: values});
        },
        onPolaroidUnfocus: (values) => {
            dispatch({type: 'POLAROID_UNFOCUSED', values: values});
        }
    })
)(Polaroid);
