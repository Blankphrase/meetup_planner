var ensureAuth = require('./passport/ensure-authenticated');
var authHandler  = require('./handlers/auth-handlers');
var eventHandler = require('./handlers/event-handlers');
var profileHandler = require('./handlers/profile-handlers');

// // Check if user is already logged-in
function checkIfLoggedIn(req, res, next){
  if (!req.isAuthenticated()) {
    return next();
  } else {
    return res.redirect('/');
  }
}

module.exports = function(app){
  app.get('/', eventHandler.getEvents);

  // Authentication related
  app.get('/register', checkIfLoggedIn, authHandler.getRegisterPage);
  app.post('/register', checkIfLoggedIn, authHandler.register);
  app.get('/login', checkIfLoggedIn, authHandler.getLoginPage);
  app.post('/login', checkIfLoggedIn, authHandler.login);
  app.get('/logout', ensureAuth, authHandler.logout);

  // Events related
	app.get('/create_event', ensureAuth, eventHandler.getCreateEventForm);
	app.post('/create_event', ensureAuth, eventHandler.createEvent);
  app.get('/events/:eventid', ensureAuth, eventHandler.getOneEvent);
	app.get('/events/:eventid/edit_event', ensureAuth, eventHandler.getEditEvent);
	app.post('/events/:eventid/edit_event', ensureAuth, eventHandler.postEditEvent);
  app.get('/events/:eventid/delete', ensureAuth, eventHandler.deleteEvent);

  // User related
  app.get('/profile', ensureAuth, profileHandler.getProfile);
  app.get('/profile/edit_profile', ensureAuth, profileHandler.getEditProfile);
  app.post('/profile/edit_profile', ensureAuth, profileHandler.updateProfile);
  app.post('/profile/update_password', ensureAuth, profileHandler.updatePassword);
};
