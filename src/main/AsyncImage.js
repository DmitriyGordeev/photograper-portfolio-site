import React, {Component} from 'react';
import {connect} from "react-redux";

import "./AsyncImage.css";


class AsyncImage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            src: "",
            div: <div className={"photo"}/>,
            blank: false
        };
    }


    load = url => {
        return new Promise(res => {
            const img = new Image();

            // we disable cache for demo
            // img.src = url + '?r=' + Math.random();
            img.src = url;

            // further wait for the decoding
            img.onload = (evt) => {
                img.decode().then(() => res(img));
            };

            console.log("reaching this code");
        });
    }


    getImages = imgs => {
        let thisRef = this;
        const promises = imgs.map(async url => {
            const image = await thisRef.load(url);

            let w = image.naturalWidth;
            let h = image.naturalHeight;
            let aspectRatio = w / h;

            if (this.props.hfix) {
                h = this.props.size;
                w = aspectRatio * h;
            } else {
                if (aspectRatio >= 1) {
                    w = this.props.size;
                    h = w / aspectRatio;
                } else {
                    h = this.props.size;
                    w = aspectRatio * h;
                }
            }

            thisRef.setState({
                ...thisRef.state,
                src: image.src,
                blank: false,
                div: <div className={"async-photo"}
                          style={{
                              backgroundImage: `url(${image.src})`,
                              width: w,
                              height: h
                          }}/>
            });
        });
        return Promise.all(promises);
    }


    componentDidMount() {
        console.log("AsyncImage: componentDidMount()");
        this.getImages([this.props.src]).then(() => {
            console.log("AsyncImage: then() callback");
        });
    }


    shouldComponentUpdate(nextProps, nextState, nextContext) {
        console.log(this.props.tag + " AsyncImage: shouldComponentUpdate()");

        console.log(this.props.tag + " AsyncImage: this.state.src = " + this.state.src);
        console.log(this.props.tag + " AsyncImage: nextState.src = " + nextState.src);
        console.log(this.props.tag + " AsyncImage: nextProps.src = " + nextProps.src);

        if (this.state.src === nextState.src && this.state.src === nextProps.src) {
            console.log(this.props.tag + " AsyncImage: shouldComponentUpdate() return false");
            return false;
        }

        return true;
    }


    render() {

        console.log(this.props.tag + " AsyncImage: render()");

        let element = this.state.div;
        if (typeof this.props.src === 'undefined') {
            if (!this.state.blank) {
                element = <div className={"async-photo"}
                               style={{
                                   width: 200,
                                   height: 200
                               }}/>;
                this.setState({...this.state, div: element, blank: true, src: ""});
            }
        }
        else {
            this.getImages([this.props.src]).then(() => {});
        }

        return (
            <div className={"async-photo-border"}>{element}</div>
        );
    }
}

export default connect(
    state => ({
        storeData: state
    }),
    dispatch => ({})
)(AsyncImage);