import React, {Component} from 'react';
import {connect} from "react-redux";
import "./AboutDialog.css";
import closeButton from "../../resources/images/close_dark.svg";
import portraitExample2 from "../../resources/images/portrait2.jpg";
import instagramIcon from "../../resources/images/instagram_icon.svg";
import vkIcon from "../../resources/images/vk_icon.svg";


import textData from "./TextData";


class AboutDialog extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            width: 0
        };
        this.ref = React.createRef();
    }

    componentDidMount() {
        // this will define how wide is 'About Me' dialog window
        this.setState({
            ...this.state,
            width: this.ref.current.offsetWidth
        });
    }

    render() {

        // change position of the entire dialog when it's open,
        // i.e 'this.props.storeData.aboutMe' = true
        let aboutPos = window.innerWidth;
        if (this.props.storeData.aboutMe) {
            aboutPos = window.innerWidth - this.state.width;
        }

        // adjusting sizes for `AboutMe` in case it's mobile device
        let aboutMeDialogWidth = window.innerWidth * 0.6;
        let aboutMeDialogHeight = window.innerHeight;
        if (window.screen.width <= 480) {
            aboutMeDialogWidth = window.innerWidth;
        }


        return (
            <div ref={this.ref}
                 className={"about-dialog"}
                 style={{left: aboutPos, width: aboutMeDialogWidth, height: aboutMeDialogHeight }}>

                <div className={"header-bar"}>
                    <div id={"about-close-button"} onClick={() => {this.props.closeAboutDialog()}}>
                        <img src={closeButton} alt={""}/>
                    </div>
                </div>

                <div id={"about-content-wrapper"}>
                    <div id={"about-top-block"}>
                        <p>{textData.aboutDialogTitle()}</p><br/>
                        <div style={{margin: "0 auto", width: "fit-content"}}>
                            <div className={"about-photo-wrapper"}>
                                <img src={portraitExample2} alt={""}/>
                            </div>
                        </div>
                    </div>
                    <div id={"about-bottom-block"}>
                        <br/><p className={"mini-header"}>{textData.aboutDialogName()}</p>

                        <p>{textData.aboutDialogMain()}</p>

                        <div className={"write-me-button"}
                             onClick={() => {this.props.openContactDialog()}}>
                            {textData.aboutDialogWriteMeButton()}
                        </div><br/>
                        <p className={"about-socials"}>{textData.aboutDialogBottomLine()}</p>
                        <div className={"socials-stroke"}>
                            <div><img src={instagramIcon} alt={"instagram_icon"} onClick={() => {
                                window.open("https://google.com");
                            }}/></div>
                            <div><img src={vkIcon} alt={"instagram_icon"}/></div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}


export default connect(
    state => ({
        storeData: state
    }),
    dispatch => ({
        closeAboutDialog: (values) => {
            dispatch({type: 'ABOUT_DIALOG_CLOSE'});
        },
        openContactDialog: (values) => {
            dispatch({type: 'CONTACT_DIALOG_OPEN'});
        },
    })
)(AboutDialog);
