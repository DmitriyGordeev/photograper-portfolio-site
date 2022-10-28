import React, {Component} from 'react';
import {connect} from "react-redux";
import "./ContactDialog.css";
import jquery from "jquery";


class ContactDialog extends React.Component {
    constructor(props) {
        super(props);
    }

    stopClickPropagation(e) {
        e.stopPropagation();
    }

    sendEmail() {
        jquery.post(
            "./send_email.php",
            {"text": "HELLO THERE!"}
        ).done(
            function( data ) {
                alert("RESPONSE data:" + data);
            }
        );
    }

    render() {

        let contactTopPos = -window.innerHeight;
        if (this.props.storeData.contactDialogOpen) {
            contactTopPos = 0;
        }

        return (
            <div className={"contact-dialog-overlay"}
                 style={{
                     top: contactTopPos,
                     width: window.innerWidth,
                     height: window.innerHeight }}
                 onClick={() => {this.props.closeContactDialog()}}>

                <div id={"contact-dialog"}
                     onClick={(e) => {this.stopClickPropagation(e)}}>

                    <p>WRITE ME</p>
                    <div>
                        <input type="email" id="email" placeholder={"your email"}
                               size="30" required />
                    </div>
                    <div>
                        <textarea rows={5} id={"message"} placeholder={"Your message"} required />
                    </div>

                    <input id={"submit"} type={"submit"} value={"SEND"} onClick={() => {this.sendEmail()}}/>

                    <p id={"plain-email"}>
                        <span>or you can copy my email</span><br/>
                        <span>email@email.com</span>
                    </p>
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
        closeContactDialog: () => {
            dispatch({type: 'CONTACT_DIALOG_CLOSE'});
        },
    })
)(ContactDialog);
