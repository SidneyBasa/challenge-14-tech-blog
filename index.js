// Thursday February 9, 2023 SBasa

const express = require('express');
const session = require('express-session');
const expresshandlebars = require('express-handlebars');
const joinedRoutes = require('./controllers');

const sequelize = require('./config/connection');
const SequelizeStore = require('connect-session-sequeilize')(session.Store);

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
        maxAge:1000*60*60*3
    },
    resave: false,
    saveUninitilized: true,
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

const handle = expresshandlebars.create({});
app.engine('handlebars', handle.engine);

app.use(joinedRoutes);
app.get("/sessions", (request, response)=>{
    
    // request session data for login
    request.json(request.session)
})

// takes database data and will not restart database data
sequelize.sync({ force: false}).then(function(){
    app.listen(PORT, function() {
        console.log('Test for app to listen on PORT' + PORT );
    });
});