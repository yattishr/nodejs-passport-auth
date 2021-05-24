const express = require('express');
const app = express();
const mongoose = require('mongoose');
const flash = require('connect-flash');
const session = require('express-session');
const passport = require('passport');
require('dotenv').config();


// Passport config
require('./config/passport')(passport);


const PORT= process.env.PORT || 5000

const expressLayouts = require('express-ejs-layouts');

// Db config
const db = require('./config/keys').mongoURI;

// Connect to MongoDb
mongoose.connect(db, { useNewUrlParser: true})
    .then(() => console.log('MongoDb connected...'))
    .catch(err => console.log('Opps, an error has ocurred connecting to your database; ',err))

// EJS 
app.use(expressLayouts);
app.set('view engine', 'ejs') // make sure this line is below, else EJS won't work.

// Bodyparser
app.use(express.urlencoded({ extended: false}));

// Express middleware
app.use(session({
    secret: 'slice of pizza',
    resave: true,
    saveUninitialized: true
}))

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Connect flash
app.use(flash());

// Global vars
app.use(function(req, res, next) {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    next();
});

// Routes
app.use('/', require('./routes/index'))
app.use('/users', require('./routes/users'))

// start the app on PORT 5000
app.listen(PORT, console.log(`Server started on port ${PORT}`));
