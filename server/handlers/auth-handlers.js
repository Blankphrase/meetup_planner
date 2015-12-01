var passport      = require('passport');
var bcrypt        = require('bcrypt');
var LocalStrategy = require('passport-local').Strategy;

require('../passport/passport')(passport);
// var conn   = require('../db_connection').defaultConnection;
// var User   = conn.model('User');
var User = require('../models/user');
var validations = require('../helpers/validations');

var auth = exports;


// Render register page
auth.getRegisterPage = function(req, res){
  res.render('authentications/register', {messages:
    {error: req.flash('error')}
  });
};

/**
 * Handle user registration process.
 * 1. Check if user is already registered by checking email
 * 2. Encrypt password
 * 3. Save user information in MongoDB
 * 4. Create a customer on Stripe with Free Plan
 **/
auth.register = function(req, res){
  var name      = req.body.registerName;
  var email     = req.body.registerEmail;
  var age       = req.body.registerAge;
  var password  = req.body.registerPassword;

  if(name.trim().length === 0){
    req.flash('error','Name cannot be empty');
    return res.redirect('register');
  }

  if(!validations.emailValidation(email)){
    req.flash('error','Email cannot be empty & should be valid format');
    return res.redirect('register');
  }

  if((age > 200) || (age < 0)){
    req.flash('error','Age should be between 0 - 200 yrs old');
    return res.redirect('register');
  }

  if(password.trim().length < 6){
    req.flash('error','Password should be at least 6 characters');
    return res.redirect('register');
  }

  var hashedPassword = null;

  User.findOne(
    {'email': email}
    , function(err, user){

      if(user && user.email === email){
        req.flash('error','This email is already registered');
        return res.redirect('register');
      }else {
        // Encrypt user password
        bcrypt.genSalt(10, function(err, salt) {
          bcrypt.hash(password, salt, function(err, hash) {

            hashedPassword = hash;

            // User object to be saved in MongoDB
            var newUser = new User({
              name: name,
              email: email,
              age: age,
              password: hashedPassword
            });

            newUser.save(function(err, user){
              req.login(user, function(err) {
                if (err) {
                  req.flash('error', 'Something went wrong. Try again.');
                  return res.redirect('/register');
                }
                req.flash('info', 'Welcome to Meetup Event Planner!');
                return res.redirect('/');
              });
            });

          });
        });
      }
    }
  )
};

// Render login page
auth.getLoginPage = function(req, res){

  res.render('authentications/login',
    {messages:
      {
        error: req.flash('error'),
        info: req.flash('info')
      }
    }
  );
}

/**
 * Handle user login process via Passport
 **/
auth.login = function(req, res){

  var email     = req.body.loginEmail;
  var password  = req.body.loginPassword;

  if(!validations.emailValidation(email)){
    req.flash('error','Please enter the correct email');
    return res.redirect('login');
  }

  if(password.trim().length < 8){
    req.flash('error','Please enter the correct password');
    return res.redirect('login');
  }

  passport.authenticate('local', function(err, user, info) {

    if (err) {
      req.flash('error', 'Cannot login. Try again.');
      return res.redirect('/login');
    }

    if (!user) {
      req.flash('error', 'User Not Found / Password is incorrect');
      return res.redirect('/login');
    }

    req.logIn(user, function(err) {
      if (err) {
        req.flash('error', 'Cannot login. Try again.');
        return res.redirect('/login');
      } else {
        req.flash('info', 'Logged in');
        // console.log('req session: ', req.session);
        return res.redirect('/');
      }
    });

  })(req, res);
};

// Render Forgot Password page
// auth.getForgotPasswordPage = function(req, res){
//   res.render('authentications/forgotpassword', {messages:
//     {error: req.flash('error')}
//   });
// };

// Logout
auth.logout = function(req, res){
  req.logout();
  req.flash('info', 'You are logged out');
  return res.redirect('/login');
};
