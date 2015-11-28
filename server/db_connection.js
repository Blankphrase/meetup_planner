var mongoose  = require('mongoose');
var config    = require('../express-config');
var userModel = require('./models/user');
var eventModel = require('./models/event');

function makeDefaultConnection() {
  console.log('===== Connecting to DB ... =====');
  var conn = mongoose.createConnection(process.env.MONGOLAB_URI, function(err){ 
    //Local: 'config.dbHostName' instead of 'process.env.MONGOLAB_URI'
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