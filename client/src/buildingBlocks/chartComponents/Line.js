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
        const { dotRadius } = this.state
        const { 
            line, 
            history, 
            yScale, 
            lineScale,
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
                    key={`path_${owner}`}
                    ownerFocus={ownerFocus}
                    onClick={changeOwnerFocus}
                    ownerFocused={owner === ownerFocus}
                    ownerHovered={owner === hoverFocus} />
                {owner === ownerFocus || owner === hoverFocus ? history.map((week, i) => {
                    if(week) {
                        return (
                            <circle 
                                r={dotRadius}
                                key={`dot_${i}`}
                                fill={owner === ownerFocus ? 'blue' : 'green'}
                                cx={lineScale(i + 1 / 2)}
                                cy={yScale(week.Pts) + margin.top}
                                onMouseEnter={this.handleDotHover}
                                onMouseLeave={this.handleDotLeave}>
                            </circle>
                        )
                    } else { 
                        return null 
                    }
                }) : null}
            </g>
        )
    }
}