import React, {Component} from 'react';
import {connect} from "react-redux";

import "./AsyncImage.css";


class AsyncImage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            src: "",
            div: <div className={"async-photo"}
                      style={{
                          width: this.props.size,
                          height: this.props.size
                      }}/>,
            blank: false
        };
    }


    load = url => {
        return new Promise(res => {
            const img = new Image();
            img.src = url;

            // как выглядит функция res????

            // further wait for the decoding
            img.onload = (evt) => {
                img.decode().then(() => res(img));
            };
        });
    }


    getImage = img => {
        let thisRef = this;


        // const promises = imgs.map(async url => {
        //     const image = await thisRef.load(url);
        //
        //     let w = image.naturalWidth;
        //     let h = image.naturalHeight;
        //     let aspectRatio = w / h;
        //
        //     if (this.props.hfix) {
        //         h = this.props.size;
        //         w = aspectRatio * h;
        //     } else {
        //         if (aspectRatio >= 1) {
        //             w = this.props.size;
        //             h = w / aspectRatio;
        //         } else {
        //             h = this.props.size;
        //             w = aspectRatio * h;
        //         }
        //     }
        //
        //     thisRef.setState({
        //         ...thisRef.state,
        //         src: image.src,
        //         blank: false,
        //         div: <div className={"async-photo"}
        //                   style={{
        //                       backgroundImage: `url(${image.src})`,
        //                       width: w,
        //                       height: h
        //                   }}/>
        //     });
        // });


        const promise = new Promise(async () => {
            const image = await thisRef.load(img);

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



        // return Promise.all(promises);
        return promise;
    }


    update() {
        if (typeof this.props.src === 'undefined') {
            if (!this.state.blank) {
                let element = <div className={"async-photo"}
                                   style={{
                                       width: this.props.size,
                                       height: this.props.size
                                   }}/>;
                this.setState({...this.state, div: element, blank: true, src: ""});
            }
        } else {
            // todo: что будет, если уберем '.then(() => {})' ??
            this.getImage(this.props.src).then(() => {});
        }
    }


    componentDidMount() {
        this.update();
    }


    componentDidUpdate(prevProps, prevState, snapshot) {
        this.update();
    }

    shouldComponentUpdate(nextProps, nextState, nextContext) {
        return !(this.state.src === nextState.src && this.state.src === nextProps.src);
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