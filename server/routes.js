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
  // Dummy Events
  // var events = [
  //   {
  //     name: 'Get fucked up!',
  //     category: 'Social',
  //     host: 'Alice Smith',
  //     startDate: 'Dec 10, 2015 - 20:00',
  //     endDate: 'Dec 11, 2015 - 05:00',
  //     location: '456 DEF Street Phoenix, AZ',
  //     message: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
  //   },
  //   {
  //     name: 'Get fucked up pt.2!',
  //     category: 'Social',
  //     host: 'Alice Smith',
  //     startDate: 'Dec 12, 2015 - 20:00',
  //     endDate: 'Dec 13, 2015 - 05:00',
  //     location: '456 DEF Street Phoenix, AZ',
  //     message: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
  //   }
  // ];

 //  app.get('/', function(req, res){
	// 	res.render('events/events', {user: req.user, events: events});
	// });
  app.get('/', eventHandler.getEvents);

	app.get('/create_event', ensureAuth, function(req, res){
		res.render('events/create_event', {user: req.user})
	});

	app.post('/create_event', ensureAuth, eventHandler.createEvent);

	// app.get('/edit_event', function(req, res){
	// 	res.render('events/edit_event')
	// });

	// app.post('/edit_event', function(req, res){

	// });

  /** Authentication routes
   * Handled by Auth Handlers (handlers/auth-handlers)
   **/
  app.get('/register', checkIfLoggedIn, authHandler.getRegisterPage);
  app.post('/register', checkIfLoggedIn, authHandler.register);
  app.get('/login', checkIfLoggedIn, authHandler.getLoginPage);
  app.post('/login', checkIfLoggedIn, authHandler.login);
  // app.get('/forgot-password', checkIfLoggedIn, authHandler.getForgotPasswordPage);
  // app.post('/send-new-password', checkIfLoggedIn, email.sendNewPassword);
  app.get('/logout', ensureAuth, authHandler.logout);

  // app.get('/profile', ensureAuth, profile.getProfile);
  // app.post('/update-email', ensureAuth, profile.updateEmail);
  // app.post('/update-password', ensureAuth, profile.updatePassword);


};
