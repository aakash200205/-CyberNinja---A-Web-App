const mongoDbStore = require('connect-mongodb-session');
const expressSession = require('express-session')

function sessionStorage(){
    const MongoDbStore = mongoDbStore(expressSession);


   const store = new MongoDbStore({
    uri:'mongodb://127.0.0.1:27017',
    databaseName:'cyberninja',
    collection:'session'

    });

    return store;



}

function createSessionConfig(){
    return{
        secret:'secret-key',
        resave:false,
        saveUninitialized:false,
        store:sessionStorage(),
        cookie:{
            maxAge: 2*24*24*60*60*1000  //2days
        }
    }
};

module.exports = createSessionConfig;