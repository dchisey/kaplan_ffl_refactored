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
        if(this.props.getSpecs) {
            this.props.getSpecs(this.svg)
        }
        this.setState({ mounted: true })
    }

    componentDidUpdate() {
        if(this.props.getSpecs) {
            this.props.getSpecs(this.svg)
        }        
    }

    render() {
        const style = {
            height: '400px',
            width: '50%',
            backgroundColor: '#ede8e8'
        }
        return (
            <svg style={style} ref={this.svg}>
                {this.state.mounted ? this.props.render() : <h1>Still Loading...</h1>}
            </svg>
        )
    } 
}