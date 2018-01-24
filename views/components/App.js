import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {
	BrowserRouter as Router,
	Route,
	Switch,
	Link
} from 'react-router-dom';
import '../styles/index.css';
import styled from 'styled-components';

import StatView from './StatView';
import HeadToHead from './HeadToHead';
import LeagueComparison from './LeagueComparison';


const App = () => (
	<Router>
		<div>
			<Title>
				<Link to="/" style={{ textDecoration: 'none', color: '#ede8e8' }}>
					<h1 id="#title">Kaplan FFL Stat Sheet</h1>
				</Link>
			</Title>
			<Switch>
				<Route exact path="/" component={StatView} />
				<Route path="/headtohead" component={HeadToHead} />
				<Route path="/leaguecomparison" component={LeagueComparison} />
			</Switch>
		</div>
	</Router>
);

export default App;

const Title = styled.header`
	font-family: 'Bungee Hairline', sans-serif;
	font-size: 24px;
	text-align: center;
	line-height: 45px;
	color: #ede8e8;
	text-decoration: none;

	@media screen and (min-width: 305px) {
		font-size: 30px;
		line-height: 55px;
	}
`;
