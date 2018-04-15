import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  constructor() {
    super();
    this.ajax = this.ajax.bind(this);
  }

  componentDidMount() {
    this.ajax()
  }

  async ajax() {
    const data = await fetch('../api/leaguecomparison')
      .then(res => res.json())
      .catch(err => console.log(err))

    console.log(data)
    return data
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
      </div>
    );
  }
}

export default App;
