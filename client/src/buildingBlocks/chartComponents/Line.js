import React, { Component } from 'react'
import styled from 'styled-components'

const Path = styled.path`
    fill: none;
    stroke: ${props => {
        if(props.ownerFocused) {
            return 'blue';
        } else {
            return 'green';
        }
    }};
    stroke-width: ${props => {
        if(props.ownerFocused) {
            return '4px';
        } else if(props.ownerHovered) {
            return '3px';
        } else {
            return '1px';
        }
    }};
    opacity: ${props =>!props.ownerFocused && !props.ownerHovered ? 0.6 : 1}};
`
export default class Line extends Component {
    constructor(props) {
        super(props)
        this.state = {
            dotHover: false,
            lineHover: false,
            lineStyle: {
                fill: 'none',
                stroke: 'green',
                strokeWidth: '1px' 
            },
            dotRadius: '4px'
        }
    }


    render() {
        const { dotHover, lineHover, lineStyle, dotRadius } = this.state
        const { 
            line, 
            history, 
            xScale, 
            yScale, 
            stat, 
            margin, 
            owner, 
            ownerFocus,
            hoverFocus,
            changeOwnerFocus, 
            changeHoverFocus, 
            removeHoverFocus
        } = this.props

        return (
            <g>
                <Path 
                    {...this.state}
                    d={line(history)} 
                    onMouseEnter={changeHoverFocus}
                    onMouseLeave={removeHoverFocus}
                    id={owner}
                    ownerFocus={ownerFocus}
                    onClick={changeOwnerFocus}
                    ownerFocused={owner == ownerFocus}
                    ownerHovered={owner == hoverFocus}></Path>
                {owner == ownerFocus || owner == hoverFocus ? history.map((week, i) => <circle 
                    r={dotRadius}
                    fill={owner == ownerFocus ? 'blue' : 'green'}
                    cx={xScale(i + 1)} 
                    cy={yScale(week[stat]) + margin.top}
                    onMouseEnter={this.handleDotHover}
                    onMouseLeave={this.handleDotLeave}></circle>)
                : null}
            </g>
        )
    }
}