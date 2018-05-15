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

    getSpecs(ref) {
        const element = ref.current
        if(!this.state.svgSpecs) { 
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
        console.dir(e)
        this.setState({ ownerFocus: e.target.id })
    }

    changeHoverFocus(e) {
        console.log('hoverFocus')
        this.setState({ hoverFocus: e.target.id })
    }

    removeHoverFocus(e) {
        console.log(e.target.id)
        this.setState({ hoverFocus: '' })
    }

    render() {
        return (
            <div>
                {this.state.loaded ? (
                    <div>
                        <SvgSpace {...this.state} getSpecs={this.getSpecs} render={() => 
                            <BarChart {...this.state} 
                                changeOwnerFocus={this.changeOwnerFocus}
                                changeHoverFocus={this.changeHoverFocus}
                                removeHoverFocus={this.removeHoverFocus} />
                        } />
                        <SvgSpace {...this.state} getSpecs={this.getSpecs} render={() => 
                            <LineChart {...this.state} 
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