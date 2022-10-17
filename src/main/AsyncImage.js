import React, {Component} from 'react';
import {connect} from "react-redux";

import "./AsyncImage.css";


class AsyncImage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            div: <div className={"photo"}/>
        };
    }


    load = url => {
        return new Promise(res => {
            const img = new Image();

            // we disable cache for demo
            img.src = url + '?r=' + Math.random();

            // further wait for the decoding
            img.onload = (evt) => {
                img.decode().then(() => res(img));
            };
        });
    }


    getImages = imgs => {
        let thisRef = this;
        const promises = imgs.map(async url => {
            const image = await thisRef.load(url);

            let w = image.naturalWidth;
            let h = image.naturalHeight;
            let aspectRatio = w / h;

            // TODO: default props  hfix and wfix

            if (this.props.hfix) {
                h = this.props.size;
                w = aspectRatio * h;
            }
            else {
                if (aspectRatio >= 1) {
                    w = this.props.size;
                    h = w / aspectRatio;
                }
                else {
                    h = this.props.size;
                    w = aspectRatio * h;
                }
            }

            thisRef.setState({
                ...thisRef.state,
                div: <div className={"async-photo"}
                          style={{
                              backgroundImage: `url(${image.src})`,
                              width: w,
                              height: h
                          }} />
            });
        });
        return Promise.all(promises);
    }


    componentDidMount() {
        console.log("componentDidMount()");
        this.getImages([this.props.src]).then(() => {
            console.log("then() callback");
        });
    }


    shouldComponentUpdate(nextProps, nextState, nextContext) {
        console.log("shouldComponentUpdate()");
        // console.log("prevState.div = " + this.state.div + " | nextState.div = " + nextState.div);

        if (this.state.div === nextState.div) {
            return false;
        }

        this.getImages([this.props.src]).then(() => {
            console.log("then() callback");
        });

        return true;
    }

    render() {
        return (
            <div className={"async-photo-border"}>{this.state.div}</div>
        );
    }
}

export default connect(
    state => ({
        storeData: state
    }),
    dispatch => ({})
)(AsyncImage);