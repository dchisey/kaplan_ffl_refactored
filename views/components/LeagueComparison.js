import React, { Component } from 'react';
import styled from 'styled-components';
import d3 from 'd3';
import dataUtils from '../scripts/dataUtils';
import WeekSelector from './WeekSelector'

class LeagueComparison extends Component {
    state = { 
        isLoading: true,
        leagueData: [],
        filteredData: [],
        week: 12,
        selectedOwner: ''
    };

    async componentDidMount() {
        const leagueData = await this.ajax(this.state.week);

        this.setState({
            leagueData,
            isLoading: false
        })
    }

    ajax = async week => {

        const options = {
			method: 'POST',
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ week })
        }
        
        try {
            const res = await fetch('http://localhost:3000/api/leaguecomparison', options);
            const leagueData = await res.json();

            return leagueData;

        } catch(e) {
            console.log(e)
        }        
    }

    handleWeekSelection = async e => {
        const options = e.target.options;
        const week = +options[options.selectedIndex].innerHTML;        
        const leagueData = await this.ajax(week);

        this.setState({
            leagueData,
            week
        })

    }

    render() {
        const { isLoading, leagueData, week, filteredData } = this.state;
        console.log(leagueData);

        return (
            <div>
                <WeekSelector handleWeekSelection={this.handleWeekSelection} leagueData={leagueData} />
            </div>
        )
    }
}




export default LeagueComparison;