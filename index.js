// Thursday February 9, 2023 SBasa

const express = require('express');
const session = require('express-session');
const expresshandlebars = require('express-handlebars');
const everyRoute = require('./controllers');

const sequelize = require('./config/connection');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

const app = express();
const PORT = process.envPORT || 3001;

// defining database tables
const {Blog, UserLogin} = require('./models')

// session package cookie string
// cookie expires at 3 hours
// resave is set to not create a new cookie when no new data is present
// saveUninitialized is set to not create a cookie when no custom data is present
const sesh = {
    secret: process.env.SESSION_SECRET,
    cookie: {
        // the cookie is estimated to expire in 2 days
        maxAge:1000*60*60*3
    },
    resave: false,
    saveUninitialized: true,
    store: new SequelizeStore({
        db: sequelize
    })
}


app.use(session(sesh))

// Middleware express data parsing from to JSON format
app.use(express.urlencoded({ extended: true}));
app.use(express.json());

// directory of static files
app.use(express.static('public'));

// Instantiates the handlebars views engine
const handle = expresshandlebars.create({});
app.engine('handlebars', handle.engine);

// use every route
app.use(everyRoute);

// first route
app.get("/", (request, response)=>{
    response.send("hello welcome to the Tech Blog!")
})

// route to show session cookie
app.get("/sessions", (request, response)=>{
    
    // respond with displaying session data
    response.json(request.session)
})

// takes database data and will not restart database data
// placing this sync to true will drop the tables from the database
sequelize.sync({ force: false}).then(function(){
    app.listen(PORT, function() {
        console.log('Test for app to listen on PORT' + PORT );
    });
});