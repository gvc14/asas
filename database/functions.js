var spotifyApi = require('./spotifyApi');
const trackDbOps = require('./trackDbOps');
const tokensDb = require('./tokensDb');
var dbclient = require('../mongoDB');
let array =[];

async function getTokensFromSpotify(spotifyApi,code){
        spotifyApi.authorizationCodeGrant(code).then(async(response)=>{
            spotifyApi.setAccessToken(response.body['access_token']);
            spotifyApi.setRefreshToken(response.body['refresh_token']);
            console.log('Tokens received from Spotify.'+ ' Tokens expire in '+ response.body.expires_in +' s. Updating token database..');
            //await sleep(1000);
            await tokensDb.deleteTokens();
            //await sleep(1000);
            await tokensDb.setTokens({
                access_token: response.body.access_token,
                refresh_token: response.body.refresh_token,
                expires_in: response.body.expires_in,
                timestamp: Date.now()
            })
        }).catch(err=>{return err});    
}

async function refreshTokensFromSpotify(spotifyApi){
       spotifyApi.refreshAccessToken().then(async(response)=>{
            spotifyApi.setAccessToken(response.body['access_token']);
            console.log('Tokens refreshed from Spotify.'+ ' Tokens expire in '+ response.body.expires_in +' s. Updating token database..');
            await tokensDb.updateTokens({
                access_token: response.body.access_token,
                refresh_token: spotifyApi.getRefreshToken,
                expires_in: response.body.expires_in,
                timestamp: Date.now()
            })
       }).catch(err=>{return err});
}

async function useStoredTokens(spotifyApi){
    try{
        let token={};
        await tokensDb.getTokens(token);
        spotifyApi.setAccessToken(token.access_token);
        spotifyApi.setRefreshToken(token.refresh_token);   
    }catch(err){
        console.log('Cannot get tokens from token DB.' +'\n' + 'Trying to refresh tokens..');
        refreshTokensFromSpotify(spotifyApi);
    }
}

async function getMyRecentlyPlayedFromSpotify(spotifyApi,array){
        spotifyApi.getMyRecentlyPlayedTracks({'limit':12})
        .then(data=>{
            data.body.items.forEach(item=>{
                array.push({
                    trackname: item.track.name,
                    artist: item.track.artists[0].name,
                    album: '',
                    image: '',
                    url: item.track.external_urls.spotify,
                    preview: item.track.preview_url,
                    ID: item.track.id  
                })       
            })
        })
        .then(async()=> await trackDbOps.clearTrackDB('recentlyPlayed'))
        .then(async()=>{
            array.forEach(element=>{
                spotifyApi.getTrack(element.ID).then(data=>{
                    element.album = data.body.album.name;
                    element.image = data.body.album.images[0].url;
                })
            })
            await sleep(1000);
        })
        .then(async()=> await trackDbOps.addToTrackDB('recentlyPlayed',array))
        .then(()=>console.log('Got recently played from Spotify! Updating database..'))
        .catch(err=>console.log('Cannot get recently played from spotify.' +'\n' + err))
       
}          
           // console.log('Got recently played from Spotify! Updating database..')
            //
      //  })
        

        

async function getMyFavTracksFromSpotify(spotifyApi,array){
        spotifyApi.getMyTopTracks({'limit':12,'time_range':'long_term'})
        .then(async(data)=>{
            data.body.items.forEach(item=>{
                array.push({
                    trackname: item.name,
                    artist: item.artists[0].name,
                    album: item.album.name,
                    image: item.album.images[0].url,
                    url: item.external_urls.spotify,
                    preview: item.preview_url
                })
            })
            
        })
        .then(async()=>{
            await trackDbOps.clearTrackDB('myFavs');
            await sleep(0);
            console.log('Got favourite tracks from Spotify! Updating database..')
            await trackDbOps.addToTrackDB('myFavs',array);    
        }).catch(err=>console.log('Cannot get favourite tracks from spotify.'+'\n'+err))    
        
}

async function getMyFavTracksFromDB(array){
    await trackDbOps.getFromTrackDB('myFavs',array)
    await sleep(1000);
   // console.log(array);

}
async function getRecentlyPlayedTracksFromDB(array){
        await trackDbOps.getFromTrackDB('recentlyPlayed',array)
        await sleep(1000);
       // console.log(array);
}

function sleep(ms){
    return new Promise(resolve=>{
        setTimeout(resolve,ms);
    })
}

module.exports = {
    getRecentlyPlayedTracksFromDB,
    getMyRecentlyPlayedFromSpotify,
    getMyFavTracksFromDB,
    getMyFavTracksFromSpotify,
    getTokensFromSpotify,
    getTokensFromSpotify,
    useStoredTokens,
    refreshTokensFromSpotify
}