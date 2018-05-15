import React, { Component } from 'react';

export default ({ leagueData }) => {
    return (
        <tr style={{color: 'black'}}>
            <th>Owner</th>
            {leagueData[0].History.map((_, i) => <th>{i + 1}</th>)}
        </tr>
    )
}