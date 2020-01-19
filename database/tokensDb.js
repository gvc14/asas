var MongoClient = require('mongodb').MongoClient;
const dbURL = require('../systemWideParams').dbURL;
var dbclient = new MongoClient(dbURL,{useUnifiedTopology: true, useNewUrlParser: true});

const promise = dbclient.connect();

async function deleteTokens(){
    promise.then(client=>{
        let token = client.db('info').collection('tokens').deleteOne({})
        .then(data=>console.log('Old tokens deleted.'))
        .catch(err=> console.log('Cannot delete old tokens.' + '\n' + err));
        // .then(data=> console.log('Tokens deleted.'))
        // .catch(err=>{
        //     console.log('Cannot delete tokens' + '\n'+err);
        // });
        return;
    }).catch(err=>{
        return err;
    })
};
async function getTokens(obj){
        promise.then(client=>{
            //if(err) throw err;
            console.log('TokenDB connected.');
            const token = client.db('info').collection('tokens').findOne({},{projection:{_id:0}})
            .then(data=>{
                console.log('Retrieved tokens from DB.');
                obj.access_token = data.access_token;
                obj.refresh_token = data.refresh_token;
                obj.timestamp = data.timestamp;
            })
            .catch(err=> console.log('Cannot retrieve tokens from DB.' + '\n'+err));
            return;
        }).catch(err=>{
            return err;
        })   
};

async function setTokens(obj){
    promise.then(client=>{
        const token = client.db('info').collection('tokens').insertOne(obj)
        .then(response => console.log('New tokens inserted in DB.'))
        .catch(err=> console.log('Tokens could not be inserted.' + '\n' +err))
        return;
    }).catch(err=>{
        return err;
    })
}

async function updateTokens(obj){
    promise.then(client=>{
        const token = client.db('info').collection('tokens').findOneAndReplace({},obj)
        .then(response => console.log('Tokens updated in DB.'))
        .catch(err=> console.log('Tokens could not be inserted.' + '\n' +err))
        return;
    }).catch(err=>{
        return err;
    })
}

module.exports = {updateTokens,setTokens,deleteTokens,getTokens,promise};
