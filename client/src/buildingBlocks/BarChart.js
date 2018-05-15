import React, { Component } from 'react'
//import styled from 'styled-components';
import Axis from './chartComponents/Axis'
import Bar from './chartComponents/Bar'
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
        this.buildScales = this.buildScales.bind(this)
        this.createGraph = this.createGraph.bind(this)
    }

    componentDidMount() {        
        this.buildScales()
    }

    buildScales() {
        const { svgSpecs, leagueData } = this.props
        const { width, height } = svgSpecs
        const { stat, margin, padding } = this.state

        const xScale = d3.scaleBand()
            .domain(leagueData.map(entry => entry._id.split(' ')[0]))
            .rangeRound([0, width - margin.right - margin.left])
            
        const yScale = d3.scaleLinear()
            .range([height - margin.bottom, 0])
            .domain(d3.extent(leagueData.map(entry => entry[stat])))
            .nice(3)

        const barScale = d3.scaleLinear()
            .range([0, height - margin.bottom])
            .domain(d3.extent(leagueData.map(entry => entry[stat])))
            .nice(3)

        this.setState({
            width,
            height,
            xScale,
            yScale,
            barScale,
            mounted: true
        })
    }

    createGraph() {
        const { xScale, yScale, margin, width, height, stat } = this.state
        const barTranslation = { transform: `translate(4px, 0)`}
        const { ownerFocus, hoverFocus, changeOwnerFocus, changeHoverFocus, removeHoverFocus, leagueData } = this.props

        return (
            <g transform={`translate(${margin.left}, 0)`}>
                <Axis scale={xScale} orient="x" dimensions={{ width, height, margin }} leagueData={this.props.leagueData} />
                <Axis scale={yScale} orient="y" dimensions={{ width, height, margin }} leagueData={this.props.leagueData} />
                <g style={barTranslation}>
                    {leagueData.map((owner, index) => 
                        <Bar {...this.state}
                            dataPoint={owner[stat]} 
                            index={index} 
                            key={index}
                            ownerFocus={ownerFocus} 
                            hoverFocus={hoverFocus}
                            owner={owner._id} 
                            changeOwnerFocus={changeOwnerFocus}
                            changeHoverFocus={changeHoverFocus}
                            removeHoverFocus={removeHoverFocus}
                            />)}
                </g>
            </g>
        )
    }

    render() {
        return (
            <g>
                {this.state.mounted ? this.createGraph() : <h1>Loading</h1>}
            </g>
        )
    }
}

export default BarChart