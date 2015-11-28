var mongoose  = require('mongoose');
var config    = require('../express-config');
var userModel = require('./models/user');
var eventModel = require('./models/event');

function makeDefaultConnection() {
   // var conn = mongoose.createConnection(config.dbHostName, config.port);
   var conn = mongoose.createConnection(process.env.MONGO_URI || config.dbHostName);
   conn.model('User', userModel.userSchema);
	 conn.model('Event', eventModel.eventSchema);
   console.log('DB CONNECTED!');
   return conn;
}

module.exports.defaultConnection = makeDefaultConnection();
