//const SpotifyWebApi = require('spotify-web-api-node');
//const open = require('open')
//const scopes = ['user-read-currently-playing', 'user-read-playback-state','user-library-read','user-top-read'];
// const spotifyApi = new SpotifyWebApi({
//     clientId: '63474946df8542a6846202a412c9f98b',
//     clientSecret: 'dd9c0061717942cf900fc53bd0da0ea7',
//     redirectUri: 'http://localhost:3000/callback'
// });

const credentials = {
    clientId: '63474946df8542a6846202a412c9f98b',
    clientSecret: 'dd9c0061717942cf900fc53bd0da0ea7',
    redirectUri: 'https://gauravchaudhari.azurewebsites.net/callback'
}
const dbURL = 'mongodb+srv://localApp:14041996gvc@spotycluster-w4kxr.mongodb.net/test?retryWrites=true&w=majority'
    
//const authorizeURL = spotifyApi.createAuthorizeURL(scopes, !304);
module.exports={credentials,dbURL};