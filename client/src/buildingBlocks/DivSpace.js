import React, { Component } from 'react';
import styled from 'styled-components';
import { Transition, config } from 'react-spring';

const Div = styled.div`
    background: #ede8e8;
    width: 100%;
    ${props => {
        const grid = props.grid
        if(grid) {
            return `grid-column: ${grid.column}; grid-row: ${grid.row}`
        } else {
            return 'margin: 10px 0px;'
        }
    }}
`

export default class DivSpace extends Component {
    constructor(props) {
        super(props)
        this.state = { mounted: true }
    }

    componentDidMount() {
        console.log('div mounted')
    }

    componentWillUnmount() {
        console.log('div unmounted')
    }

    render() {
        return (
            // <Transition config={config.slow} 
            //     from={{ opacity: 0, height: 0 }} 
            //     enter={{ opacity: 1, height: 710 }}
            //     leave={{ opacity: 0, height: 0 }}
            //     >
            //     {styles => (
            //         <Div style={styles} {...this.props}>
            //             {this.state.mounted ? this.props.render() : <h1>Still Loading...</h1>}    
            //         </Div>
            //     )}
            // </Transition>
            <Div {...this.props}>
                {this.state.mounted ? this.props.render() : <h1>Still Loading...</h1>}    
            </Div>
        )
    }
}

