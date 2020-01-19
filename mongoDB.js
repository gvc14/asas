var MongoClient = require('mongodb').MongoClient;
const dbURL = require('./systemWideParams').dbURL;
var dbclient = new MongoClient(dbURL,{useUnifiedTopology: true, useNewUrlParser: true});
module.exports = dbclient;