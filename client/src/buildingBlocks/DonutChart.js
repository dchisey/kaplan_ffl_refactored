import React, { Component } from 'react';
import Arc from './chartComponents/Arc';
import * as d3 from 'd3'

class RadialPieChart extends Component {
    constructor(props) {
        super(props);
        this.state = {
            mounted: false
        }
        this.createRadialPie = this.createRadialPie.bind(this)
        this.aggregateStats = this.aggregateStats.bind(this)
    }

    componentDidMount() {
        this.setState({ mounted: true })
    }

    aggregateStats(statObject) {
        return statObject.reduce((agg, currQs) => {
            const key = this.findQs(currQs)
            if(!agg[key]){ 
                agg[key] = Math.abs(currQs[key])
            } else {
                agg[key] += Math.abs(currQs[key])
            }
        
            return agg
        }, {})
    }

    findQs(history) {
        switch(history.WeeklyQS) {
            case 3:
                return 'Elite';
                break;
            case 2:
                return 'Superior';
                break;
            case 1:
                return 'MeanPlus';
                break;
            case -3:
                return 'Abyssmal';
                break;
            case -2:
                return 'Inferior';
                break;
            case -1:
                return 'MeanMinus';
                break;
            default:
                return;
        }
    }

    createRadialPie() {
        const quality = [
            { type: 'Abyssmal', color: '#C11C17' }, 
            { type: 'Inferior', color: '#DE5003' }, 
            { type: 'MeanMinus', color: '#EFCE10' }, 
            { type: 'MeanPlus', color: '#ACD62A' }, 
            { type: 'Superior', color: '#228B22' }, 
            { type: 'Elite', color: '#4169e1' }
        ];
        const { svgSpecs } = this.props
        const { width, height } = svgSpecs
        const radius = Math.min(width, height) / 2;
        const data = typeof this.props.data == 'object'
            ? Object.entries(this.aggregateStats(this.props.data.History))
            : this.props.data
        const arc = d3.arc().innerRadius(radius - 20).outerRadius(radius - 70)
        const pie = d3.pie()
        
        pie.value(stat => {
            if(quality && quality.map(quality => quality.type).includes(stat[0])) {
                return stat[1]
            }
        })
        const filteredPie = pie(data).filter(pieData => pieData.value)
        const totalQs = Object.entries(this.props.data).reduce((accumulator, current) => {
            const quality = ['Elite', 'Superior', 'Inferior', 'Abyssmal', 'MeanPlus', 'MeanMinus'];

            if(quality.indexOf(current[0]) !== -1) {
                accumulator += current[1]
            }

            return accumulator
        }, 0)

        return (
            //randomly generates a key to trigger the diff and re-translate the <g>
            <g key={Math.random()} style={{ transform: `translate(50%, 50%)` }}>
                {filteredPie.map(stat => {
                    const textCoordinates = arc.centroid(stat)
                    const textTranslation = `translate(${textCoordinates})translate(-2,2)`
                    const color = quality.filter(qual => {
                        if(qual.type == stat.data[0]) return qual.color
                    })[0].color
                    return (
                        <g>
                            <path d={arc({
                                startAngle: stat.startAngle,
                                endAngle: stat.endAngle,
                                padAngle: 0.02
                            })} style={{ fill: color }}></path>
                            <text style={{ stroke: 'white', textAnchor: 'middle' }} transform={textTranslation}>{Math.abs(stat.value)}</text>
                        </g>
                )})}
                <text x='0' y='-48' style={{ textAnchor: 'middle', fontSize: 24, fontWeight: 700 }}>
                    <tspan x='0' dy='1.2em'>SEASON</tspan>
                    <tspan x='0' dy='1.2em'>QUALITY</tspan>
                    <tspan x='0' dy='1.4em' style={{ fontSize: 30 }}>{totalQs}</tspan>
                </text>
            </g>
        )
    }

    render() {
        const { svgSpecs } = this.props
        const { width, height } = svgSpecs
        return (
            <svg style={{...svgSpecs}}>
                {this.state.mounted ? this.createRadialPie() : <h1>Loading</h1>}
            </svg>
        )
    }
}

export default RadialPieChart