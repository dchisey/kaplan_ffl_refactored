import React, { Component } from 'react';
import './App.css';

class App extends Component {
  constructor() {
    super();
    this.ajax = this.ajax.bind(this);
  }
  
  componentWillMount() {
    this.ajax()
  }

  async ajax() {
    const options = {
      method: 'POST',
      headers: { "Content-Type": "application/json" }
    }

    const uri = 'https://kaplan-ffl.herokuapp.com/api/leaguecomparison'
    const data = await fetch(uri)
      .then(res => res.json())
      .catch(e => console.warn(e));
    console.log(data)
    return data
  }

  render() {
    return (
      <h1>sup</h1>
    );
  }
}

export default App;
