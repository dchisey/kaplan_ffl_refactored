import React, { Component } from 'react';
import styled from 'styled-components';

const Rect = styled.rect`
    fill: ${props => {
        if(props.ownerFocused) {
            return 'blue';
        } else {
            return 'green';
        }
    }};
    opacity: ${props => !props.ownerFocused && !props.ownerHovered ? 0.6 : 1};
`

export default class Bar extends Component {
    constructor(props) {
        super(props)
        this.state = {
            hover: false
        }
    }

    render() {
        const { 
            xScale, 
            barScale, 
            dataPoint, 
            height, 
            margin, 
            index, 
            padding, 
            changeOwnerFocus, 
            changeHoverFocus,
            removeHoverFocus,
            owner,
            ownerFocus,
            hoverFocus
        } = this.props
        const transform = {
            transform: `translate(${xScale.bandwidth() * index}px, ${height - margin.bottom + margin.top - barScale(dataPoint)}px`
        }
        return (
            <Rect 
                width={xScale.bandwidth() - padding + 'px'}
                height={barScale(dataPoint)}
                style={transform}
                onMouseEnter={changeHoverFocus}
                onMouseLeave={removeHoverFocus}
                onClick={changeOwnerFocus}
                id={owner}
                ownerFocus={ownerFocus}
                ownerFocused={owner === ownerFocus}
                ownerHovered={owner === hoverFocus}/>
        )
    }
}