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
        const { scale, orient, dimensions, leagueData } = this.props;
        const { width, height, margin } = dimensions;
        const isX = orient == 'x'
        const scaledAxis = isX ? d3.axisBottom(scale) : d3.axisLeft(scale);
        if(isX) {
            d3.select(currAxis).call(scaledAxis)
                .attr('transform', `translate(0, ${height - margin.bottom + margin.top})`)
              .selectAll('text')  
                .attr('text-anchor', 'end')
                .attr('transform', 'rotate(-45)')
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