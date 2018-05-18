import React, { Component } from 'react';
import styled from 'styled-components';
import SvgSpace from '../buildingBlocks/SvgSpace'
import BarChart from '../buildingBlocks/BarChart'
import LineChart from '../buildingBlocks/LineChart'
import DivSpace from '../buildingBlocks/DivSpace'
import HeatMap from '../buildingBlocks/HeatMap'

class LeagueGraphs extends Component {
    constructor(props) {
        super(props)
        this.state = {
            leagueData: [],
            ownerFocus: '',
            hoverFocus: ''
        }
        this.getSpecs = this.getSpecs.bind(this)
        this.changeOwnerFocus = this.changeOwnerFocus.bind(this)
        this.changeHoverFocus = this.changeHoverFocus.bind(this)
        this.removeHoverFocus = this.removeHoverFocus.bind(this)
    }

    async componentDidMount() {
        const leagueData = await this.props.getData()
        const loaded = true;
        this.setState({ leagueData, loaded })
    }

    getSpecs(e, ref) {
        const element = ref.current
        console.log(element.clientHeight, element.clientWidth)
        if(!this.state.svgSpecs || e) { 
            this.setState({
                svgSpecs: {
                    width: element.clientWidth,
                    height: element.clientHeight
                }
            })
        }
    }

    changeOwnerFocus(e) {
        e.preventDefault()
        this.setState({ ownerFocus: e.target.id })
    }

    changeHoverFocus(e) {
        this.setState({ hoverFocus: e.target.id })
    }

    removeHoverFocus(e) {
        this.setState({ hoverFocus: '' })
    }

    render() {
        console.log(this.state.svgSpecs)
        return (
            <div>
                {this.state.loaded ? (
                    <div>
                        <SvgSpace {...this.state} getSpecs={this.getSpecs} render={() => 
                            <BarChart {...this.state}
                                title="Total Points" 
                                rotation="-45"
                                changeOwnerFocus={this.changeOwnerFocus}
                                changeHoverFocus={this.changeHoverFocus}
                                removeHoverFocus={this.removeHoverFocus} />
                        } />
                        <SvgSpace {...this.state} getSpecs={this.getSpecs} render={() => 
                            <LineChart {...this.state} 
                               title="Weekly Points Trend" 
                               rotation="0"
                               changeOwnerFocus={this.changeOwnerFocus}
                               changeHoverFocus={this.changeHoverFocus}
                               removeHoverFocus={this.removeHoverFocus} />
                        } />
                        <DivSpace render={() => 
                            <HeatMap {...this.state} 
                                changeOwnerFocus={this.changeOwnerFocus}
                                changeHoverFocus={this.changeHoverFocus}
                                removeHoverFocus={this.removeHoverFocus} />
                        } />
                    </div>)
                : <h1>Loading...</h1>}
            </div>
        )
    }
}


export default LeagueGraphs;