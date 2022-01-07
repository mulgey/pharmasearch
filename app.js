// let's use express
const express = require('express');
const app = express();

// parse incoming requests
const bodyParser = require('body-parser');
app.use(bodyParser.json()); //json kullanılmış(?)
app.use(bodyParser.urlencoded({ extended: false }));

// Kurabiye çalışmalarımız için middleware
const cookieParser = require('cookie-parser');
app.use(cookieParser());

/*
// THIS SECTION WAS PUT ON HOLD DUE TO BLOCKING THE WORK WITH THE DATA ALSO TO US
// TIME TO PROTECT THE PROTECTED FOLDER
function userIsAllowed(callback) {
    // this function would contain your logic, presumably asynchronous,
    // about whether or not the user is allowed to see files in the
    // protected directory; here, we'll use a default value of "false"
    callback(false);
  };
// This function returns a middleware function
var protectPath = function(regex) {
    return function(req, res, next) {
        if (!regex.test(req.url)) { return next(); }

        userIsAllowed(function(allowed) {
            if (allowed) {
            next(); // send the request to the next handler, which is express.static
            } else {
            res.end('You are not allowed!');
            }
        });
    };
};

// Protect the protected folder
app.use(protectPath(/^\/protected\/.*$/));
*/
// Serve static files from /public
app.use(express.static(__dirname + '/public'));

// view engine setup
app.set('view engine', 'pug');
app.set('views', __dirname + '/views');

// include routes
var routes = require('./routes/index');
app.use('/', routes);

// morgen lütfen
const logger = require('morgan');
app.use(logger("dev")); // bu sayede terminalimizde bol bol "HTTPVerb + URL + statusCode" bilgisi alacağız

// listen on port 3000
app.listen(process.env.PORT || 3000, () => {
    console.log('Express in kulağı 3000 de, pür dikkat');
});