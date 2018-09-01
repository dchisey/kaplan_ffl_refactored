import React, { Component } from 'react';
import styled from 'styled-components';

const Query = styled.h1`
    line-height:1;
`

const Input = styled.input`
    font-family: 'Bungee Hairline', sans-sarif;
    outline: none;
    border:none;
    background-color: transparent;
`


class OwnerPerformance extends Component {
    render() {
        return (
            <div>
                <Query>Show me <Input type="text" /></Query>
                
            </div>
        )
    }
}

export default OwnerPerformance;