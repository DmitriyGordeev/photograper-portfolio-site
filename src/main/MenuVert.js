import React, {Component} from 'react';
import {connect} from 'react-redux';
import './MenuVert.css';


class MenuVert extends React.Component {
    constructor(props) {
        super(props);
        // this.state = {
        //     socialsX: 0,
        //     socialsY: 0,
        //     socialsW: 0,
        //     socialsH: 0
        // }
        // this.socialRef = React.createRef();
    }


    componentDidMount() {
    }


    addItems(itemClass) {
        let elements = [];

        elements.push(
            <div key={elements.length}
                 className={"menu-item"}
                 onClick={() => {this.props.openSocialDialog()}}><span className={itemClass}>SOCIALS</span></div>
        );
        elements.push(
            <div key={elements.length}
                 className={"menu-item"}
                 onClick={() => {this.props.openContactDialog()}}><span className={itemClass}>CONTACT</span></div>
        );

        if (this.props.galleryMode) {
            return elements;
        }

        elements.splice(0, 0,
            <div key={elements.length}
                 className={"menu-item"}>
                <span className={itemClass} onClick={() => {this.props.openAboutDialog()}}>ABOUT ME</span>
            </div>);

        elements.push(
            <div key={elements.length}
                 id={"gallery-button"} className={"menu-item"}><span className={itemClass}>GALLERY</span></div>
        );

        return elements;
    }


    render() {

        let itemClass = " large";
        if (this.props.galleryMode) {
            itemClass = "menu-item small";
        }

        return (
            <div className={"menu-side"}>
                <div className={this.props.galleryMode ? "menu-simple" : "menu-center"}>
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
        }
    })
)(MenuVert)