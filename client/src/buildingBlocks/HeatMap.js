import React, { Component } from 'react'
import styled from 'styled-components'
import TableHeader from './TableHeader'

const Name = styled.td`
    color: black;
    line-height: 2;
`
const Performance = styled.td`
    background-color: ${props => {
        const colors = ['#C11C17', '#DE5003', '#EFCE10', '#ACD62A', '#228B22', '#1F1D6D'];
        switch(props.WeeklyQS) {
            case 3:
                return colors[5];
                break;
            case 2:
                return colors[4];
                break;
            case 1:
                return colors[3];
                break;
            case -3:
                return colors[0];
                break;
            case -2:
                return colors[1];
                break;
            case -1:
                return colors[2];
                break;
            default:
                return 'white';
        }
    }};
    width: ${props => {
        return 100 / 12 + '%'
    }};
`

export default class HeatMap extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        const { leagueData } = this.props
        return (
            <table style={{tableLayout:'fixed'}}>
                <TableHeader leagueData={leagueData}/>
                {leagueData.map((owner, i) => {
                    return (
                        <tr>
                            <Name key={i}>{owner._id.split(' ')[0]}</Name>
                            {owner.History.map((week, j) => {
                                return <Performance key={j} {...week} />
                            })}
                        </tr>
                    )
                })}
            </table>
        )
    }
}
