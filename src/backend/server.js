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
 * Get all the pages for a given user and notebook
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

let server = app.listen( 8081, () => {
  let host = server.address().address;
  let port = server.address().port;
} );
