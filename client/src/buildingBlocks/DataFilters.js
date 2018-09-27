import React, { Component } from 'react';
import styled from 'styled-components';

const FilterModule = styled.form`
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: rgba(0, 0, 0, 0.6);
    color: white;
    width: 100%;
    height: 85px;
    margin: 10px 0px;
`

const Filter = styled.div`

    margin: 10px 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    line-height: 1;
`

const Dropdown = styled.select`
    display: block;
    margin: 0 10px;
    background-color: transparent;
    color: white;
    font-family: 'Bungee Hairline', sans-serif;
    line-height: 1;
    font-size: 1.4em;
    border: none;
    border-bottom: 3px solid;
    outline: none;
`

const Label = styled.label`
    display: block;
    text-align: center;
    margin: 0px 10px;
    line-height: 1;
    margin: 3px 0px;
`
const Title = styled.h1`
    margin: 0px 20px;
`

const Button = styled.button`
    background-color: transparent;
    border: 3px solid white;
    color: white;
    font-family: 'Bungee Hairline', sans-serif;
    padding: 10px;
    font-size: 1.2em;
    margin: 10px 20px;
    line-height: 1;
    outline: none;
`

const Option = styled.option`
    background-color: rgba(0, 0, 0, 0.8);
`

const Checkbox = styled.div`
    margin: 10px 20px;
`

const Select = ({ number, customData, handleFilterChange, filterId, value, label, createArray }) => {
    const data = customData || createArray(number, 0, num => num + 1)
    return (
        <div>
            <Label for={filterId}>{label}</Label>
            <Dropdown value={value} id={filterId} onChange={handleFilterChange}>
                {data.map((item, i) => <Option key={`option_${filterId}_${i}`} name={item}>{item}</Option>)}
            </Dropdown>
        </div>
    )
}

const RegPostseasonToggle = ({ weeksIncluded, handleRegPostToggle }) => {
    const includePostseason = weeksIncluded === 15
    return (
        <Checkbox>
            <input name="reg" onChange={handleRegPostToggle} checked={includePostseason} type="checkbox" />
            <label for='reg'>Include Postseason</label>
        </Checkbox>
    )
}

export default class DataFilters extends Component {
    render() {
        const { weekStart, weekEnd, startYear, endYear, weeksIncluded } = this.props
        const years = [2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018]
        return (
            <FilterModule onSubmit={this.props.getData}>
                <Filter>
                    <Title>Week Start</Title>
                    <Select {...this.props} filterId="weekStart" value={weekStart} number={weeksIncluded} label="Week" />
                    <Select {...this.props} filterId="startYear" value={startYear} customData={years} label="Year"/> 
                </Filter>
                <Filter>
                    <Title>Week End</Title>
                    <Select {...this.props} filterId="weekEnd" value={weekEnd} number={weeksIncluded} label="Week"/>
                    <Select {...this.props} filterId="endYear" value={endYear} customData={years} label="Year"/>  
                </Filter>
                <RegPostseasonToggle {...this.props}/>
                <Button type="submit">Set Range</Button>
            </FilterModule>
        )
    }
}