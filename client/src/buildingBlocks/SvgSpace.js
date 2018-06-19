import React, { Component } from 'react';
import BarChart from './BarChart'
import LineChart from './LineChart'
import styled from 'styled-components'
import { Spring } from 'react-spring'
import { Motion, spring } from 'react-motion'

const Svg = styled.svg`
    height: 100%;
    width: 100%;
    background-color: #ede8e8;
    gridRow: ${props => props.findAlignment().row} / span 1;
    gridColumn: ${props => props.findAlignment().column} / span 1;    
`

export default class SvgSpace extends Component {
    constructor(props) {
        super(props)
        this.state = { mounted: false }
        this.findAlignment = this.findAlignment.bind(this)
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

    findAlignment() {
        const { bottom, top, left, right } = this.props
        const row = bottom ? 2 : 1
        const column = right ? 2 : 1
        return { row, column }
    }

    render() {
        const textStyle = {
            fill: 'black',
            fontSize: '20px'
        }
        return (
            <Svg {...this.props} findAlignment={this.findAlignment} innerRef={this.svg}>
                {this.state.mounted ? this.props.render() : <h1>Still Loading...</h1>}              
            </Svg>
        )
    } 
}

