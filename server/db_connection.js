var mongoose  = require('mongoose');

function makeDefaultConnection() {
  // Production
  var uri = process.env.MONGOLAB_URI;

  // Development
  // var uri = '127.0.0.1/meetupplanner';

  mongoose.connect(uri, {}, function(err, db){
    if(err) {
      console.log('Connection Error ::: ', err);
    } else {
      console.log('Successfully Connected!');
    }
  });
}

module.exports.defaultConnection = makeDefaultConnection();
