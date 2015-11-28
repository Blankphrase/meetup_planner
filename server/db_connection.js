var mongoose  = require('mongoose');
var userModel = require('./models/user');
var eventModel = require('./models/event');

function makeDefaultConnection() {
  var uri = process.env.MONGOLAB_URI || '127.0.0.1/meetupplanner';
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