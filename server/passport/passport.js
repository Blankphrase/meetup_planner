
var bcrypt = require('bcrypt');
var LocalStrategy = require('passport-local').Strategy;
// var conn = require('../db_connection').defaultConnection;
// var User = conn.model('User');
var User = require('../models/user');

module.exports = function(passport) {

  passport.serializeUser(function(user, done) {
    done(null, user._id);
  });

  passport.deserializeUser(function(id, done) {
    User.findOne({'_id': id}, function(err, user){
      if(err) {
        return done(err);
      }
      done(err, user);
    });
  });

  passport.use('local', new LocalStrategy({
      // Login with email instead of username(default)
      usernameField: 'loginEmail',
      passwordField: 'loginPassword'
    },
    function(email, password, done) {

      User.findOne({
        'email': email
      }, function(err, user){

        if(err){
          return done(err);
        }
        if(!user){
          return done(null, false);
        }

        bcrypt.compare(password, user.password, function(err, res) {
          if(res) {
            return done(null, user);

          } else {

            if(err){
              return done(err);
            } else {
              return done(new Error('Passwords did not match'));
            }
          }
        });

      });
    }
  ));
};
