import React, {Component} from 'react';
import {connect} from 'react-redux';
import './MenuVert.css';


class MenuVert extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }

    addItems(itemClass) {
        let elements = [];

        elements.push(
            <div key={elements.length}
                 className={"menu-item"}>
                <span className={itemClass}
                      onClick={() => {this.props.openSocialDialog()}}>SOCIALS</span>
            </div>
        );
        elements.push(
            <div key={elements.length}
                 className={"menu-item"}>
                <span className={itemClass}
                      onClick={() => {this.props.openContactDialog()}}>CONTACT</span>
            </div>
        );

        if (!this.props.storeData.galleryMode) {
            elements.splice(0, 0,
                <div key={elements.length}
                     className={"menu-item"}>
                    <span className={itemClass} onClick={() => {
                        this.props.openAboutDialog()
                    }}>ABOUT ME</span>
                </div>);

            elements.push(
                <div key={elements.length}
                     id={"gallery-button"}
                     onClick={() => {this.props.galleryOn()}}
                     className={"menu-item"}><span className={itemClass}>GALLERY</span></div>
            );

            return elements;
        }
        else {
            elements.splice(0, 0,
                <div key={elements.length}
                     className={"menu-item back-button"}>
                    <span className={itemClass} onClick={() => {this.props.galleryOff()}}>BACK</span>
                </div>);
        }

        return elements;
    }


    render() {

        let itemClass = " large";
        if (this.props.storeData.galleryMode) {
            itemClass = "menu-item small";
        }

        return (
            <div className={"menu-side"}>
                <div className={this.props.storeData.galleryMode ? "menu-simple" : "menu-center"}>
                    {this.addItems(itemClass)}
                </div>
            </div>
        )
    }
}

export default connect(
    state => ({storeData: state}),
    dispatch => ({
        openAboutDialog: (values) => {
            dispatch({type: 'ABOUT_DIALOG_OPEN'});
        },
        openSocialDialog: (values) => {
            dispatch({type: 'SOCIAL_DIALOG_OPEN'});
        },
        openContactDialog: (values) => {
            dispatch({type: 'CONTACT_DIALOG_OPEN'});
        },
        galleryOn: (values) => {
            dispatch({type: 'GALLERY_MODE_ON'});
        },
        galleryOff: (values) => {
            dispatch({type: 'GALLERY_MODE_OFF'});
        }
    })
)(MenuVert)