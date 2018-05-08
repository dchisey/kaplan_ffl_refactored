import React, { Component } from 'react';
import styled from 'styled-components';
import BarChart from '../buildingBlocks/BarChart'
import LineChart from '../buildingBlocks/LineChart'

class LeagueGraphs extends Component {
    constructor(props) {
        super(props)
        this.state = {
            leagueData: [],
            style: {
                height: '400px',
                width: '50%',
                backgroundColor: '#ede8e8'
            }
        }
        this.getSpecs = this.getSpecs.bind(this)
    }

    async componentDidMount() {
        const leagueData = await this.props.getData()
        const loaded = true;
        this.setState({ leagueData, loaded })
    }

    getSpecs(ref) {
        const element = ref.current
        this.setState({
            svgSpecs: {
                width: element.clientWidth,
                height: element.clientHeight
            }
        })
    }

    render() {
        console.log(this.state)
        return (
            <div>
                {this.state.loaded ? (
                    <div>
                        <BarChart {...this.state} />
                        <LineChart {...this.state} getSpecs={this.getSpecs} />
                    </div>
                ) : <h1>Loading</h1>}
            </div>
        )
    }
}


export default LeagueGraphs;