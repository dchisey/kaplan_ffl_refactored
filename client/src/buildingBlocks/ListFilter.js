import React, { Component } from 'react'
import styled from 'styled-components'

const properCase = (keywords) => {
    return keywords
        .split(' ')
        .map(word => `${word.charAt(0).toUpperCase()}${word.slice(1)}`)
        .join(' ')
}

const Container = styled.div`
    margin: 20px;
    display: flex;
    justify-content: space-around;
`

const Label = styled.label`
    background-color: ${props => {
        return props.id === props.sortBy ? 'rgb(19, 78, 94, 0.7)' : 'transparent'
    }};
    color: ${props => {
        return props.id === props.sortBy ? 'white' : 'black'
    }};
    height: 40px;
    padding: 5px 10px;
    text-align: center;
    border: 2px solid #134e5e;
    ${props => props.orientation ? 'border-right: 1px solid #134e5e;' : 'border-left: 1px solid #134e5e;'}
    transition: .2s linear;
`
const Input = styled.input`
    display: none;
    width: 0;
`
const Select = styled.select`
    outline: none;
    height: 40px;
    border: none;
    border-bottom: 1.3px solid #134e5e;
    background-color: transparent;
    padding: 5px 10px;
    font-family: 'Bungee Hairline', sans-serif;
    color: black;
    font-weight: 700;
    line-height: 1em;
`

const Option = styled.option`
    color: black;
    font-weight: 700;
    line-height: 1em;
`

const Toggle = ({ sortBy, changeSortBy }) => {
    return (
        <div>
            <Label sortBy={sortBy} id='best' orientation='left' >
                <Input type='radio' name='toggle' onChange={changeSortBy} />Best
            </Label>
            <Label sortBy={sortBy} id='worst' >
                <Input type='radio' name='toggle' onChange={changeSortBy} />Worst
            </Label>
        </div>
    )
}

export default ({ ownerFocus, changeOwnerFocus, stats, sortBy, changeSortBy, changeStat, unit }) => {
    return (
        <Container>
            <Toggle changeSortBy={changeSortBy} sortBy={sortBy} /> 
            <div>
                <label for='dropdown'>Stat: </label>
                <Select onChange={changeStat} name='dropdown'>
                    {stats.map((stat, i) => <Option key={`option_${unit}_${i}`}>{`${properCase(stat)}`}</Option>)}
                </Select>
            </div>
        </Container>
    )
}