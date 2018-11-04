import React, { Component } from 'react'
import styled from 'styled-components'
import ListFilter from './ListFilter'

const Space =  styled.div`
    height: 100%;
    width: 100%;
`
const TimeRange = styled.h1`
    display: block;
    margin-top: 40px;
    line-height: 1.2em;
    font-size: 24px;
    font-family: 'Bungee', cursive;
    text-align: center;
`

const Table = styled.table`
    margin: 0 auto;
    border-collapse: collapse;
    padding: 0px 20px;
`
const Header = styled.th`
    font-weight: 700;
    font-size: 20px;
    border-bottom: 3px solid black;
`
const StatCell = styled.td`
    padding: 0px 30px;
    text-align: center;
`

export default class List extends Component {
    constructor(props) {
        super(props)
        this.state = {
            sortBy: 'best',
            stat: 'totalPts',
            numEntries: 15
        }
        this.changeSortBy = this.changeSortBy.bind(this)
        this.getEntries = this.getEntries.bind(this)
        this.changeStat = this.changeStat.bind(this)
    }

    changeSortBy(e) {
        const value = e.target.parentNode.id
        console.dir(value)
        this.setState({
            sortBy: value
        })
    }

    getEntries() {
        const { sortBy, numEntries, stat } = this.state
        const { leagueData, unit } = this.props
        const data = leagueData[unit]
        const finalEntries = []
        const isBest = sortBy === 'best'
        data.sort((a, b) => b[stat] - a[stat])
        if(isBest) {
            for(let i = 0; i < numEntries; i++) {
                finalEntries.push(data[i])
            }
        } else {
            const adjDataLength = data.length - 1 
            for(let i = adjDataLength; i > adjDataLength - numEntries; i--){
                finalEntries.push(data[i])
            }
        }

        return finalEntries
    }

    changeStat(e) {
        const newStat = e.target.value
        const statMap = [
            {
                name: 'Total Points',
                key: 'totalPts',
                youShouldInclude2018: false
            },
            {   
                name: 'Average Points',
                key: 'averagePts',
                youShouldInclude2018: true 
            },
            {
                name: 'Juggernauts',
                key: 'juggernauts',
                youShouldInclude2018: true
            },
            {
                name: 'Elite Games',
                key: 'elite',
                youShouldInclude2018: true
            },
            {
                name: 'Abysmal Games',
                key: 'abysmal',
                youShouldInclude2018: true
            }
        ]
        const [ mappedStat ] = statMap.filter(stat => stat.name === newStat)
        this.setState({ stat: mappedStat.key })
    }

    render() {
        const { leagueData, mounted, unit, title } = this.props
        const { stat } = this.state
        const data = mounted ? this.getEntries() : undefined
        mounted ? console.log(leagueData.weekly.filter(e => e.owner === 'Adam Wilhelm')) : null
        return (
            <Space>
                <ListFilter {...this.state} {...this.props} 
                    changeSortBy={this.changeSortBy}
                    changeStat={this.changeStat} />
                <TimeRange>{title}</TimeRange>
                <Table>
                    <Header>Owner</Header>
                    {data && data[0].year ? <Header>Year</Header> : null}
                    <Header>{stat}</Header>
                    {mounted ? data.map(entry => {
                        return (
                            <tr>
                                <td>{entry.owner}</td>
                                {entry.year ? <StatCell>{entry.year}</StatCell>: null}
                                <StatCell>{entry[stat].toFixed(1)}</StatCell>
                            </tr>
                        )
                    }) : null}
                </Table>
            </Space>
        )
    }
}