import React, { Component } from 'react';
import styled from 'styled-components';
import SvgSpace, { SpringSvg } from '../buildingBlocks/SvgSpace'
import BarChart from '../buildingBlocks/BarChart'
import LineChart from '../buildingBlocks/LineChart'
import DonutChart from '../buildingBlocks/DonutChart'
import DivSpace from '../buildingBlocks/DivSpace'
import HeatMap from '../buildingBlocks/HeatMap'
import { Motion, spring } from 'react-motion'
import StatLayout from '../buildingBlocks/StatLayout'

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
            gridHeight: 375
        }
        this.getSpecs = this.getSpecs.bind(this)
        this.changeOwnerFocus = this.changeOwnerFocus.bind(this)
        this.changeHoverFocus = this.changeHoverFocus.bind(this)
        this.removeHoverFocus = this.removeHoverFocus.bind(this)
    }

    getDefaultProps() {
        console.log('lg getDefaultProps')
    }

    getInitialState() {
        console.log('lg getInitialState')
    }

    componentWillMount() {
        console.log('lg componentWillMount')
    }

    async componentDidMount() {
        console.log('leagueGraphs mounted')
        const leagueData = await this.props.getData()
        const loaded = true;
        this.setState({ leagueData, loaded })
    }

    getSpecs(e, ref) {
        const element = ref.current
        console.dir(element.width.baseVal.value)
        if(!this.state.svgSpecs || e) { 
            this.setState({
                svgSpecs: {
                    width: (window.innerWidth - 50) / 2,
                    height: this.state.gridHeight
                }
            })
        }
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
        return (
            <div>
                <h1>THIS IS WORKING</h1>
                {/* {this.state.loaded ? (
                    <div>
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
                                        removeHoverFocus={this.removeHoverFocus} />
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
                            />
                        } />
                    </div>)
                : <h1 style={{ color: 'white', textAlign: 'center' }}>Loading...</h1>} */}
            </div>
        )
    }
}


export default LeagueGraphs;