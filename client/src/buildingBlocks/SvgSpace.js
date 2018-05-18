import React, { Component } from 'react';
import BarChart from './BarChart'
import LineChart from './LineChart'

export default class SvgSpace extends Component {
    constructor(props) {
        super(props)
        this.state = { mounted: false }
        this.svg = React.createRef()
    }

    componentDidMount() {
        window.addEventListener('resize', (e) => this.props.getSpecs(e, this.svg))
        if(this.props.getSpecs) {
            this.props.getSpecs('', this.svg)
        }
        this.setState({ mounted: true })
    }

    componentDidUpdate() {
        if(this.props.getSpecs) {
            this.props.getSpecs('', this.svg)
        }        
    }

    render() {
        const svgStyle = {
            height: '400px',
            width: '50%',
            backgroundColor: '#ede8e8'
        }

        const textStyle = {
            fill: 'black',
            fontSize: '20px'
        }

        return (
            <svg style={svgStyle} ref={this.svg}>
                {this.state.mounted ? this.props.render() : <h1>Still Loading...</h1>}              
            </svg>
        )
    } 
}