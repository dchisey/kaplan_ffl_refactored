import React, { Component } from 'react';
import styled from 'styled-components';
import Matchup from './ScheduleMatch';
import dataUtils from '../scripts/dataUtils';
import OWNERS_NAMES from '../scripts/owners';

class HeadToHead extends Component {
	constructor() {
		super();
		this.state = {
			firstOwner: '',
			secondOwner: '',
			matchupData: [],
			dataInputted: false
		}
	};

	ajax = async owners => {
		const { firstOwner, secondOwner } = owners;

		const options = {
			method: 'POST',
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({
				firstOwner,
				secondOwner
			})
		}

		const data = await fetch('http://localhost:3000/api/headtohead', options).then(res => {
			return res.json();
		}).catch(e => console.log(e));

		return data;
	}

	updateOwners = async input => {
		input.dataInputted = true;
		input.matchupData = await this.ajax(input)
		this.setState(input);
	}

	dataValidated = () => {
		const { firstOwner, secondOwner } = this.state;
		const firstOwnerMatch = OWNERS_NAMES.indexOf(firstOwner);
		const secondOwnerMatch = OWNERS_NAMES.indexOf(secondOwner);

		if(firstOwnerMatch !== -1 || secondOwnerMatch !== -1) {
			return <h1>Enter a valid owner, idiot.</h1>
		} else {
			console.log('did not fire')
		}
	}

	render() {
		const { firstOwner, secondOwner, dataInputted, matchupData } = this.state;

		return (
			<div>
				<OwnerSelection 
					updateOwners={this.updateOwners} 
					firstOwner={firstOwner} 
					secondOwner={secondOwner}
					dataInputted={dataInputted}
				/>
				{ dataInputted && <MatchupData ownersData={this.state} /> }
			</div>
		)
	}

}

class OwnerSelection extends Component {
	constructor(props) {
		super(props);
		this.state = {
			firstOwner: '',
			secondOwner: '',
			firstInputHasFocus: false,
			secondInputHasFocus: false
		}
	}


	selectOwners = e => {
		e.preventDefault();

		const ownerOneValidation = OWNERS_NAMES.indexOf(this.state.firstOwner);
		const ownerTwoValidation = OWNERS_NAMES.indexOf(this.state.secondOwner);

		if(this.namesValidated()) {
			this.props.updateOwners(this.state);	
		} else {
			alert('Jesus, enter a valid matchup, you moron.');
		}
	}

	handleOwnerChange = e => {

		const owner = e.target.id,
			  name = e.target.value;
		
		this.setState({ [owner] : name });
	}

	changeStateOnFocus = e => {
		const target = e.target.id;

		if(target == 'firstOwner') {
			this.setState({
				firstInputHasFocus: true,
				secondInputHasFocus: false
			})
		} else {
			this.setState({
				firstInputHasFocus: false,
				secondInputHasFocus: true
			})
		}
	}

	changeStateOnBlur = e => {
		this.setState({
			firstInputHasFocus: false,
			secondInputHasFocus: false			
		})
	}

	handleListSelection = left => {
		const owner = left ? 'firstOwner' : 'secondOwner';
		const _this = this;

		return function(e) {

			_this.setState({
				[ owner ]: e.target.innerHTML,
				firstInputHasFocus: false,
				secondInputHasFocus: false				
			})
		}
	}

	namesValidated = () => {
		const ownerOneValidation = OWNERS_NAMES.indexOf(this.state.firstOwner);
		const ownerTwoValidation = OWNERS_NAMES.indexOf(this.state.secondOwner);

		return (ownerOneValidation !== -1) && 
			   (ownerTwoValidation !== -1) && 
			   ownerOneValidation !== ownerTwoValidation
	}

