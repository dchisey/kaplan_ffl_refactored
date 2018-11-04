import React, { Component } from 'react';
import DivSpace from '../buildingBlocks/DivSpace'
import List from '../buildingBlocks/List'
import styled from 'styled-components';

const LeaderboardGrid = styled.div`
    margin: 10px;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
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
    constructor() {
        super()
        this.state = {
            layout: 'full',
            stat: null,
            sort: 'best',
            playerFocus: null,
            mounted: false,
            leagueData: {}
        }
        this.changeOwnerFocus = this.changeOwnerFocus.bind(this)
    }

    changeOwnerFocus(e) {
        e.preventDefault()
        const ownerAlreadyChosen = this.state.ownerFocus === e.target.id
        const id = e.target.id ? e.target.id : e.target.parentNode.id
        if(ownerAlreadyChosen) this.setState({ ownerFocus: '' })
        else this.setState({ ownerFocus: id })
    }

    async componentDidMount() {
        const leagueData = await fetch('/leaderboard', { method: 'post' }).then(res => res.json())
        this.setState({ leagueData, mounted: true })
    }

    render() {
        return (
            <LeaderboardGrid>
                <DivSpace {...this.state} style={{ gridColumn: 1 }} render={() => 
                    <List stats={['total points']} 
                        {...this.state}
                        unit='weekly' 
                        title='Weekly'
                    />
                } />
                <DivSpace {...this.state} style={{ gridColumn: 2 }} render={() => 
                    <List stats={['total points', 'average points', 'juggernauts', 'elite games', 'abysmal games']} 
                        {...this.state}
                        unit='annual' 
                        title='Annual'
                    />
                }/>
                <DivSpace {...this.state} style={{ gridColumn: 3 }} render={() => 
                    <List stats={['total points', 'average points', 'juggernauts', 'elite games', 'abysmal games']} 
                        {...this.state}
                        unit='allTime' 
                        title='All Time'
                    />
                }/>
            </LeaderboardGrid>
        )
    }
}

export default Leaderboard;