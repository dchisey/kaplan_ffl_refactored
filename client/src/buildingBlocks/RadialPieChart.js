import React, { Component } from 'react';
import Arc from './chartComponents/Arc';

class RadialPieChart extends Component {
    constructor(props) {
        super(props);
        this.state = {
            mounted: false
        }
        this.createRadialPie = this.createRadialPie.bind(this)
    }

    componentDidMount() {
        this.getSpecs()
    }

    getSpecs() {
        const svg = this.svg.current;
        const width = svg.clientWidth;
        const height = svg.clientHeight;
        const radius = Math.min(width, height) / 2;
        const { stat, margin, padding } = this.state
        const leagueData = this.props.leagueData;

        const arc = d3.arc()
        arc({ 
            innerRadius: radius - 70,
            outerRadius: radius - 10
        })

        this.setState({
            height,
            width,
            radius,
            mounted: true
        })
    }

    createRadialPie() {

    }

    render() {
        return (
            <svg style={this.props.style} ref={this.svg}>
                {this.state.mounted ? this.createRadialPie() : <h1>Loading</h1>}
            </svg>
        )
    }
}

export default RadialPieChart