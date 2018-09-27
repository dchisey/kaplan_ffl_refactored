import React, { Component } from 'react';
import DivSpace from '../buildingBlocks/DivSpace'
import styled from 'styled-components';

const Test = styled.div`
    width:100%;
    height:400px;
    background-color: white;
`

const LeaderboardGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-row-gap: 10px;
    grid-column-gap: 10px;
`

const Input = styled.input`
    font-family: 'Bungee Hairline', sans-sarif;
    outline: none;
    border: none;
    background-color: transparent;
`


class Leaderboard extends Component {
    render() {
        return (
            <LeaderboardGrid>
                <DivSpace render={() => <Test></Test>}/>
            </LeaderboardGrid>
        )
    }
}

export default Leaderboard;