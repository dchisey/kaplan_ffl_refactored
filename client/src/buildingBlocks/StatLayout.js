import React, { Component } from 'react'
import styled from 'styled-components'

const Container = styled.div`
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: 100px auto 100px;
    grid-template-areas: 
        'topLeft topRight' 
        'title title'
        'bottomLeft bottomRight';
    align-items: center; 
`

const StatSquare = styled.div`
    grid-area: ${props => props.orientation};
    text-align: center;
    line-height: 1em;
`

const zip = (rows) => {
    return rows[0].map((_,c)=>rows.map(row=>row[c]))
}

export default ({ hoverFocus, ownerFocus, leagueData }) => {
    const ownerData = leagueData.filter(owner => {
        return owner._id == ownerFocus || owner._id == hoverFocus
    }).sort((a, b) => {
        return b._id == ownerFocus
    })

    const ownerScores = ownerData[0].History
    const challengerScores = ownerData[1] ? ownerData[1].History : undefined
    const ownerTotalScore = Math.round(ownerScores.reduce((acc, currScore) => {
        return acc += currScore.Pts
    }, 0))
    const challengerTotalScore = challengerScores ? Math.round(challengerScores.reduce((acc, currScore) => {
        return acc += currScore.Pts
    }, 0)) : undefined
    const history = leagueData.map(owner => owner.History.map(week => week.Pts))
    const highScores = zip(history).map(week => Math.max(...week))
    let ownerRecord = undefined
    
    //rearrange juggernaut data to get the desired result
    const juggernauts = ownerScores.reduce((acc, currWeek, i) => {
        if(currWeek.Pts == highScores[i]) {
            acc++
        }

        return acc
    }, 0)

    //rearrange data to compare scores
    if(challengerScores) {
        ownerRecord = ownerScores.reduce((acc, ownerScore, i) => {
            if(ownerScore.Pts > challengerScores[i].Pts) {
                acc.wins++
            } else {
                acc.losses++
            }

            return acc
        }, { wins: 0, losses: 0 })
    }

    return (
        <Container>
            <StatSquare orientation='topLeft'>
                <h3>Juggernauts</h3>
                <h1>{juggernauts}</h1>
            </StatSquare>
            <StatSquare orientation='topRight'>
                <h3>High Score</h3>
                <h1>{ownerData[0].High}</h1>
            </StatSquare>
            {hoverFocus && hoverFocus != ownerFocus ? (
                <StatSquare orientation='title'>
                    <h1>vs. {hoverFocus.split(' ')[0]}</h1>
                </StatSquare>
            ) : 
                <StatSquare orientation='title'>
                    <h2>Hover for comparison</h2>
                </StatSquare>}
            {hoverFocus && hoverFocus != ownerFocus ? (
                <StatSquare orientation='bottomLeft'>
                    <h3>Record</h3>
                    <h1>{ownerRecord.wins} - {ownerRecord.losses} </h1>
                </StatSquare>
            ) : null}
            {hoverFocus && hoverFocus != ownerFocus ? (
                <StatSquare orientation='bottomRight'>
                    <h3>Point Diff</h3>
                    <h1>{ownerTotalScore - challengerTotalScore} </h1>
                </StatSquare>
            ) : null}
        </Container>
    )
}

//find the owner's scores
//compare scores to all other scores
//if it is the largest number, count as 1
//accumulate all numbers