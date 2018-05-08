import React, { Component } from 'react';
import * as d3 from 'd3';
import styled from 'styled-components';

const Rect = styled.rect`
    fill: green;
`

export default ({ xScale, barScale, dataPoint, height, margin, index, padding }) => {
    const style = {
        width: xScale.bandwidth() - padding + 'px',
        height: barScale(dataPoint),
        transform: `translate(${xScale.bandwidth() * index}px, ${height - margin.bottom + margin.top - barScale(dataPoint)}px`
    }
    return (
        <Rect style={style} />
    )
}