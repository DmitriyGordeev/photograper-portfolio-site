import React, {Component} from 'react';
import {connect} from "react-redux";
import "./Polaroid.css";
import jquery from "jquery";


const cardSize = "350px";

class Polaroid extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            className: "polaroid-card polaroid-card-hover",
            width: "auto",
            height: "auto"
        }
        this.imgRef = React.createRef();
    }


    onImageLoad = () => {
        console.log(this.imgRef.current.clientWidth + ", " + this.imgRef.current.clientHeight); // actual image size
        let w = this.imgRef.current.clientWidth;
        let h = this.imgRef.current.clientHeight;

        if (w >= h) {
            this.setState({
                width: cardSize,
                height: "auto"
            })
        } else {
            this.setState({
                width: "auto",
                height: cardSize
            })
        }
    };


    // сделать полое затемнение (эффект сцены?), когда polaroid в фокусе

    getClassFocused() {
        let className = this.state.className.replace("polaroid-card-hover", "");
        className = className + " active";
        console.log(`className = ${className}`);
        return className
    }

    getClassUnfocused() {
        let className = this.state.className.replace("active", "");
        className = className + " polaroid-card-hover";
        console.log(`className = ${className}`);
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

        return (
            <div className={className}
                 onClick={this.click}
                 style={this.props.style}>

                <div className={"inner"}>
                    <img ref={this.imgRef}
                         style={{
                             width: this.state.width,
                             height: this.state.height
                         }}
                         onLoad={this.onImageLoad}
                         src={this.props.src}
                         alt={this.props.alt}/>
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
