import React, { Component } from 'react'
import styled from 'styled-components'
import TableHeader from './TableHeader'
import Legend from './chartComponents/Legend'

const Title = styled.h1`
    color: black;
    margin: 0;
    padding: 20px 0px;
    font-weight: bold;
    text-align: center;
    line-height: 1;
`

const Table = styled.table`
    table-layout: fixed;
    width: 100%;
    padding: 0px 30px 30px 30px;
`

const Name = styled.td`
    color: black;
    font-weight: 700;
    white-space: nowrap;
    column-width: 200px;
    line-height: 2;
`
const Performance = styled.td`
    background-color: ${props => {
        switch(props.WeeklyQS) {
            case 3:
                return props.quality[5].color;
            case 2:
                return props.quality[4].color;
            case 1:
                return props.quality[3].color;
            case -3:
                return props.quality[0].color;
            case -2:
                return props.quality[1].color;
            case -1:
                return props.quality[2].color;
            default:
                return 'rgba(0, 0, 0, 0.2)';
        }
    }};
    width: ${props => {
        return 100/13 + '%'
    }};
    text-align: center;
    font-weight: bold;
    line-height: 1;
`

export default class HeatMap extends Component {
    constructor(props) {
        super(props)
        this.getWidth = this.getWidth.bind(this)
        this.displayScore = this.displayScore.bind(this)
        this.displayNames = this.displayNames.bind(this)
    }

    componentDidMount() {
        window.addEventListener('resize', this.getWidth)
    }

    getWidth(e) {
        this.setState({ width: window.innerWidth })
    }

    displayScore(week) {
        const width = window.innerWidth;
        const numWeeks = this.props.weekArray.length
        if(width > 825 && week && numWeeks <= 13) {
            return week.Pts
        } else if(width > 750 && week && numWeeks <= 26) {
            return week.Pts.toFixed();
        } else {
            return null
        }
    }

    displayNames(owner) {
        const width = window.innerWidth;
        const ownerArray = owner.name.split(' ')
        if(width < 450) {
            return ownerArray.map(name => name[0]).join('')
        }

        return ownerArray[0];
    }

    render() {
        const { ownerFocus, hoverFocus, 
            changeHoverFocus, changeOwnerFocus, 
            removeHoverFocus, dateSetData } = this.props
        const quality = [
            { type: 'Abysmal', color: '#C11C17' }, 
            { type: 'Inferior', color: '#DE5003' }, 
            { type: 'Mean Minus', color: '#EFCE10' }, 
            { type: 'Mean Plus', color: '#ACD62A' }, 
            { type: 'Superior', color: '#228B22' }, 
            { type: 'Elite', color: '#4169e1' }
        ];

        return (
            <div>
                <Title>Heat Map</Title>
                <Legend quality={quality}/>
                <Table>
                    <tbody>
                        <TableHeader {...this.props}/>
                        {dateSetData.map((owner, i) => {
                            return (
                                <tr id={owner.name} 
                                    onMouseEnter={changeHoverFocus} 
                                    onMouseLeave={removeHoverFocus} 
                                    onClick={changeOwnerFocus}
                                    key={`tr_${owner.name}_${i}`}
                                    >
                                    <Name key={`ownerName_${owner.name}_${i}`}>{this.displayNames(owner)}</Name>
                                    {owner.history.map((week, j) => {
                                        const ownerMatch = owner.name === ownerFocus
                                        const hoverMatch = owner.name === hoverFocus
                                        return <Performance 
                                            key={`score_${owner.name}_${j}`} 
                                            {...week} 
                                            quality={quality} 
                                            alignment="vertical" 
                                            {...this.state}>{
                                                (ownerMatch || hoverMatch) ? this.displayScore(week) : null
                                        }</Performance>
                                    })}
                                </tr>
                            
                            )
                        })}
                    </tbody>
                </Table>
            </div>
        )
    }
}
