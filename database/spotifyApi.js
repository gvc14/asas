const spotifyWebApi = require('spotify-web-api-node');
const creds = require('../systemWideParams').credentials;
var tokens = require('./tokensDb');

let obj = {
    access_token:'',
    refresh_token:''
};
let spotifyApi = new spotifyWebApi(creds)
tokens.getTokens(obj).then(async()=>{
    await sleep(100)
    spotifyApi.setRefreshToken(obj.refresh_token);
    spotifyApi.setAccessToken(obj.access_token);
}).catch(err=>console.log(err));





module.exports = spotifyApi;

function sleep(ms){
    return new Promise(resolve=>{
        setTimeout(resolve,ms);
    })
}