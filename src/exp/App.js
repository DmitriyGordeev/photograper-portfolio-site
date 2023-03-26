import React, {Component} from 'react';
import {connect} from "react-redux";
import "./App.css";


class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }

    render() {
        return (
            <div/>
        );
    }
}

export default connect(
    state => ({
        storeData: state
    }),
    dispatch => ({})
)(App);