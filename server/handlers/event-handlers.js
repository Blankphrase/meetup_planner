var moment = require('moment');

var Event = require('../models/event');
var validations = require('../helpers/validations');

var events = exports;

events.getEvents = function(req, res){
  var skipNum = req.query.skip || 0;
  skipNum *= 2;

  var user = req.user || null;

  // First time fetching events
  if(skipNum == 0){
    Event.find({}).limit(2).exec(function(err, events){
      if (err) {
        req.flash('error', 'Something went wrong. Refresh.');
        return res.redirect('/create_event');
      }

      var _events = [];
      events.forEach(function(event){
        var startDate = moment(event.startDate).format('MMMM DD YYYY, h:mm A');
        var endDate = moment(event.endDate).format('MMMM DD YYYY, h:mm A');
        
        var _event = {
          _id: event._id,
          name: event.name,
          type: event.type,
          host: event.host,
          createdBy: event.createdBy,
          startDate: startDate,
          endDate: endDate,
          location: event.location,
          message: event.message 
        };

        _events.push(_event);
      });

      return res.render('events/events', {
        user: user,
        events: _events,
        messages: {
          error: req.flash('error'),
          info: req.flash('info')
        }
      });
    });

  // When "Load More"
  } else {
    Event.find({}).skip(skipNum).limit(2).exec(function(err, events){
      if (err) {
        req.flash('error', 'Something went wrong. Refresh.');
        return res.redirect('/create_event');
      }

      var _events = [];
      events.forEach(function(event){
        var startDate = moment(event.startDate).format('MMMM DD YYYY, h:mm A');
        var endDate = moment(event.endDate).format('MMMM DD YYYY, h:mm A');
        
        var _event = {
          _id: event._id,
          name: event.name,
          type: event.type,
          host: event.host,
          createdBy: event.createdBy,
          startDate: startDate,
          endDate: endDate,
          location: event.location,
          message: event.message 
        };

        _events.push(_event);
      });

      return res.render('events/eventItem', {
        events: _events,
        messages: {
          error: req.flash('error'),
          info: req.flash('info')
        }
      });
    });
  }
};

events.getCreateEventForm = function(req, res){
  res.render('events/create_event', {user: req.user, messages: { error: req.flash('error'), info: req.flash('info')}})
};

events.createEvent = function(req, res){
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

events.getOneEvent = function(req, res){
  var isAuthor = false;

  var eventId = req.params.eventid;

  Event.findOne({_id: eventId}, function(err, event){
    if (err) {
      req.flash('error', 'Something went wrong. Try again.');
      return res.redirect('/');
    }

    if(event.createdBy.equals(req.user._id)){
      isAuthor = true;
    }

    var startDate = moment(event.startDate).format('MMMM DD YYYY, h:mm A');
    var endDate = moment(event.endDate).format('MMMM DD YYYY, h:mm A');

    var _event = {
      _id: event._id,
      name: event.name,
      type: event.type,
      host: event.host,
      createdBy: event.createdBy,
      startDate: startDate,
      endDate: endDate,
      location: event.location,
      message: event.message 
    };

    return res.render('events/event_page', {
      user: req.user,
      event: _event,
      isAuthor: isAuthor,
      messages: { 
        error: req.flash('error'),
        info: req.flash('info')
      }
    });
  });
};

events.getEditEvent = function(req, res){
  var eventId = req.params.eventid;

  Event.findOne({_id: eventId}, function(err, event){
    if (err) {
      req.flash('error', 'Something went wrong. Try again.');
      return res.redirect('/');
    }

    if(!event.createdBy.equals(req.user._id)){
      req.flash('error', 'You are not author!');
      return res.redirect('/');
    }

    var formattedStartDate = moment.utc(event.startDate).local().format();
    var formattedEndDate = moment.utc(event.endDate).local().format();
    
    var _event = {
      _id: event._id,
      name: event.name,
      type: event.type,
      host: event.host,
      createdBy: event.createdBy,
      startDate: formattedStartDate,
      endDate: formattedEndDate,
      location: event.location,
      message: event.message 
    };

    return res.render('events/edit_event', {user: req.user, event: _event, messages: { error: req.flash('error'), info: req.flash('info')}});
  });
};

events.postEditEvent = function(req, res){
  var eventId = req.params.eventid;

  var name       = req.body.eventName;
  var type       = req.body.eventType;
  var host       = req.body.eventHost;
  var startDate  = req.body.startDate;
  var endDate    = req.body.endDate;
  var location   = req.body.location;
  var message    = req.body.message || null;

  var query = { _id: eventId };
  var update = {
    name: name,
    type: type,
    host: host,
    startDate: startDate,
    endDate: endDate,
    location: location,
    message: message
  };

  Event.findOne(query, function(err, event){
    if (err) {
      req.flash('error', 'Something went wrong. Try again.');
      return res.redirect('/events/eventId');
    }

    if(!event.createdBy.equals(req.user._id)){
      req.flash('error', 'You are not author!');
      return res.redirect('/events/eventId');
    }

    Event.findOneAndUpdate(query, update, function(err, event){
      if (err) {
        req.flash('error', 'Something went wrong. Try again.');
        return res.redirect('/events/eventId');
      }
      req.flash('info', 'Successfully created!');
      return res.redirect('/events/eventId');
    });
  });
};

events.deleteEvent = function(req, res){
  var eventId = req.params.eventid;
  var query = {_id: eventId};

  Event.findOne(query, function(err, event){
    if (err) {
      req.flash('error', 'Something went wrong. Try again.');
      return res.redirect('/');
    }

    if(!event.createdBy.equals(req.user._id)){
      req.flash('error', 'You are not author!');
      return res.redirect('/');
    }

    Event.findOneAndRemove(query, function(err, event){
      if (err) {
        req.flash('error', 'Something went wrong. Try again.');
        return res.redirect('/events/eventId');
      }
      req.flash('info', 'Successfully deleted!');
      return res.redirect('/');
    });
  });
}