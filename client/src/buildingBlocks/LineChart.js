import React, { Component } from 'react';
import Line from './chartComponents/Line';
import Axis from './chartComponents/Axis';
import * as d3 from 'd3';

export default class LineChart extends Component {
    constructor(props) {
        super(props);
        this.state = {
            mounted: false,
            stat: 'Pts',
            margin: {
                top: 50,
                right: 20,
                bottom: 105,
                left: 50
            },
            padding: 2
        }
        this.createGraph = this.createGraph.bind(this)
        this.buildScales = this.buildScales.bind(this)
    }

    componentDidMount() {
        window.addEventListener('resize', this.buildScales)
        this.buildScales()
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.lineToggle !== this.props.lineToggle) {
            this.buildScales('_', nextProps)
        }
    }

    buildScales(e, nextProps) {
        const { leagueData, weekStart, weekEnd } = nextProps || this.props
        const { svgSpecs } = this.props
        const { height, width } = svgSpecs
        const { margin, stat } = this.state
        const everyWkScore = leagueData.map(owner => owner.History.map(wk => wk.Pts))
        const flattenedScores = [].concat.apply([], everyWkScore)

        const xScale = d3.scaleLinear()
            .domain([weekStart, weekEnd])
            .range([0, width - margin.left - margin.right])

        const yScale = d3.scaleLinear()
            .domain(d3.extent(flattenedScores).reverse())
            .rangeRound([0, height - margin.bottom])
            .nice()

        const line = d3.line()
            .x((d, i) => xScale(i + weekStart))
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
        const { xScale, yScale, margin, width, height } = this.state
        const { leagueData, ownerFocus, hoverFocus, changeOwnerFocus, 
                changeHoverFocus, removeHoverFocus, title, rotation,
                weekArray, previousWeekStart  } = this.props
        const textStyle = {
            fill: 'black',
            fontSize: '25px',
            fontWeight: 'bold',
            textAnchor: 'middle'
        }
        return (
            <g transform={`translate(${margin.left}, 0)`}>
                <Axis scale={xScale} 
                    orient="x" 
                    dimensions={{ width, height, margin }} 
                    leagueData={leagueData}
                    rotation={rotation}
                    ticks={weekArray} />
                <Axis scale={yScale}
                    orient="y" 
                    dimensions={{ width, height, margin }} 
                    leagueData={leagueData} />
                {leagueData.map((owner, index) => {
                    const history = owner.History
                    return <Line 
                        {...this.state}
                        history={history} 
                        ownerFocus={ownerFocus} 
                        hoverFocus={hoverFocus}
                        owner={owner._id} 
                        previousWeekStart={previousWeekStart}
                        changeOwnerFocus={changeOwnerFocus}
                        changeHoverFocus={changeHoverFocus}
                        removeHoverFocus={removeHoverFocus}
                        key={index} />
                })}
                <text 
                    x={(width - margin.left - margin.right) / 2}
                    y={margin.top / 1.5}
                    style={textStyle}>{title}</text>
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