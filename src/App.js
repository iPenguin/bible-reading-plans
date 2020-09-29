import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

//const config = require('./config.json');

class App extends Component {
  state = {
    loading: true,
    bibles: [],
    books: [],
    chapters: [],
    languages: [],
    language: 'eng',
    bible: '',
    chapter: '',
    content: []
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
    let value = event.target.value;
    const response = await fetch( `http://localhost:8081/bibles?language=${value}` );
    let data = await response.json();

    this.setState( {
      loading: false,
      bibles: data.data,
      language: value
    } );
  }

  async bibleChanged( event ) {
    let value = event.target.value;
    const response = await fetch( `http://localhost:8081/books?bible=${value}` );
      let data = await response.json();

      this.setState( {
        loading: false,
        books: data.data,
        bible: value
      } );
  }

  async bookChanged( event ) {
    let value = event.target.value;
    const response = await fetch( `http://localhost:8081/chapters?bible=${this.state.bible}&book=${value}` );
      let data = await response.json();

      this.setState( {
        loading: false,
        chapters: data.data,
        book: value
      } );
  }

  async chapterChanged( event ) {
    let value = event.target.value;
    const response = await fetch( `http://localhost:8081/text?bible=${this.state.bible}&chapter=${value}` );
      let data = await response.json();

      this.setState( {
        loading: false,
        content: data.data,
        chapter: value
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
          <select id='languages' onChange={ ( event ) => this.languageChanged( event ) }>
          {this.state.languages.map( ( language ) => (
            <option key={language.id} value={language.id}>{language.name}</option>
          ) ) }
          </select>
        </label>
        <br />
        <label>
          Bible:
          <select id='bible' onChange={ ( event ) => this.bibleChanged( event ) }>
          {this.state.bibles.map( ( bible ) => (
            <option key={bible.id} value={bible.id}>{bible.name}</option>
          ) ) }
          </select>
        </label>
        <br />
        <label>
          Books:
          <select id='books' onChange={ ( event ) => this.bookChanged( event ) }>
          {this.state.books.map( ( book ) => (
            <option key={book.id} value={book.id}>{book.name}</option>
          ) ) }
          </select>
        </label>
        <br />
        <label>
          Chapters:
          <select id='chapters' onChange={ ( event ) => this.chapterChanged( event ) }>
          {this.state.chapters.map( ( chapter ) => (
            <option key={chapter.id} value={chapter.id}>{chapter.number}</option>
          ) ) }
          </select>
        </label>
        <div dangerouslySetInnerHTML={{__html: this.state.content.content }} />
        <div className='brp-bible-copy-right'>
          {this.state.content.copyright}
        </div>
      </div>
    );
  }
}

export default App;
