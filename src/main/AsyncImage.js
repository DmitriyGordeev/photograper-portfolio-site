import React, {Component} from 'react';
import {connect} from "react-redux";

import "./AsyncImage.css";


const cardSize = 300;


class AsyncImage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            div: <div className={"photo"}/>
        };
    }

    componentDidMount() {
        let thisRef = this;

        const load = url => {
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

        const getImages = imgs => {
            const promises = imgs.map(async url => {
                const image = await load(url);

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

                console.log("w = " + w + ", h = " + h);

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

        getImages([this.props.src]).then(() => {
            console.log("then() callback");
        });
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