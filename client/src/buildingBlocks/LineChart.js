import React, { Component } from 'react';
import Line from './chartComponents/Line';
import SvgSpace from './SvgSpace'

export default class LineChart extends Component {
    constructor(props) {
        super(props);
        this.createGraph = this.createGraph.bind(this)
    }

    createGraph() {

    }

    render() {
        console.log(this.props)
        return (
            <SvgSpace getSpecs={this.props.getSpecs}>ass butt</SvgSpace>
        )
    }
}