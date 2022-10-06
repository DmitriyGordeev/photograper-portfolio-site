import React, {Component} from 'react';
import {connect} from 'react-redux';
import './Gallery.css';


class Gallery extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    render() {
        return (
            <div>
            </div>
        )
    }
}

export default connect(
    state => ({storeData: state}),
    dispatch => ({})
)(Gallery)