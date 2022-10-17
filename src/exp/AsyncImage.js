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

    componentDidMount() {
        let thisRef = this;

        const load = url => {
            return new Promise(res => {
                const img = new Image();

                // we disable cache for demo
                img.src = url + '?r=' + Math.random();

                // further wait for the decoding
                img.onload = (evt) => {
                    console.log("img.naturalWidth = " + img.naturalWidth +
                        ", img.naturalHeight = " + img.naturalHeight);
                    img.decode().then(() => res(img));
                };
            });
        }

        const getImages = imgs => {
            const promises = imgs.map(async url => {
                const image = await load(url);
                console.log("map.promise");

                thisRef.setState({
                    ...thisRef.state,
                    div: <div className={"photo"} style={{backgroundImage: `url(${image.src})`}} />
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
            <div className={"photo-border"}>{this.state.div}</div>
        );
    }
}

export default connect(
    state => ({
        storeData: state
    }),
    dispatch => ({})
)(AsyncImage);