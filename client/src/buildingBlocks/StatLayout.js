import React from 'react'
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

export default ({ hoverFocus, ownerFocus, leagueData, dateSetData }) => {
    const ownerData = dateSetData.filter(owner => {
        return owner.name === ownerFocus || owner.name === hoverFocus
    }).sort((a, b) => {
        return b.name === ownerFocus
    })
    const ownerScores = ownerData[0].history
    const challengerScores = ownerData[1] ? ownerData[1].history : undefined
    const ownerTotalScore = Math.round(ownerScores.reduce((acc, currScore) => {
        return currScore ? acc += currScore.Pts : acc
    }, 0))
    const challengerTotalScore = challengerScores ? Math.round(challengerScores.reduce((acc, currScore) => {
        return currScore ? acc += currScore.Pts : acc
    }, 0)) : undefined
    const history = dateSetData.map(owner => owner.history)
    const highScores = zip(history).map(week => {
        const filteredWeek = week.reduce((acc, score) => {
            if(score) {
                acc.push(score.Pts)
            }
            return acc
        }, [])
        return Math.max(...filteredWeek)
    })
    const stats = ownerScores.reduce((stat, currWeek, i) => {
        const { highScore } = stat
        if(!currWeek) { return stat }
        const pts = currWeek.Pts
        //high score
        stat.highScore = pts > highScore ? pts : highScore
        //juggernaut
        pts === highScores[i] ? stat.juggernauts++ : stat.juggernauts
        //record
        if(challengerScores && challengerScores[i] && pts) {
            if(pts > challengerScores[i].Pts) {
                stat.wins++
            } else if(pts === challengerScores[i].Pts){
                stat.ties++
            }
            else {
                stat.losses++
            }    
        }
        return stat
    }, { juggernauts: 0, highScore: 0, wins: 0, losses: 0, ties: 0 })

    return (
        <Container>
            <StatSquare orientation='topLeft'>
                <h3>Juggernauts</h3>
                <h1>{stats.juggernauts}</h1>
            </StatSquare>
            <StatSquare orientation='topRight'>
                <h3>High Score</h3>
                <h1>{stats.highScore}</h1>
            </StatSquare>
            {hoverFocus && hoverFocus !== ownerFocus ? (
                <StatSquare orientation='title'>
                    <h1>vs. {hoverFocus.split(' ')[0]}</h1>
                </StatSquare>
            ) : 
                <StatSquare orientation='title'>
                    <h2>Hover for comparison</h2>
                </StatSquare>}
            {hoverFocus && hoverFocus !== ownerFocus ? (
                <StatSquare orientation='bottomLeft'>
                    <h3>Record</h3>
                    <h1>{stats.wins} - {stats.losses} {stats.ties ? ` - ${stats.ties}` : null}</h1>
                </StatSquare>
            ) : null}
            {hoverFocus && hoverFocus !== ownerFocus ? (
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