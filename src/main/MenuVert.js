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
            <div key={elements.length} className={itemClass}>SOCIALS</div>
        );
        elements.push(
            <div key={elements.length} className={itemClass}>CONTACT</div>
        );

        if (this.props.galleryMode) {
            return elements;
        }

        elements.splice(0, 0,
            <div key={elements.length}
                 className={itemClass}
                 onClick={() => {this.props.openAboutDialog()}}>
                ABOUT ME
            </div>);

        elements.push(
            <div key={elements.length}
                 id={"gallery-button"} className={itemClass}>GALLERY</div>
        );

        return elements;
    }


    render() {

        let itemClass = "menu-item large";
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
        }
    })
)(MenuVert)