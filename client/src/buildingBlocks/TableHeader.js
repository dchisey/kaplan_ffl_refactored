import React, { Component } from 'react'
import styled from 'styled-components'

const ColumnHeader = styled.th`
    width: ${() => window.innerWidth < 450 ? '70px' : '125px'};
    font-size: 1.1em;
`

export default ({ leagueData, createArray, totalWeeks, weekStart, weekArray }) => {

    console.log(weekArray)
    return (
        <tr style={{color: 'black'}}>
            <ColumnHeader>Owner</ColumnHeader>
            {weekArray.map(weekNo => <th>{weekNo}</th>)}
            {/* {leagueData[0].History.map((_, i) => <th>{i + 1}</th>)} */}
        </tr>
    )
}