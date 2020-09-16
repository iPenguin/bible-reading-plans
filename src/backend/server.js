const MongoClient = require('mongodb').MongoClient;
const ObjectID = require('mongodb').ObjectID;
const db_uri = "mongodb://admin:password@localhost/?authSource=admin&authMechanism=SCRAM-SHA-256";

const request = require('request');
const config = require('../config.json');

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

  request( {
    uri: `${config.bible_api_url}/bibles`,
    json: true,
    headers: {
      'api-key': `${config.bible_api_key}`,
    }
  }, (err, r, body) => {
    if (err) return console.log(err);

    res.send( body );
  } );
} );

let server = app.listen( 8081, () => {
  let host = server.address().address;
  let port = server.address().port;
} );
