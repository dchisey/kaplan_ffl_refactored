import React, { Component } from 'react';
import {
	BrowserRouter as Router,
	Route,
	Switch,
	Link
} from 'react-router-dom';
import styled from 'styled-components';
import Leaderboard from './pages/Leaderboard';
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
          title: 'Leaderboards', 
          description: 'Find the best and worst performances in league history.', 
          key: 1,
          path:'/leaderboard'
        }
      ]
    }
  }

  render() {
    const { components } = this.state

    return (
      <Router>
        <div>
          <Title>
            <Link to="/" style={{ textDecoration: 'none', color: '#ede8e8' }}>
              <h1 id="#title">Kaplan FFL Stat Sheet</h1>
            </Link>
          </Title>
          <Switch>
              <Route path="/Leaderboard" component={Leaderboard}/>
              <Route path="/leaguegraphs" component={() => <LeagueGraphs />} />
              <Route path="/" component={() => components.map(component => AnalysisOption(component))} />
          </Switch>
        </div>
      </Router>
    );
  }
}



export default App;
