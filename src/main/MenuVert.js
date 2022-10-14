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

        if (this.props.galleryMode) {
            elements.splice(0, 0,
                <div key={elements.length}
                     className={"menu-item"}
                     style={{marginBottom: 20}}>
                <span className={itemClass} style={{fontSize: 16}}
                      onClick={() => {}}>BACK</span>
                </div>
            );
            return elements;
        }

        elements.splice(0, 0,
            <div key={elements.length}
                 className={"menu-item"}>
                <span className={itemClass} onClick={() => {this.props.openAboutDialog()}}>ABOUT ME</span>
            </div>);

        elements.push(
            <div key={elements.length}
                 id={"gallery-button"}
                 className={"menu-item"}><span className={itemClass}>GALLERY</span></div>
        );

        return elements;
    }


    render() {

        let itemClass = " large";
        let marginTop = 0;
        if (this.props.galleryMode) {
            itemClass = "menu-item small";
            marginTop = 0;
        }

        return (
            <div className={"menu-side"} style={{marginTop: marginTop}}>
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