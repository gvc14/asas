const promise = require('./tokensDb').promise;
let array =[];

async function clearTrackDB(collectionName){
        promise.then(client=>{
            const collection = client.db('info').collection(collectionName).deleteMany({})
            .then(data=> console.log( data.deletedCount +' Tracks cleared from collection: '+collectionName+ ' .' ))
            .catch(err => console.log('Cannot delete tracks from collection: ' + collectionName +'\n'+err))
        }).catch(err =>{
            return err;
        })    
};

//console.log('Added: ' + data.insertedCount + ' tracks to '+collectionName);

async function addToTrackDB(collectionName,array){
    promise.then(client=>{
        const collection = client.db('info').collection(collectionName).insertMany(array)
        .then(data=> console.log('Added ' + data.insertedCount + ' tracks to collection'+collectionName))
        .catch(err => console.log('Cannot add tracks from collection: ' + collectionName +'\n'+err))
        return;
    }).catch(err=>{
        return err;
    })
}

async function getFromTrackDB(collectionName,array){
    promise
    .then(client=>client.db('info').collection(collectionName).find({}))
    .then(items =>items.toArray())
    .then(data=>{
        data.forEach(item=>{
            array.push(item);
        })
        return;
    })
    .catch(err=>{
        console.log('Cannot get tracks from collection '+ collectionName+'\n' + err);
    })
}

module.exports = {getFromTrackDB,addToTrackDB,clearTrackDB};