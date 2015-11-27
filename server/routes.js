var ensureAuth = require('./passport/ensure-authenticated');
var authHandler  = require('./handlers/auth-handlers');
var eventHandler = require('./handlers/event-handlers');
// var email      = require('./handlers/email');
var conn       = require('./db_connection').defaultConnection;
var User       = conn.model('User');
var Event      = conn.model('Event');
var bcrypt     = require('bcrypt');
//
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

  /** Authentication routes
   * Handled by Auth Handlers (handlers/auth-handlers)
   **/
  app.get('/register', checkIfLoggedIn, authHandler.getRegisterPage);
  app.post('/register', checkIfLoggedIn, authHandler.register);
  app.get('/login', checkIfLoggedIn, authHandler.getLoginPage);
  app.post('/login', checkIfLoggedIn, authHandler.login);
  app.get('/logout', ensureAuth, authHandler.logout);

  // app.get('/forgot-password', checkIfLoggedIn, authHandler.getForgotPasswordPage);
  // app.post('/send-new-password', checkIfLoggedIn, email.sendNewPassword);

	app.get('/create_event', ensureAuth, eventHandler.getCreateEventForm);
	app.post('/create_event', ensureAuth, eventHandler.createEvent);
  app.get('/events/:eventid', ensureAuth, eventHandler.getOneEvent);
	app.get('/events/:eventid/edit_event', ensureAuth, eventHandler.getEditEvent);
	app.post('/events/:eventid/edit_event', ensureAuth, eventHandler.postEditEvent);


  // app.get('/profile', ensureAuth, profile.getProfile);
  // app.post('/update-email', ensureAuth, profile.updateEmail);
  // app.post('/update-password', ensureAuth, profile.updatePassword);


};
