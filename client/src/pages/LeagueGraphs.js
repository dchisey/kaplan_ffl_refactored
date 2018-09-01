import React, { Component } from 'react';
import styled from 'styled-components';
import SvgSpace, { SpringSvg } from '../buildingBlocks/SvgSpace'
import BarChart from '../buildingBlocks/BarChart'
import LineChart from '../buildingBlocks/LineChart'
import DonutChart from '../buildingBlocks/DonutChart'
import DivSpace from '../buildingBlocks/DivSpace'
import HeatMap from '../buildingBlocks/HeatMap'
//import { Motion, spring } from 'react-motion'
import StatLayout from '../buildingBlocks/StatLayout'
import DataFilters from '../buildingBlocks/DataFilters'
//import { start } from 'repl';

const Grid = styled.div`
    display: grid;
    grid-template: repeat(${props => props.ownerFocus ? '2' : '1'}, ${props => props.gridHeight}px) / repeat(2, 1fr);
    grid-column-gap : 10px;
    grid-row-gap : 10px;
`

const Title = styled.h1`
    display: block;
    color: white;
    margin: 0;
    text-align: center;
    background: linear-gradient(to right, rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.2));
`

class LeagueGraphs extends Component {
    constructor(props) {
        super(props)
        this.state = {
            leagueData: [],
            ownerFocus: '',
            hoverFocus: '',
            gridHeight: 375,
            weekStart: 1,
            weekEnd: 13,
            previousWeekStart: 1,
            totalWeeks: 13,
            startYear: 2017,
            endYear: 2017,
            lineToggle: true
        }
        this.getSpecs = this.getSpecs.bind(this)
        this.getData = this.getData.bind(this)
        this.changeOwnerFocus = this.changeOwnerFocus.bind(this)
        this.changeHoverFocus = this.changeHoverFocus.bind(this)
        this.removeHoverFocus = this.removeHoverFocus.bind(this)
        this.handleFilterChange = this.handleFilterChange.bind(this)
        this.countNumWeeks = this.countNumWeeks.bind(this)
        this.isValidated = this.isValidated.bind(this)
    }

    async componentDidMount() {
        await this.getData()
    }

    getSpecs(e, ref) {
        const element = ref.current
        if(!this.state.svgSpecs || e) { 
            this.setState({
                svgSpecs: {
                    width: (window.innerWidth - 50) / 2,
                    height: this.state.gridHeight
                }
            })
        }
    }

    async getData(e) {
        if (e) { e.preventDefault() }
        if(!this.isValidated()) {
            alert('\nYou are a fucking idiot.\n\nPick a valid date range.')
            return
        }

        const { weekStart, weekEnd, startYear, endYear } = this.state
        const leagueData = await fetch('../api/leaguecomparison', {
          method: 'POST',
          body: JSON.stringify({ weekStart, weekEnd, startYear, endYear })
        })
          .then(res => res.json())
          .catch(err => console.log(err))

        const totalWeeks = this.countNumWeeks()
        await this.setState({ 
            leagueData, 
            totalWeeks,
            loaded: true,
            lineToggle: !this.state.lineToggle,
            previousWeekStart: weekStart,
            weekArray: this.createArray(totalWeeks, false, (item, i) => {
                const weekDisplayed = weekStart + i
                return weekDisplayed <= 13 ? weekDisplayed : weekDisplayed - 13
            })
        })
    }

    countNumWeeks() {
        const { weekStart, weekEnd, endYear, startYear } = this.state
        const yrDiff = endYear - startYear
        return !yrDiff ? weekEnd - weekStart + 1 : 13 - weekStart + weekEnd + (13 * (yrDiff - 1)) + 1
    }

    isValidated() {
        const { weekStart, weekEnd, endYear, startYear } = this.state
        const yrDiff = endYear - startYear
        return !yrDiff ? Boolean(weekEnd >= weekStart) : Boolean(yrDiff > 0)
    }

    createArray(number, value, callback) {
        const newArray = []
        for(let i = 0; i < number; i++) {
            newArray.push(value || i)
        }
        return callback ? newArray.map(callback) : newArray
    }

    handleFilterChange(e) {
        e.preventDefault()
        const targetName = e.target.id
        const targetValue = +e.target.value || e.target.value
        this.setState({
            [targetName]: targetValue
        })
    }

    changeOwnerFocus(e) {
        e.preventDefault()
        const ownerAlreadyChosen = this.state.ownerFocus == e.target.id
        const id = e.target.id ? e.target.id : e.target.parentNode.id
        if(ownerAlreadyChosen) this.setState({ ownerFocus: '' })
        else this.setState({ ownerFocus: id })
    }

    changeHoverFocus(e) {
        if(e.target.id) this.setState({ hoverFocus: e.target.id })
        else this.setState({ hoverFocus: e.target.parentNode.id })
    }

    removeHoverFocus(e) {
        this.setState({ hoverFocus: '' })
    }

    render() {
        const { ownerFocus, gridHeight, leagueData } = this.state
        console.log(this.state)
        return (
            <div>
                {this.state.loaded ? (
                    <div>
                        <DataFilters handleFilterChange={this.handleFilterChange} 
                            getData={this.getData}
                            createArray={this.createArray}
                            {...this.state} />
                        <Grid ownerFocus={ownerFocus} gridHeight={gridHeight}>
                            <SvgSpace top left {...this.state} getSpecs={this.getSpecs} render={() => 
                                <BarChart {...this.state}
                                    title="Total Points" 
                                    rotation="-45"
                                    changeOwnerFocus={this.changeOwnerFocus}
                                    changeHoverFocus={this.changeHoverFocus}
                                    removeHoverFocus={this.removeHoverFocus} />
                            } />
                            {ownerFocus ?
                                (<SvgSpace bottom left getSpecs={this.getSpecs} render={() => 
                                    <LineChart {...this.state} 
                                        title="Weekly Points Trend" 
                                        rotation="0"
                                        changeOwnerFocus={this.changeOwnerFocus}
                                        changeHoverFocus={this.changeHoverFocus}
                                        removeHoverFocus={this.removeHoverFocus} />
                                } />)
                                : (<SvgSpace top right getSpecs={this.getSpecs} render={() => 
                                    <LineChart {...this.state} 
                                        title="Weekly Points Trend" 
                                        rotation="0"
                                        changeOwnerFocus={this.changeOwnerFocus}
                                        changeHoverFocus={this.changeHoverFocus}
                                        removeHoverFocus={this.removeHoverFocus}
                                        lineToggle={this.state.lineToggle} />
                                } />)}
                            {ownerFocus ? 
                                <DivSpace grid={{ column: 2, row: '1 / span 2' }} render={() => (
                                    <div>
                                        <Title>{ownerFocus}</Title>
                                        <DonutChart {...this.state} {...this.props} 
                                            data={leagueData.filter(owner => owner._id == ownerFocus)[0]}
                                        />
                                        <StatLayout {...this.state} {...this.props} />
                                    </div>
                                )}/>
                                : null}
                        </Grid>
                        <DivSpace render={() => 
                            <HeatMap {...this.state}
                                changeOwnerFocus={this.changeOwnerFocus}
                                changeHoverFocus={this.changeHoverFocus}
                                removeHoverFocus={this.removeHoverFocus} 
                                createArray={this.createArray}
                            />
                        } />
                    </div>)
                : <h1 style={{ color: 'white', textAlign: 'center' }}>Loading...</h1>}
            </div>
        )
    }
}


export default LeagueGraphs;