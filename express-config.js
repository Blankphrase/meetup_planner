var express = require('express');
var app = express();

var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var path = require('path');
var session = require('express-session');
var flash = require('connect-flash');
var passport = require('passport');
var session = require('express-session');
var MongoStore = require('connect-mongo')(session);

module.exports.expressSetup = function(app){
  app.set('port', process.env.PORT || 3000);
  app.set('views', path.join(__dirname, '/views'));
  app.set('view engine', 'ejs');
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(cookieParser());
  app.use(express.static(__dirname + '/public'));
  app.use(session({
	  secret: 'secret_key',
	  cookie: {maxAge: 1209600000},
	  // store: new MongoStore({
	  //   'db': 'meetupplanner'
	  // }),
	  resave: true,
	  saveUninitialized: true
	}));
  app.use(passport.initialize());
  app.use(passport.session());
  app.use(flash());
}


// module.exports.dbHostName = '127.0.0.1/meetupplanner';
// module.exports.port       = process.env.PORT || 3000;
