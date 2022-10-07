import React, {Component} from 'react';
import {connect} from "react-redux";


class ImageHelper extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loaded: false
        }
    }

    render() {
        return (
            <img src={this.props.src}
                 alt={this.props.alt}
                 style={this.state.loaded ? {} : {background: 'white'}}
                 onLoad={() => this.setState({loaded: true})}/>
        )
    }
}


export default connect(
    state => ({
        storeData: state
    }),
    dispatch => ({
    })
)(ImageHelper);