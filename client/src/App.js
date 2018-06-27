import React, { Component } from 'react';
import {
	BrowserRouter,
	Route,
	Switch,
	Link
} from 'react-router-dom';
import styled from 'styled-components';
import OwnerPerformance from './pages/OwnerPerformance';
import LeagueGraphs from './pages/LeagueGraphs';
//import AnalysisOptions from './pages/';
import AnalysisOption from './buildingBlocks/AnalysisOption';

const Title = styled.header`
  display: block;
  text-align: center;
  font-size: 32px;
  line-height: 1.5em;
`

class App extends Component {
  constructor() {
    super();
    this.state = {
      components: [
        {
          title: 'Charts & Graphs',
          description: 'Data visualizations of leaguewide performance',
          key:2,
          path:'/leaguegraphs'
        },
        { 
          title: 'Owner Performance', 
          description: 'See how each owner compares to other leaguemates.', 
          key: 1,
          path:'/ownerperformance'
        }
      ]
    }
    this.getData = this.getData.bind(this);
  }

  async getData() {
    return await fetch('../api/leaguecomparison')
      .then(res => res.json())
      .catch(err => console.log(err))
  }

  render() {
    const { components } = this.state

    return (
      <BrowserRouter>
        <div>
          <Title>
            <Link to="/" style={{ textDecoration: 'none', color: '#ede8e8' }}>
              <h1 id="#title">Kaplan FFL Stat Sheet</h1>
            </Link>
          </Title>
          <Switch>
              <Route exact path="/" component={() => components.map(component => AnalysisOption(component))} />
              <Route path="/ownerperformance" component={OwnerPerformance}/>
              <Route path="/leaguegraphs" component={() => <LeagueGraphs getData={this.getData} />}/>
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}



export default App;
