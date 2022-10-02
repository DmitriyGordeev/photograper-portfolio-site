import React, {Component} from 'react';
import {connect} from "react-redux";
import "./Polaroid.css";


class Polaroid extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    // сделать полое затемнение (эффект сцены?), когда polaroid в фокусе

    render() {
        return (
            <div className={"polaroid-card"}
                 style={this.props.style}>
                <img src={this.props.src} alt={this.props.alt} />
            </div>
        )
    }
}


export default connect(
    state => ({
        storeData: state
    }),
    dispatch => ({
        // onUpdateValues: (values) => {
        //     dispatch({ type: 'UPDATE_VALUES', values: values});
        // }
    })
)(Polaroid);
