var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var schedule = require('node-schedule')
var spotifyApi = require('./database/spotifyApi');
var schedule = require('node-schedule')
var functions = require('./database/functions');


var indexRouter = require('./routes/index');
var usersRouter = require('./routes/myspotifydata');
var callbackRouter = require('./routes/callback');
var auth = require('./routes/auth');
var pics = require("./routes/pics")


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/material',express.static(path.join(__dirname, 'node_modules/material-design-lite')));

app.use('/', indexRouter);
app.use('/myspotifydata', usersRouter);
app.use('/callback',callbackRouter);
app.use('/auth',auth);
app.use('/pics',pics);
app.use('/audio',audio)

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

var date = new Date;
var minute = date.getMinutes;

var repeatingTask = schedule.scheduleJob('*/10 * * * *', async function(){
  let a1=[];
  let a2=[];
  await functions.refreshTokensFromSpotify(spotifyApi);
  await functions.getMyFavTracksFromSpotify(spotifyApi,a2);
  await functions.getMyRecentlyPlayedFromSpotify(spotifyApi,a1);
  console.log('Scheduled tasks completed.')
})




module.exports = app;
