import React, { Component } from 'react'
import styled from 'styled-components'

const properCase = (keywords) => {
    return keywords
        .split(' ')
        .map(word => `${word.charAt(0).toUpperCase()}${word.slice(1)}`)
        .join(' ')
}

const Label = styled.label`
    background-color: ${props => {
        return props.id === props.sortBy ? 'green' : 'transparent'
    }};
    border: 3px solid green;
`
const Input = styled.input`
    appearance: none;
    width: 0;
`

const Toggle = ({ sortBy, changeSortBy }) => {
    return (
        <div>
            <Label sortBy={sortBy} id='best' >
                <Input type='radio' name='toggle' onChange={changeSortBy} />Best
            </Label>
            <Label sortBy={sortBy} id='worst' >
                <Input type='radio' name='toggle' onChange={changeSortBy} />Worst
            </Label>
        </div>
    )
}

export default ({ ownerFocus, changeOwnerFocus, stats, sortBy, changeSortBy }) => {
    return (
        <div>
            <Toggle changeSortBy={changeSortBy} sortBy={sortBy} /> 
            <label for='dropdown'>Stat</label>
            <select name='dropdown'>
                {stats.map(stat => <option>{`${properCase(stat)}`}</option>)}
            </select>
        </div>
    )
}