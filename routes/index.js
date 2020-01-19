var express = require('express');
var router = express.Router();
var tokens = require('../database/tokensDb');
var spotifyApi = require('../database/spotifyApi');
const functions = require('../database/functions');

/* GET home page. */
router.get('/',async function(req, res, next) {
  // let obj = {
  //   access_token:'',
  //   refresh_token:''
  // };
  let track={
    trackname:'',
    artist:'',
    album:'',
    url:'',
    image:'',
    preview:''

  };
  let arr=[];
  let arr1=[];
  await functions.refreshTokensFromSpotify(spotifyApi);
  await functions.getMyFavTracksFromSpotify(spotifyApi,arr1);
  await functions.getMyRecentlyPlayedFromSpotify(spotifyApi,arr);
  await sleep(500);
  // spotifyApi.getMyCurrentPlayingTrack()
  // .then(async(data)=>{
  //       track.trackname = data.body.item.name;
  //       track.album = data.body.item.album.name;
  //       track.url = data.body.item.external_urls.spotify;
  //       track.image= data.body.item.album.images[0].url;
  //       track.preview=data.body.item.preview_url;
  //       track.artist=data.body.item.artists[0].name;
  //       await sleep(500)
  // })
  // .then(()=>res.render('index', { data: track }))
  // .catch(err=>{
    // console.log('Funcekd up' + '\n' + err)
    res.render('index')
  // tokens.getTokens(obj)
  // .then(()=>{
  //   spotifyApi.setAccessToken(obj.access_token)
  //   spotifyApi.setRefreshToken(obj.refresh_token);  
  // })
  // await sleep(1000);
  // try{ 
  //     spotifyApi.getMyCurrentPlayingTrack(function(err,trackinfo){
  //       track.trackname = trackinfo.body.item.name;
  //       track.album = trackinfo.body.item.album.name;
  //       track.url = trackinfo.body.item.external_urls.spotify;
  //       track.image= trackinfo.body.item.album.images[0].url;
  //       track.preview=trackinfo.body.item.preview_url;
  //     })
  // }catch(err){
  //   console.log('Shit went wrong'+'\n'+err)
  // }
  // await sleep(1000)
  

});

module.exports = router;
function sleep(ms){
    return new Promise(resolve=>{
        setTimeout(resolve,ms);
    })
}