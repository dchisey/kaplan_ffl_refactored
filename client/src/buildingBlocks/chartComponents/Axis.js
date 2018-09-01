import React, { Component } from 'react';
import * as d3 from 'd3';

class Axis extends Component {
    constructor(props) {
        super(props);
        this.createAxis = this.createAxis.bind(this)
        this.currAxis = React.createRef()
    }

    componentDidMount() {
        this.createAxis()
    }

    componentDidUpdate() {
        this.createAxis()
    }

    createAxis() {
        const currAxis = this.currAxis.current;
        const { scale, orient, dimensions, leagueData, rotation, ticks } = this.props;
        const { width, height, margin } = dimensions;
        const isX = orient == 'x'
        const scaledAxis = isX ? d3.axisBottom(scale) : d3.axisLeft(scale);
        const textAnchor = +rotation ? 'end' : 'middle'
        console.log(ticks)
        scaledAxis.ticks(ticks)
        
        if(isX) {
            d3.select(currAxis).call(scaledAxis)
                .attr('transform', `translate(0, ${height - margin.bottom + margin.top})`)
              .selectAll('text')  
                .attr('text-anchor', textAnchor)
                .attr('transform', `rotate(${rotation})`)
        } else {
            d3.select(currAxis).call(scaledAxis)
                .attr('transform', `translate(0, ${margin.top})`)
        }
    }

    render() {
        return (
            <g ref={this.currAxis} className="axis"></g>
        )
    }
}

export default Axis;