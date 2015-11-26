var conn   = require('../db_connection').defaultConnection;
var Event  = conn.model('Event');
var validations = require('../helpers/validations');

var events = exports;

events.getEvents = function(req, res){
  var user = req.user || null;
  Event.find({}, function(err, events){
    if (err) {
      req.flash('error', 'Something went wrong. Refresh.');
      return res.redirect('/create_event');
    }
    return res.render('events/events', {user: user, events: events});
  });
};

events.createEvent = function(req, res){
  console.log(req.body);
  var name       = req.body.eventName;
  var type       = req.body.eventType;
  var host       = req.body.eventHost;
  var startDate  = req.body.startDate;
  var endDate    = req.body.endDate;
  var location   = req.body.location;
  var message    = req.body.message || null;

  var newEventObj = {
    name: name,
    type: type,
    host: host,
    createdBy: req.user,
    startDate: startDate,
    endDate: endDate,
    location: location,
    message: message
  };

  // if(!validations.eventValidation(newEventObj)){
  //   return res.redirect('/create_event');
  // }

  var newEvent = new Event({
    name: name,
    type: type,
    host: host,
    createdBy: req.user,
    startDate: startDate,
    endDate: endDate,
    location: location,
    message: message
  });

  newEvent.save(function(err, event){
    if (err) {
      req.flash('error', 'Something went wrong. Try again.');
      return res.redirect('/create_event');
    }
    req.flash('info', 'Successfully created!');
    return res.redirect('/');
  });

};