var express = require('express');
var app = express();
var mongoose  = require('mongoose');

require('./express-config').expressSetup(app);

var uri = process.env.MONGOLAB_URI || '127.0.0.1/meetupplanner';
console.log('Connecting to DB : ', uri);

mongoose.connect(uri, {}, function(err, db){
  if(err){
    console.log('Connection Error ::: ', err);
  } else {
    console.log('Successfully Connected!');
  }
});

require('./server/routes')(app);

var port = process.env.PORT || 3000;
app.listen(port, function() {
  console.log('Server started at port number: ', port);
});
