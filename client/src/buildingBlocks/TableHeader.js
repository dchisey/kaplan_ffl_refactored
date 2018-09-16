import React from 'react'
import styled from 'styled-components'

const ColumnHeader = styled.th`
    width: ${() => window.innerWidth < 450 ? '70px' : '125px'};
    font-size: 1.1em;
`

const Year = styled.th`
    border: 1px solid black;
    overflow: hidden;
    ${props => props.colSpan < 4 ? 'font-size: 0;' : null }
`

export default ({ weekArray }) => {
    const years = weekArray.reduce((acc, wk, i) => {
        acc[wk.year] = acc[wk.year] || 0
        acc[wk.year]++
        return acc
    }, {})
    // const borders = { border: '2px'}
    return (
        <tr style={{color: 'black'}}>
            <ColumnHeader>Owner</ColumnHeader>
            {Object.entries(years).map((year, i) => <Year key={`year_${i}_th`} colSpan={year[1]}>{year[0]}</Year>)}
        </tr>
    )
}