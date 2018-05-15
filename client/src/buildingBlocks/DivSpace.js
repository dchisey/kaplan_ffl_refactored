import React, { Component } from 'react';
import styled from 'styled-components';

const Div = styled.div`
    background: #ede8e8;
    width: 100%;
    height: 500px;
`

export default class DivSpace extends Component {
    constructor(props) {
        super(props)
        this.state = { mounted: true }
    }

    render() {
        return (
            <Div>
                {this.state.mounted ? this.props.render() : <h1>Still Loading...</h1>}    
            </Div>)
    }
}