	render() {

		const { firstOwner,
			    secondOwner, 
			    firstInputHasFocus, 
			    secondInputHasFocus } = this.state;

		const { dataInputted } = this.props;

		return (
			<div>
				<PlayerSelectionContainer>
					<PlayerSelection onSubmit={this.selectOwners}>
						<PlayerInput type="text" 
									 id="firstOwner"
									 value={firstOwner} 
									 onChange={this.handleOwnerChange} 
									 onFocus={this.changeStateOnFocus}
									 onBlur={this.changeStateOnBlur}
									 />
						<FetchButton type="submit" 
									 value="VS" />
						<PlayerInput type="text" 
									 id="secondOwner" 
									 value={secondOwner} 
									 onChange={this.handleOwnerChange} 
									 onFocus={this.changeStateOnFocus}
									 onBlur={this.changeStateOnBlur}
									  />
					</PlayerSelection>
				</PlayerSelectionContainer>
				<NoHeightDiv>
					{firstInputHasFocus && <Dropdown name={firstOwner} 
													 handleListSelection={this.handleListSelection} 
													 dataInputted={dataInputted}
													 left />}
					{secondInputHasFocus && <Dropdown name={secondOwner} 
													 handleListSelection={this.handleListSelection}
													 dataInputted={dataInputted} />}
				</NoHeightDiv>
			</div>
		)
	}
}


const MatchupData = props => {
	const { firstOwner, secondOwner, matchupData } = props.ownersData;
	const sortedData = dataUtils.splitData(matchupData, firstOwner, secondOwner)
	const comparedData = dataUtils.compare(sortedData);

	return (
		<GridLayout>
			<Matchup seasonData={comparedData.first} owner={firstOwner} left />
			<Matchup seasonData={comparedData.second} owner={secondOwner} />
		</GridLayout>
	)	
}

const Dropdown = props => {
	const search = props.name.toLowerCase();
	const { left, handleListSelection } = props;
	const filteredOwners = OWNERS_NAMES.filter(owner => {
		return owner.toLowerCase().indexOf(search) !== -1;
	})

	return (
		<DropdownStyled left={left}>
			{filteredOwners.map((owner, i) => (
				<OwnerName key={i} onMouseDown={handleListSelection(left)} >{owner}</OwnerName>	
			))}
		</DropdownStyled>
	)

}

const ErrorMessage = props => {
	return (
		<div>
			<h1>Enter the name of an actual owner, idiot.</h1>
		</div>
	)
}


export default HeadToHead;

const PlayerSelectionContainer = styled.div`
	background-color: rgba(0, 0, 0, 0.7);
	height: 250px;

	@media screen and (min-width: 615px) {
		height: 100px;
	}
`;

const PlayerSelection = styled.form`
	
	display: block;
	text-align: center;
	padding: 30px 0px;

	@media screen and (min-width: 615px) {
		padding: 0;
		display: flex;
		width: 100%;
		height: 100%;
		align-items: center;
		justify-content: space-around;
		font-family: 'Bungee Hairline', cursive;
	}

`;

const PlayerInput = styled.input`
	
	display: block;
	background-color: transparent;
	font-family: 'Raleway', sans-serif;
	border-width: 0px 0px 3px 0px;
	font-size: 1.5em;
	border-color: white;
	outline: 0;
	color: white;
	text-align: center;
	width: 89%;
	margin: 0 auto;

	@media screen and (min-width: 615px) {
		width: 37%;	
	}
`;

const FetchButton = styled.input`
	border: 3px solid white;
	background-color: transparent;
	color: white;
	height: 70px;
	width: 30%;
	font-family: 'Bungee Hairline', cursive;
	font-size: 42px;
	line-height: 0px;
	margin: 20px 0px;

	@media screen and (min-width: 742px) {
		width: 200px;
	}
`;

const NoHeightDiv = styled.div`
	position: relative;
	width: 100%;
	height: 0px;
	margin: 0;
`;

const DropdownStyled = styled.ul`
	position: absolute;
	background-color: rgba(0, 0, 0, 0.7);
	font-family: 'Raleway', sans-serif;
	list-style: none;
	margin: 0;
	padding: 0;
	text-align: center;
	top: 0;
	left: 50%;
	transform: translateX(-50%);
	z-index: 1;
	width: 100%;

	@media screen and (min-width: 615px) {
		width: 42%;
		${ props => props.left ? 'left: 0;' : 'right: 0; left: auto;' }
		transform: translateX(0%);
	}
`;

const OwnerName = styled.li`
	font-size: 25px;
	padding: 20px;

	&:hover {
		background-color: rgba(255, 255, 255, 0.1);
	}

	&:active {
		background-color: rgba(255, 255, 255, 0.3);
	}
`;


const GridLayout = styled.div`
	display: grid;
	grid-template-columns: 1fr 1fr;
	grid-template-rows: 1fr;
	grid-gap: 3px;
	margin: 10px;
`;
