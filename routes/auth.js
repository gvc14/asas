var express = require('express');
var url = require('url');
var router = express.Router();
var spotifyApi = require('../database/spotifyApi');
//var functions = require('../database/functions');
const scopes = ['user-read-currently-playing', 'user-read-playback-state','user-library-read','user-top-read','user-read-recently-played','user-top-read'];

/* GET users listing. */
router.get('/', function(req, res, next) {
    res.redirect(spotifyApi.createAuthorizeURL(scopes,!304));
});

module.exports = router;