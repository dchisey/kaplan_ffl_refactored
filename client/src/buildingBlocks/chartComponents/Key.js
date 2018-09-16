import React from 'react';
import styled from 'styled-components';

const Color = styled.div`
    display: inline-block;
    height: 10px;
    margin: 0;
    width: 10px;
    background-color: ${props => props.color};
`

const Key = styled.p`
    display: inline-block;
    line-height: 1;
    color: black;
    font-weight: bold;
    padding: 0px 5px;
    margin: 0;
`

const Container = styled.div`
    padding: 5px 10px;
`

export default ({ type, color }) => (
        <Container>
            <Color color={color} />
            <Key>{type}</Key>
        </Container>
)