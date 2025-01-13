const express = require("express");

const path = require('path');

const app = express();

const db = require('./database/database');

const csrf = require("csurf");

const addCsrfTokenMiddleware = require('./middleware/csrfToken');

const errorHandlingMiddleware = require('./middleware/errorHandler');

const checkAuthStatusMiddleware = require('./middleware/check_authentication');

/* const bodyParser = require('body-parser'); */

const authentication_Routes = require('./routes/authentication.routes');

const expressSession = require('express-session');

const createsessionConfig = require('./configuration/session');

const productRoutes = require('./routes/products.routes');

const baseRoutes = require('./routes/base.routes');

const adminRoutes = require('./routes/admin.routes');

app.use(baseRoutes);

app.use(authentication_Routes);

app.use(productRoutes);

app.use(adminRoutes);

app.set('view engine','ejs');
app.set('views',path.join(__dirname,'view'));

app.use(express.static('public'));

app.use(express.urlencoded({extended:true}));

const sessionConfig = createsessionConfig();

app.use(expressSession(sessionConfig));

app.use(csrf());

app.use(addCsrfTokenMiddleware);

app.use(checkAuthStatusMiddleware);

app.use(errorHandlingMiddleware);

/* app.use(bodyParser.urlencoded({extended:true})); */

db.connectDatabase().then(function(){
    app.listen(3000);
}).catch(function(error){
     console.log("Failed to connect to DB!!!!");
    console.log(error);
})
