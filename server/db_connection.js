var mongoose  = require('mongoose');
var config    = require('../express-config');
var userModel = require('./models/user');
var eventModel = require('./models/event');
// var testURI = require('../config').testURI;

function makeDefaultConnection() {
  var uri = process.env.MONGOLAB_URI || config.dbHostName;
  console.log('Connecting to DB : ', uri);
  var conn = mongoose.createConnection(uri, function(err){
    if(err){
      console.log('CONNECTION ERROR::::', err);
    }
    console.log('CONNECTED to DB!');
  });
  conn.model('User', userModel.userSchema);
  conn.model('Event', eventModel.eventSchema);
  return conn;
}

module.exports.defaultConnection = makeDefaultConnection();