import React, { Component } from 'react';

export default class SvgSpace extends Component {
    constructor(props) {
        super(props)
        this.svg = React.createRef()
    }

    componentDidMount() {
        if(this.props.getSpecs) {
            this.props.getSpecs(this.svg)
        }
    }

    render() {
        const style = {
            height: '400px',
            width: '50%',
            backgroundColor: '#ede8e8'
        }
        return (
            <svg style={style} ref={this.svg} ></svg>
        )
    } 
}