import React, { Component } from 'react';
import styled from 'styled-components';

const WeekSelector = props => {
    const numWeeks = 12;

    this.createOptions = weeks => {
        let arr = [];
        for(let i = 1; i <= numWeeks; i++) {
            arr.push(i);
        }
        return arr;
    }

    return (
        <div>
            <select onChange={props.handleWeekSelection}>
                {this.createOptions(numWeeks).map((_, number) => <option key={number}>{number + 1}</option>)}
            </select>
        </div>
    )
    
}

export default WeekSelector;