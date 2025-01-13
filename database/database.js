const mongodb = require('mongodb');

const MongoClient = mongodb.MongoClient;

let database;

async function connectDatabase(){
    const client = await MongoClient.connect('mongodb://127.0.0.1:27017');
    database= client.db('cyberninja');
}

function checkdb(){
    if(!database){
        throw new Error('Connect toh kar bc!!!');
    }

    return database;
}

module.exports={
    connectDatabase:connectDatabase,
    checkdb:checkdb
}