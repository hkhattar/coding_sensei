// Require the Express Module
var express = require('express');

// var session = require('express-session');
var cookieParser = require('cookie-parser');
// var json = require('express-json');
var cookie = require('cookie');

// Require path
var path = require('path');
// Create an Express App
var app = express();
// Require body-parser (to receive post data from clients)
// var bcrypt = require('bcryptjs');
var bodyParser = require('body-parser');
// new code:
var session = require('express-session');
// original code:
app.use(cookieParser());
// more new code:
app.use(session({secret: 'codingdojorocks'}));  // string for encryption


// require the mongoose configuration file which does the rest for us
require('./server/config/mongoose.js');


// Integrate body-parser with our App
app.use(bodyParser.urlencoded({ extended: true }));

// Setting our Static Folder Directory
app.use(express.static(path.join(__dirname, './client')));
app.use(express.static(path.join(__dirname, './bower_components')));

app.use(bodyParser.json());


var routes_setter = require('./server/config/routes.js')
routes_setter(app);

// Setting our Server to Listen on Port: 8000
app.listen(8007, function() {
    console.log("listening on port 8007 coding sensei");
})