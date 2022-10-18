import React from 'react';
import {connect} from "react-redux";


import './texts.css';
import './HelloScreen.css';


class HelloScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
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
        }, 1000);

        setTimeout(() => {
            thisRef.setState({...thisRef.state, class2: "class-visible"});
        }, 1500);

        setTimeout(() => {
            thisRef.setState({...thisRef.state, class3: "class-visible"});
        }, 3000);

        setTimeout(() => {
            thisRef.setState({...thisRef.state, class4: "class-visible"});
        }, 4000);
    }

    render() {
        return (
            <div id={"hello-screen-overlay"}>
                <div>
                    <h1 className={"text center-text " + this.state.class1}>Hi, my name is </h1>
                    <h2 className={"text left-text " + this.state.class2}>I like photography and video-editing</h2>
                    <h2 className={"text right-text " + this.state.class3}>I travel around the world <br/>to capture memorable moments</h2>
                    <h2 className={"text left-text " + this.state.class4}>You can find my profile here</h2>
                </div>

                <div id={"continue-button"}><span>CONTINUE</span></div>
            </div>
        )
    }
}


export default connect(
    state => ({storeData: state}),
    dispatch => ({
        // onFocus: (imgIndex) => {
        //     dispatch({type: 'GALLERY_FOCUSED', imgIndex: imgIndex});
        // },
        // onUnfocus: (imgIndex) => {
        //     dispatch({type: 'GALLERY_UNFOCUSED'});
        // }
    })
)(HelloScreen)