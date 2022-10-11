import React, {Component} from 'react';
import {connect} from 'react-redux';
import './MenuVert.css';


class MenuVert extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }

    render() {

        let itemClass = "menu-item large";
        if (this.props.galleryMode) {
            itemClass = "menu-item small";
        }

        return (
            <div className={"menu-side"}>
                <div className={"menu-center"}>
                    <div className={itemClass}>ABOUT ME</div>
                    <div className={itemClass}>SOCIALS</div>
                    <div className={itemClass}>CONTACT</div>
                    <div id={"gallery-button"} className={itemClass}>GALLERY</div>
                </div>
            </div>
        )
    }
}

export default connect(
    state => ({storeData: state}),
    dispatch => ({})
)(MenuVert)