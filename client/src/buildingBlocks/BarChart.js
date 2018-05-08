import React, { Component } from 'react'
//import styled from 'styled-components';
import Axis from './chartComponents/Axis'
import Bar from './chartComponents/Bar'
import SvgSpace from './SvgSpace'
import * as d3 from 'd3';

class BarChart extends Component {
    constructor(props) {
        super(props);
        this.state = {
            mounted: false,
            stat: 'Pts',
            margin: {
                top: 20,
                right: 20,
                bottom: 70,
                left: 50
            },
            padding: 2
        }
        this.getSpecs = this.getSpecs.bind(this)
        this.createGraph = this.createGraph.bind(this)
        this.svg = React.createRef()
    }

    componentDidMount() {        
        this.getSpecs()
    }

    getSpecs() {
        const svg = this.svg.current;
        const width = svg.clientWidth;
        const height = svg.clientHeight;
        const { stat, margin, padding } = this.state
        const leagueData = this.props.leagueData;
        const xScale = d3.scaleBand()
            .domain(leagueData.map(entry => entry._id.split(' ')[0]))
            .rangeRound([0, width - margin.right - margin.left])
            

        const yScale = d3.scaleLinear()
                        .range([height - margin.bottom, 0])
                        .domain(d3.extent(leagueData.map(entry => entry[stat])))
                        // .domain([0, d3.max(leagueData, entry => entry[stat])]);

        const barScale = d3.scaleLinear()
                        .range([0, height - margin.bottom])
                        .domain(d3.extent(leagueData.map(entry => entry[stat])))
                        // .domain([0, d3.max(leagueData, entry => entry[stat])]);

        this.setState({
            width: width,
            height: height,
            xScale: xScale,
            yScale: yScale,
            barScale: barScale,
            mounted: true
        })
    }

    createGraph() {
        const { xScale, yScale, margin, width, height, stat } = this.state
        const barTranslation = { transform: `translate(4px, 0)`}
        const leagueData = this.props.leagueData

        return (
            <g transform={`translate(${margin.left}, 0)`}>
                <Axis scale={xScale} orient="x" dimensions={{ width, height, margin }} leagueData={this.props.leagueData} />
                <Axis scale={yScale} orient="y" dimensions={{ width, height, margin }} leagueData={this.props.leagueData} />
                <g style={barTranslation}>
                    {leagueData.map((entry, index) => <Bar {...this.state} dataPoint={entry[stat]} index={index} />)}
                </g>
            </g>
        )
    }

    render() {
        return (
            <svg style={this.props.style} ref={this.svg}>
                {this.state.mounted ? this.createGraph() : <h1>Loading</h1>}
            </svg>
        )
    }
}

export default BarChart