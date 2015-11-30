var mongoose  = require('mongoose');
// var userModel = require('./models/user');
// var eventModel = require('./models/event');

function makeDefaultConnection() {
  var uri = process.env.MONGOLAB_URI;
  // var uri = '127.0.0.1/meetupplanner';

  // var conn = mongoose.createConnection(uri);

  // conn.on('error', function(err){
  //   console.log('Connection Error ::: ', err);
  // });

  // conn.model('User', userModel.userSchema);
  // conn.model('Event', eventModel.eventSchema);
  // return conn;

  mongoose.connect(uri, {}, function(err, db){
    if(err){
      console.log('Connection Error ::: ', err);
    } else {
      console.log('Successfully Connected!');
    }
  });
}

module.exports.defaultConnection = makeDefaultConnection();
