// var ensureAuth = require('./passport/ensure-authenticated');
var auth       = require('./handlers/auth-handlers');
// var email      = require('./handlers/email');
var conn       = require('./db_connection').defaultConnection;
var User       = conn.model('User');
var Event      = conn.model('Event');
// var bcrypt     = require('bcrypt');
//
// // Check if user is already logged-in
// function checkIfLoggedIn(req, res, next){
//   if (!req.isAuthenticated()) {
//     return next();
//   } else {
//     return res.redirect('/');
//   }
// }

module.exports = function(app){
  // Event routes
  app.get('/', function(req, res){
		res.render('events/events')
	});

	app.get('/create_event', function(req, res){
		res.render('events/create_event')
	});

	app.post('/create_event', function(req, res){

	});

	app.get('/edit_event', function(req, res){
		res.render('events/edit_event')
	});

	app.post('/edit_event', function(req, res){

	});

  /** Authentication routes
   * Handled by Auth Handlers (handlers/auth-handlers)
   **/
  app.get('/register', auth.getRegisterPage);
  // app.post('/register', checkIfLoggedIn, auth.register);
  app.get('/login', auth.getLoginPage);
  // app.post('/login', checkIfLoggedIn, auth.login);
  // app.get('/forgot-password', checkIfLoggedIn, auth.getForgotPasswordPage);
  // app.post('/send-new-password', checkIfLoggedIn, email.sendNewPassword);
  // app.get('/logout', ensureAuth, auth.logout);

  /** Profile routes
   * Handled by Payment Handlers (handlers/profile-handlers)
   **/
  // app.get('/profile', ensureAuth, profile.getProfile);
  // app.post('/update-email', ensureAuth, profile.updateEmail);
  // app.post('/update-password', ensureAuth, profile.updatePassword);


};
