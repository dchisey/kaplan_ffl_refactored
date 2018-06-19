import React, { Component } from 'react';
import styled from 'styled-components';
import SvgSpace, { SpringSvg } from '../buildingBlocks/SvgSpace'
import BarChart from '../buildingBlocks/BarChart'
import LineChart from '../buildingBlocks/LineChart'
import DonutChart from '../buildingBlocks/DonutChart'
import DivSpace from '../buildingBlocks/DivSpace'
import HeatMap from '../buildingBlocks/HeatMap'
import { Spring, Transition, config } from 'react-spring'
import { Motion, spring } from 'react-motion'
// import { TimingAnimation, Easing } from 'react-spring/dist/addons'

const Grid = styled.div`
    display: grid;
    grid-template: repeat(${props => props.ownerFocus ? '2' : '1'}, ${props => props.gridHeight}px) / repeat(2, 50%);
    grid-column-gap: 10px;
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
            gridHeight: 350
        }
        this.getSpecs = this.getSpecs.bind(this)
        this.changeOwnerFocus = this.changeOwnerFocus.bind(this)
        this.changeHoverFocus = this.changeHoverFocus.bind(this)
        this.removeHoverFocus = this.removeHoverFocus.bind(this)
    }

    async componentDidMount() {
        const leagueData = await this.props.getData()
        const loaded = true;
        console.log(leagueData)
        this.setState({ leagueData, loaded })
    }

    getSpecs(e, ref) {
        const element = ref.current
        if(!this.state.svgSpecs || e) { 
            this.setState({
                svgSpecs: {
                    width: element.clientWidth,
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
        console.log(leagueData)
        return (
            <div>
                {this.state.loaded ? (
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
                            {/*****************react-motion test *******************/}
                            <Motion defaultStyle={{ opacity: 0, height: 0 }} style={{ opacity: spring(1), height: spring(gridHeight) }}>
                                {interpolatingStyle => {
                                    return (<SvgSpace style={interpolatingStyle} bottom={ownerFocus} right={!ownerFocus} getSpecs={this.getSpecs} render={() => 
                                        <LineChart {...this.state} style={interpolatingStyle}
                                            title="Weekly Points Trend" 
                                            rotation="0"
                                            changeOwnerFocus={this.changeOwnerFocus}
                                            changeHoverFocus={this.changeHoverFocus}
                                            removeHoverFocus={this.removeHoverFocus} />
                                } />)}}
                            </Motion>
                            {/*****************react-spring test *******************/}
                            {/* <Spring config={config.slow} 
                                from={{ opacity: 0, height:0 }} 
                                to={{ opacity: 1, height: this.state.gridHeight }}
                                >
                                {styles => 
                                    (<SvgSpace style={styles} bottom={ownerFocus} right={!ownerFocus} getSpecs={this.getSpecs} render={() => 
                                        <LineChart {...this.state} style={styles}
                                            title="Weekly Points Trend" 
                                            rotation="0"
                                            changeOwnerFocus={this.changeOwnerFocus}
                                            changeHoverFocus={this.changeHoverFocus}
                                            removeHoverFocus={this.removeHoverFocus} />
                                    } />)
                                }
                            </Spring> */}
                            {/* {ownerFocus ?
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
                                } />)} */}
                            {ownerFocus ? 
                                <DivSpace grid={{ column: 2, row: '1 / span 2' }} render={() => (
                                    <div>
                                        <Title>{ownerFocus}</Title>
                                        <DonutChart {...this.state} {...this.props} 
                                            data={leagueData.filter(owner => owner._id == ownerFocus)[0]}
                                        />
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
                : <h1>Loading...</h1>}
            </div>
        )
    }
}


export default LeagueGraphs;