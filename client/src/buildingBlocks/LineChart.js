import React, { Component } from 'react';
import Line from './chartComponents/Line';
import Axis from './chartComponents/Axis';
import SvgSpace from './SvgSpace';
import * as d3 from 'd3';

export default class LineChart extends Component {
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
        this.createGraph = this.createGraph.bind(this)
        this.buildScales = this.buildScales.bind(this)
    }

    componentDidMount() {
        this.buildScales()
    }

    buildScales() {
        const { svgSpecs, leagueData } = this.props
        const { height, width } = svgSpecs
        const { margin, stat } = this.state
        const everyWkScore = leagueData.map(owner => owner.History.map(wk => wk.Pts))
        const flattenedScores = [].concat.apply([], everyWkScore)

        const xScale = d3.scaleLinear()
            .domain([1, leagueData[0].Week])
            .range([0, width - margin.left - margin.right])

        const yScale = d3.scaleLinear()
            .domain(d3.extent(flattenedScores).reverse())
            .rangeRound([0, height - margin.bottom])
            .nice()

        const line = d3.line()
            .x((d, i) => xScale(i + 1))
            .y((d, i) => yScale(d[stat]) + margin.top)
            .curve(d3.curveMonotoneX)
               
        this.setState({
            height,
            width,
            xScale,
            yScale,
            line,
            mounted: true
        })
    }

    createGraph() {
        const { xScale, yScale, margin, width, height, stat, line } = this.state
        const { leagueData, ownerFocus, hoverFocus, changeOwnerFocus, changeHoverFocus, removeHoverFocus } = this.props
        return (
            <g transform={`translate(${margin.left}, 0)`}>
                <Axis scale={xScale} orient="x" dimensions={{ width, height, margin }} leagueData={this.props.leagueData} />
                <Axis scale={yScale} orient="y" dimensions={{ width, height, margin }} leagueData={this.props.leagueData} />
                {leagueData.map((owner, index) => {
                    const history = owner.History
                    return <Line 
                        {...this.state}
                        history={history} 
                        ownerFocus={ownerFocus} 
                        hoverFocus={hoverFocus}
                        owner={owner._id} 
                        changeOwnerFocus={changeOwnerFocus}
                        changeHoverFocus={changeHoverFocus}
                        removeHoverFocus={removeHoverFocus}
                        key={index} />
                })}
            </g>
        )
    }

    render() {
        return (
            <g>
                {this.state.mounted ? this.createGraph() : <h1>eat ass</h1>}
            </g>
        )
    }
}