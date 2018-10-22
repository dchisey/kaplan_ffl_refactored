import React, { Component } from 'react'
import styled from 'styled-components'
import ListFilter from './ListFilter'

const Space =  styled.div`
    height: 100%;
    width: 100%;
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

    render() {
        const { leagueData } = this.props
        const { stat } = this.state
        const data = leagueData ? this.getEntries() : undefined
        console.log(data)
        return (
            <Space>
                <ListFilter {...this.state} {...this.props} changeSortBy={this.changeSortBy} />
                <table>
                    <th>Owner</th>
                    {data && data[0].year ? <th>Year</th> : null}
                    <th>{stat}</th>
                    {leagueData ? data.map(entry => {
                        return (
                            <tr>
                                <td>{entry.owner}</td>
                                {entry.year ? <td>{entry.year}</td>: null}
                                <td>{entry[stat]}</td>
                            </tr>
                        )
                    }) : null}
                </table>
            </Space>
        )
    }
}