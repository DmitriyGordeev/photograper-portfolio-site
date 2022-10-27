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
            img.src = url;

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
        if (typeof this.props.src === 'undefined') {
            if (!this.state.blank) {
                let element = <div className={"async-photo"}
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

        // this.getImages([this.props.src]).then(() => {});
    }


    shouldComponentUpdate(nextProps, nextState, nextContext) {
        return !(this.state.src === nextState.src && this.state.src === nextProps.src);
    }


    render() {
        // let element = this.state.div;
        // if (typeof this.props.src === 'undefined') {
        //     if (!this.state.blank) {
        //         element = <div className={"async-photo"}
        //                        style={{
        //                            width: 200,
        //                            height: 200
        //                        }}/>;
        //         this.setState({...this.state, div: element, blank: true, src: ""});
        //     }
        // }
        // else {
        //     this.getImages([this.props.src]).then(() => {});
        // }

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