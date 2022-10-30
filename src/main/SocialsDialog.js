import React, {Component} from 'react';
import {connect} from "react-redux";
import './SocialsDialog.css';


import textData from "./TextData";


class SocialsDialog extends React.Component {
    constructor(props) {
        super(props);
    }

    stopClickPropagation(e) {
        e.stopPropagation();
    }

    render() {

        let socialsTopPos = window.innerHeight;
        if (this.props.storeData.socialOpen) {
            socialsTopPos = 0;
        }

        return (
            <div className={"socials-dialog"}
                 style={{top: socialsTopPos}}
                 onClick={() => {this.props.closeSocialDialog()}}>
                <div onClick={(e) => {this.stopClickPropagation(e)}}>
                    <p style={{marginTop: 20, marginBottom: 20}}>{textData.socialsTitle()}</p>

                    <div className={"socials-item"}>
                        <div>
                            <a  target="_blank" href={"https://google.com"}>Instagram</a>
                        </div>
                    </div>

                    <div className={"socials-item"}>
                        <div>
                            <a  target="_blank" href={"https://google.com"}>VK</a>
                        </div>
                    </div>

                </div>
            </div>
        );
    }


}


export default connect(
    state => ({
        storeData: state
    }),
    dispatch => ({
        closeSocialDialog: (values) => {
            dispatch({type: 'SOCIAL_DIALOG_CLOSE'});
        },
    })
)(SocialsDialog);