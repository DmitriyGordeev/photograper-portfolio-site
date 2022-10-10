import React, {Component} from 'react';
import {connect} from 'react-redux';
import './MenuVert.css';


class MenuVert extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    render() {
        return (
            <div className={"menu-side"}>
                <div className={"menu-center"}>
                    <div className={"menu-item"}>ABOUT ME</div>
                    <div className={"menu-item"}>SOCIALS</div>
                    <div className={"menu-item"}>CONTACT</div>
                    <div id={"gallery-button"} className={"menu-item"}>GALLERY</div>
                </div>
            </div>
        )
    }
}

export default connect(
    state => ({storeData: state}),
    dispatch => ({})
)(MenuVert)