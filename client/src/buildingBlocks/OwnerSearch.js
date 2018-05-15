import React, { Component } from 'react'
import styled from 'styled-components'

const FormContainer = styled.div`
    background-color: black;
    height: 40px;
`

const Input = styled.input`
    height: 100%;
    color: white;
    font-family: 'Raleway', sans-serif;
`

const Button = styled.input`

`

export default class OwnerSearch extends Component {
    constructor(props) {
        super(props)
        this.state = {
            value: props.ownerFocus
        }
        this.updateSearch = this.updateSearch.bind(this)
    }

    updateSearch(e){
        console.log(e)
        // this.setState({
        //     value: e.target.value
        // })
    }

    render() {
        <FormContainer>
            <form>
                <Input type="text" onChange={this.updateSearch} />
                <input type="submit" onSubmit={this.props.changeOwnerFocus} />
            </form>
        </FormContainer>
    }

}