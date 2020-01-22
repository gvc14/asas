var express = require('express');
var url = require('url');
var router = express.Router();
var spotifyApi = require('../database/spotifyApi');
var functions = require('../database/functions');
var MongoClient = require('mongodb').MongoClient;
const dbURL = require('../systemWideParams').dbURL;
var dbclient = new MongoClient(dbURL,{useUnifiedTopology: true, useNewUrlParser: true});


/* GET users listing. */
router.get('/', async function(req, res, next) {
    var code = url.parse(req.url,true).query.code;
    await functions.getTokensFromSpotify(spotifyApi,code);
    res.redirect('https://gauravchaudhari.azurewebsites.net/')
});

module.exports = router;
