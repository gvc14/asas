var express = require('express');
var router = express.Router();
const spotifyApi = require('../database/spotifyApi');
const functions = require('../database/functions');
// var MongoClient = require('mongodb').MongoClient;
// const dbURL = require('../systemWideParams').dbURL;
// var  dbclient = new MongoClient(dbURL,{useUnifiedTopology: true, useNewUrlParser: true});

/* GET users listing. */
router.get('/',async function(req, res, next) {
  let track={
    trackname:'',
    artist:'',
    album:'',
    url:'',
    image:'',
    preview:''
  };
  let recentlyplayed = [];
  let myfavs = [];
  await sleep(500);
  spotifyApi.getMyCurrentPlaybackState().then(data=>{
    if(data.body.is_playing){
      spotifyApi.getMyCurrentPlayingTrack()
      .then(async(data)=>{
            track.trackname = data.body.item.name;
            track.album = data.body.item.album.name;
            track.url = data.body.item.external_urls.spotify;
            track.image= data.body.item.album.images[0].url;
            track.preview=data.body.item.preview_url;
            track.artist=data.body.item.artists[0].name;
            await sleep(500)
      })
      .catch(err=>console.log('Funcekd up' + '\n' + err))
    }else return   
  })
  .then(async()=>{
    await functions.getRecentlyPlayedTracksFromDB(recentlyplayed);
  })
  .then(async()=>{
    await functions.getMyFavTracksFromDB(myfavs)
  })
  .then(()=>{
    res.render('spotify', {data: track, recent:recentlyplayed,myfavs:myfavs});
  }).catch(async(err)=>{
    console.log("Some errors getting data" +'\n' +err);
    await functions.getRecentlyPlayedTracksFromDB(recentlyplayed);
    await functions.getMyFavTracksFromDB(myfavs)
    res.render('spotifyNoCurrent', {recent:recentlyplayed,myfavs:myfavs});
    // res.redirect('/');
  })


});

module.exports = router;
function sleep(ms){
  return new Promise(resolve=>{
      setTimeout(resolve,ms);
  })
}