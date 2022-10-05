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
                <ul>
                    <li className={"menu-item"}>
                        <div className={"hover-underlay"}></div>
                        <a href={"https://google.com"}><span>ABOUT ME</span></a>
                    </li>
                    <li className={"menu-item"}>
                        <div className={"hover-underlay"}>
                            <div></div>
                        </div>
                        <a href={"https://google.com"}><span>SOCIALS</span></a>
                    </li>
                    <li className={"menu-item"}>
                        <div className={"hover-underlay"}>
                            <div></div>
                        </div>
                        <a href={"https://google.com"}><span>CONTACT</span></a>
                    </li>
                </ul>
            </div>
        )
    }
}

export default connect(
    state => ({storeData: state}),
    dispatch => ({})
)(Menu)