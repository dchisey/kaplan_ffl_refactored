import React, { Component } from 'react';
import styled from 'styled-components';
import Key from './Key'

const Legend = styled.div`
    display: flex;
    flex-direction: ${props => props.alignment == 'vertical' ? 'column': 'row'};
    flex-wrap: wrap;
    justify-content: center;
`

export default ({ quality, alignment }) => {
    return (
        <Legend>
            {quality.map((item, i) => <Key key={i} {...item}/>)}
        </Legend>
    )
}