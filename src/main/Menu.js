import React, {Component} from 'react';
import {connect} from 'react-redux';
import './Menu.css';


class Menu extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    render() {
        return (
            <div className={"top-menu-holder"}>
                <div className={"menu-item"}>
                    <p>
                        <a href={"https://google.com"}>
                            <span>ABOUT ME</span>
                        </a>
                    </p>
                </div>
                <div className={"menu-item"}>
                    <p>
                        <a href={"https://google.com"}>
                            <span>SOCIALS</span>
                        </a>
                    </p>
                </div>
                <div className={"menu-item"}>
                    <p>
                        <a href={"https://google.com"}>
                            <span>CONTACT</span>
                        </a>
                    </p>
                </div>
            </div>
        )
    }
}

export default connect(
    state => ({storeData: state}),
    dispatch => ({})
)(Menu)