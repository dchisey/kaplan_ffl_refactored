import React, { Component } from 'react';
import styled from 'styled-components';
import dataUtils from '../scripts/dataUtils';

const Matchup = props => {

	const { owner, seasonData, left } = props;
	const qs = dataUtils.qualityScore(seasonData);

	return (
		<DataBox>
			<ScoreBox owner={owner} 
					  seasonData={seasonData} 
					  left={left} />
			<CountBox seasonData={seasonData} 
					  title='Total Points' 
					  stat='Pts'
					  decimalPlaces='1' />
			<CountBox seasonData={seasonData}
					  title='Season Quality'
					  stat='Abyssmal'
					  decimalPlaces='0'
					  qs />		
			<CountBox seasonData={seasonData} 
					  title='Elite Games' 
					  stat='Elite'
					  decimalPlaces='0'
					  absValue />
			<CountBox seasonData={seasonData}
					  title='Abysmal Games'
					  stat='Abyssmal'
					  decimalPlaces='0'
					  absValue />			
		</DataBox>
	)
}

const ScoreBox = props => {

	const { owner, seasonData, left } = props
	console.log(`${owner}: ${left}`)

	return (
		<ScoreBoxStyled left={left}>
			<TotalWins left={left}>
				<h1>Wins</h1>
				<p>{dataUtils.sumStats(seasonData, 'winner')}</p>
			</TotalWins>
			{seasonData.map(week => {
				if(week.winner) {
					return <Score winner left={left} key={week['_id']}>{week.Pts}</Score>
				} else {
					return <Score left={left} key={week['_id']}>{week.Pts}</Score>
				}
				
			})}
		</ScoreBoxStyled>
	)
 }


const CountBox = props => {

	const { owner, seasonData, title, stat, decimalPlaces, absValue, qs } = props;

	return (
		<CountBoxStyled>
			<h1>{title}</h1>
			{qs ? <p>{dataUtils.qualityScore(seasonData).qs}</p> 
								: <p>{dataUtils.sumStats(seasonData, stat, decimalPlaces, absValue)}</p>}
		</CountBoxStyled>
	)

}

export default Matchup;


const TotalWins = styled.div`
	font-family: 'Bungee Hairline', cursive;
	color: #134E5E;
	padding: 0px 20px 40px 20px;
	margin: 0;
	text-align: ${props => props.left ? 'right' : 'left'};
	font-size: 12px;
	line-height: 2;

	> p {
		font-size: 50px;
		margin: 0;
		line-height: 0;
		font-family: 'Bungee', cursive;
	}

	@media screen and (min-width: 355px) {
		font-size: 15px;
	}

	@media screen and (min-width: 485px) {
		font-size: 18px;
	}


	@media screen and (min-width: 698px) {
		font-size: 2.4vw;
		
		>p {
			font-size: 50px;
		}

	@media only screen and (min-width: 1063px) {
		> h1 {
			font-size: 45px;
		}
		
		>p {
			font-size: 60px;
		}
	}
`;

const Score = styled.p`
	color: ${props => props.winner ? 'green' : 'red'};
	text-align: ${props => props.left ? 'right' : 'left'};
	font-size: 30px;
	margin: 0;
	line-height: 40px;
`; 

const DataBox = styled.div`
	display: grid;
	grid-template: repeat(5, 500px) / repeat(1, 1fr)
	grid-gap: 3px;

	@media only screen and (min-width: 615px) {
		grid-template-rows: repeat(4, 1fr);
		grid-template-columns: repeat(2, 1fr);
	}
`;

const ScoreBoxStyled = styled.div`
	font-family: 'Bungee', cursive;
	background-color: #ede8e8;
	grid-column: ${props => props.left ? '1 / span 1' : '1 / span 1'};
	padding: 0px 10px 10px 10px;

	@media screen and (min-width: 615px) {
		grid-row: 1 / -1;
		grid-column: ${props => props.left ? '2 / 3' : '1 / 2'};		
	}

	@media only screen and (min-width: 963px) {
		padding: 0px 30px;
	}
`;

const CountBoxStyled = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: space-around;
	font-family: 'Bungee Hairline', cursive;
	color: #134E5E;
	padding: 0px 20px;
	margin: 0;
	text-align: center;
	background-color: #ede8e8;
	padding: 0px 10px 10px 10px;


	> h1 {
		font-size: 18px;
		line-height: 1.5;
	}

	> p {
		font-size: 30px;
		margin: 0;
		line-height: 1;
		font-family: 'Bungee', cursive;
		height: 100%;
	}

	@media screen and (min-width: 615px) {
		> h1 {
			font-size: 24px;
			line-height: 1;
			margin-bottom: 12px;
		}
	}


	@media screen and (min-width: 798px) {
		> h1 {
			font-size: 35px;
		}
	}
	@media screen and (min-width: 1063px) {

		> p {
			font-size: 60px;
			line-height: 1;
		}
	}

`;