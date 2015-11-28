var mongoose  = require('mongoose');
var config    = require('../express-config');
var userModel = require('./models/user');
var eventModel = require('./models/event');

function makeDefaultConnection() {
  // var conn = mongoose.createConnection(config.dbHostName, config.port);
  var conn = mongoose.connect(process.env.MONGOLAB_URI || config.dbHostName, function(err){
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
