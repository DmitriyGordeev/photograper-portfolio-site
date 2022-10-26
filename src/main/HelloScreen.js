import React from 'react';
import {connect} from "react-redux";


import './texts.css';
import './HelloScreen.css';


class HelloScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            overlayLeftOffset: 0,
            overlayClass: "helloscreen-visible",
            class1: "class-invisible",
            class2: "class-invisible",
            class3: "class-invisible",
            class4: "class-invisible",
        }
    }


    componentDidMount() {
        let thisRef = this;
        setTimeout(() => {
            thisRef.setState({...thisRef.state, class1: "class-visible"});
        }, 900);

        setTimeout(() => {
            thisRef.setState({...thisRef.state, class2: "class-visible"});
        }, 1800);

        setTimeout(() => {
            thisRef.setState({...thisRef.state, class3: "class-visible"});
        }, 2700);

        setTimeout(() => {
            thisRef.setState({...thisRef.state, class4: "class-visible"});
        }, 3600);
    }


    render() {

        let overlayLeftOffset = "-100vw";
        let overlayClass = "helloscreen-invisible";
        if (this.props.storeData.helloScreen) {
            overlayClass = "helloscreen-visible";
            overlayLeftOffset = 0;
        }


        return (
            <div id={"hello-screen-overlay"}
                 className={overlayClass}
                 style={{left: overlayLeftOffset}}>
                <div>
                    <h1 className={"text center-text " + this.state.class1} style={{marginTop: 100}}>Hi, my name is </h1>
                    <h2 className={"text left-text " + this.state.class2}>I like photography and video-editing</h2>
                    <h2 className={"text right-text " + this.state.class3}>I travel around the world <br/>to capture memorable moments</h2>
                    <h2 className={"text left-text " + this.state.class4}>You can find my profile here</h2>
                </div>

                <div id={"continue-button"}
                     className={this.state.class2}
                     onClick={() => { this.props.hideScreen() /*this.setState({
                         ...this.state,
                         overlayLeftOffset: "-100vw",
                         overlayClass: "helloscreen-invisible"
                     })*/ }}>
                    <span>CONTINUE</span>
                </div>
            </div>
        )
    }
}


export default connect(
    state => ({storeData: state}),
    dispatch => ({
        hideScreen: () => {
            dispatch({type: 'HELLOSCREEN_HIDDEN'});
        }
    })
)(HelloScreen)