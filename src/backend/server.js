const MongoClient = require('mongodb').MongoClient;
const ObjectID = require('mongodb').ObjectID;
const db_uri = "mongodb://admin:password@localhost/?authSource=admin&authMechanism=SCRAM-SHA-256";

const request = require('request');
const config = require('../config.json');
const fs = require( 'fs' );


let express = require('express');
let app = express();

let mongo_options = {
  useUnifiedTopology: true,
  useNewUrlParser: true,
};

/*
 * Get all the languages from the server
 */
app.get( '/languages/', ( req, res ) => {
  MongoClient.connect( db_uri, mongo_options, (err, client) => {
    if(err) throw err;

    let criteria = {
      user_id: '',
      notebook: '',
    };

    let cursor = client.db('bibleplans').collection( 'languages-temp' ).find();

    cursor.toArray( ( err, result ) => {
      if (err) throw err;
      res.send( result );
    } );
  } );
} );

/*
 * Get all the Bibles for a given language
 */
app.get( '/bibles/', ( req, res ) => {
  let langs = [];
  let query = `${config.bible_api_url}/bibles`;

  if( req.query.language ) {
    query += `?language=${req.query.language}`;
  }
  request( {
    uri: query,
    json: true,
    headers: {
      'api-key': `${config.bible_api_key}`,
    }
  }, (err, r, body) => {
    if (err) return console.log(err);

    res.send( body );
  } );
} );

/*
 * Get all the books for the given Bible
 */
app.get( '/books/', ( req, res ) => {
  let langs = [];
  let query = `${config.bible_api_url}/bibles/`;

  if( req.query.bible ) {
    query += `${req.query.bible}/books`;
  }
  if( req.query.language ) {
    query += `?language=${req.query.language}`;
  }

  request( {
    uri: query,
    json: true,
    headers: {
      'api-key': `${config.bible_api_key}`,
    }
  }, (err, r, body) => {
    if (err) return console.log(err);

    res.send( body );
  } );
} );

/*
 * Get all the chapters for a given book of the Bible
 */
app.get( '/chapters/', ( req, res ) => {
  let langs = [];
  let query = `${config.bible_api_url}/bibles/`;

  if( req.query.bible ) {
    query += `${req.query.bible}/books/`;
  }
  if( req.query.book ) {
    query += `${req.query.book}/chapters`;
  }

  request( {
    uri: query,
    json: true,
    headers: {
      'api-key': `${config.bible_api_key}`,
    }
  }, (err, r, body) => {
    if (err) return console.log(err);

    console.log( body );
    res.send( body );
  } );
} );

/*
 * Get the text for a given chapter of a book of the Bible
 */
app.get( '/text/', ( req, res ) => {
  let langs = [];
  let query = `${config.bible_api_url}`;

  if( req.query.bible ) {
    query += `/bibles/${req.query.bible}`;
  }
  if( req.query.chapter ) {
    query += `/chapters/${req.query.chapter}`;
  }
console.log( query );
  request( {
    uri: query,
    json: true,
    headers: {
      'api-key': `${config.bible_api_key}`,
    }
  }, (err, r, body) => {
    if (err) return console.log(err);

    console.log( body );
    res.send( body );
  } );
} );

let server = app.listen( 8081, () => {
  let host = server.address().address;
  let port = server.address().port;
} );
