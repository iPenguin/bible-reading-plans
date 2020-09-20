import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

//const config = require('./config.json');

class App extends Component {
  state = {
    loading: true,
    bibles: [],
    languages: []
  };

  async componentDidMount() {
    const response = await fetch( 'http://localhost:8081/bibles' );
    let data = await response.json();
    const lang_response = await fetch( 'http://localhost:8081/languages' );
    let languages = await lang_response.json();

    languages.sort( (a, b) => {
      return (a.name > b.name ? 1 : -1);
    } );

    data.data.sort( (a, b) => {
      return (a.name > b.name ? 1 : -1);
    } );

    this.setState( {
      loading: false,
      bibles: data.data,
      languages: languages
    } );
  }

  async languageChanged( event ) {
    const response = await fetch( `http://localhost:8081/bibles?language=${event.target.value}` );
    let data = await response.json();

    this.setState( {
      loading: false,
      bibles: data.data
    } );
  }

  render() {

    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Bible Reading Plans</h1>
        </header>
        <label>
          Languages:
          <select id='languages' onChange={( event ) => this.languageChanged(event)}>
          {this.state.languages.map( ( language ) => (
            <option key={language.id} value={language.id}>{language.name}</option>
          ) ) }
          </select>
        </label>
        <label>
          Bible:
          <select id='bible'>
          {this.state.bibles.map( ( bible ) => (
            <option key={bible.id} value={bible.id}>{bible.name}</option>
          ) ) }
          </select>
        </label>
      </div>
    );
  }
}

export default App;
