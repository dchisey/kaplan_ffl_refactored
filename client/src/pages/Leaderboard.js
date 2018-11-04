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

const LoadingTag = styled.h1`
    color: white;
    text-align: center;
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

    async componentDidMount() {
        const leagueData = await fetch('/leaderboard', { method: 'post' }).then(res => res.json())
        this.setState({ leagueData, mounted: true })
    }

    changeOwnerFocus(e) {
        e.stopPropagation()
        const clickedOwner = [...e.target.parentNode.children][0].innerHTML
        const ownerAlreadyChosen = this.state.ownerFocus === clickedOwner
        console.log(clickedOwner)
        if(ownerAlreadyChosen) this.setState({ ownerFocus: '' })
        else this.setState({ ownerFocus: clickedOwner })
    }

    render() {
        return this.state.mounted ? 
                (<LeaderboardGrid>
                    <DivSpace {...this.state} style={{ gridColumn: 1 }} render={() => 
                        <List stats={['total points']} 
                            {...this.state}
                            unit='weekly' 
                            title='Weekly'
                            changeOwnerFocus={this.changeOwnerFocus}
                        />
                    } />
                    <DivSpace {...this.state} style={{ gridColumn: 2 }} render={() => 
                        <List stats={['total points', 'average points', 'juggernauts', 'elite games', 'abysmal games']} 
                            {...this.state}
                            unit='annual' 
                            title='Annual'
                            changeOwnerFocus={this.changeOwnerFocus}
                        />
                    }/>
                    <DivSpace {...this.state} style={{ gridColumn: 3 }} render={() => 
                        <List stats={['total points', 'average points', 'juggernauts', 'elite games', 'abysmal games']} 
                            {...this.state}
                            unit='allTime' 
                            title='All Time'
                            changeOwnerFocus={this.changeOwnerFocus}
                        />
                    }/>
                </LeaderboardGrid>) : <LoadingTag>Loading...</LoadingTag>
    }
}

export default Leaderboard;