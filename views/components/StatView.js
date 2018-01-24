import React, { Component } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const viewOptions = [
	{
		id: 1,
		title: 'Head-to-Head',
		desc: 'Take strength of schedule out of the equation and see how you compare to another owner.',
		path: '/headtohead'
	},
	{
		id: 2,
		title: 'League Comparison',
		desc: 'You have a losing record, but you consistently have high scores. Compare yourself to the whole league.',
		path: '/'
	}
];


const StatView = () => (
	<Wrapper>
		{viewOptions.map(opt => (
			<ChoiceBox to={ opt.path } key={ opt.id }>
				<h1>{ opt.title }</h1>
				<p>{ opt.desc }</p>
			</ChoiceBox>))
		}
	</Wrapper>
)



export default StatView;

const Wrapper = styled.div`
	display: flex;
	justify-content: space-around; 
	align-content: flex-start;
	align-items: center;
	flex-wrap: wrap;
	height: 60vh;
	min-height: 250px;
`;

const ChoiceBox = styled(Link)`
	display: flex;
	flex-direction: column;
	justify-content: center;
	text-align: center;
	width: 45%;
	height: 100%;
	padding: 0px;
	margin: 10px;
	background-color: rgba(215, 234, 239, 0.8);
	color: #134e5e;
	font-family: 'Bungee Hairline', cursive;
	font-weight: 100;
	transition: 0.2s;
	overflow: visible;
	text-align: center;
	min-width: 250px;
	text-decoration: none;

	> h1 {
		line-height: 40px;
		padding: 0;
	}
	> p {
		font-weight: 600;
		padding: 0px 20px;
	}
	&:hover {
		background-color: rgba(215, 234, 239, 1);
	}
`;