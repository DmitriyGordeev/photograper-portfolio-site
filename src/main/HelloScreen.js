import React from 'react';
import {connect} from "react-redux";
import './texts.css';
import './HelloScreen.css';


import textData from "./TextData";


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

        let continueTopPos = window.innerHeight * 0.8;
        let headerMarginTop = 100;

        return (
            <div id={"hello-screen-overlay"}
                 className={overlayClass}
                 style={{left: overlayLeftOffset}}>
                <div>
                    <h1 className={"text center-text " + this.state.class1} style={{ marginTop: headerMarginTop }}>{textData.helloScreenTitle()}</h1>
                    <h2 className={"text left-text " + this.state.class2}>{textData.helloScreenText1()}</h2>
                    <h2 className={"text right-text " + this.state.class3}>{textData.helloScreenText2()}</h2>
                    <h2 className={"text left-text " + this.state.class4}>
                        {textData.helloScreenText3()}
                        <a className={"link-ref"} href={textData.getProfileUrl()}>{textData.helloScreenTextRef()}</a>
                    </h2>
                </div>

                <div id={"continue-button"}
                     style={{top: continueTopPos}}
                     className={this.state.class2}
                     onClick={() => { this.props.hideScreen() }}>
                    <span>{textData.helloScreenContinue()}</span>
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