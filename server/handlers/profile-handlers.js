var bcrypt = require('bcrypt');
var User = require('../models/user');
var validations = require('../helpers/validations');

var profile = exports;

// Render profile page
profile.getProfile = function(req, res){
  User.findOne({_id: req.user._id}, function(err, user){
    if (err) {
      req.flash('error', 'Something went wrong. Try again.');
      return res.redirect('/');
    }

    res.render('profile/profile', {user: user, messages: { error: req.flash('error'), info: req.flash('info')}});
  });
};

profile.getEditProfile = function(req, res){
  User.findOne({_id: req.user._id}, function(err, user){
    if (err) {
      req.flash('error', 'Something went wrong. Try again.');
      return res.redirect('/');
    }

    res.render('profile/profile_edit', {user: user, messages: { error: req.flash('error'), info: req.flash('info')}});
  });
};

profile.updateProfile = function(req, res){
  var name = req.body.profileName;
  var email = req.body.profileEmail;
  var age = req.body.profileAge;

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

  var updateObj = {
    name: name,
    email: email,
    age: age
  };

  if(req.user){
    User.findOneAndUpdate({_id: req.user._id}, updateObj, function(err, user){
      if (err) {
        req.flash('error', 'Something went wrong. Try again.');
        return res.redirect('/profile/profile_edit');
      }

      return res.redirect('/profile');
    });
  }

};

profile.updatePassword = function(req, res){
  // Check user's existance with current password
  var currentPass = req.body.currentPassword;
  var newPass = req.body.newPassword;
  var newPass2 = req.body.newPassword2;

  if(!currentPass){
    req.flash('error', 'Please enter your current password');
    return res.redirect('/profile/profile_edit');
  }

  if(newPass !== newPass2){
    req.flash('error', 'New password should match the confirm password');
    return res.redirect('/profile/profile_edit');
  }

  var updateObj = {
    password: newPass
  };

  if(req.user){
    // Find the user
    User.findOne({_id: req.user._id}, function(err, data){

      if(data){
        console.log('CHECKING PASS UPDATE');
        // Compare user input of current password with database's password
        bcrypt.compare(currentPass, data.password, function(err, result){
          if (err){
            req.flash('error', 'Check your current password and try again.');
            return res.redirect('/profile');
          } else if (result) {
            // If the passwords match, hash the new password
            bcrypt.genSalt(10, function(err, salt) {
              bcrypt.hash(newPass, salt, function(err, hashedPass) {

                // Save the new password
                var query = {_id: req.user._id};
                var newPassword = {password: hashedPass};
                User.findOneAndUpdate(query, newPassword, function(err, user){
                  if (err) {
                    req.flash('error', 'Could not update your password. Try again.');
                    return res.redirect('/profile');
                  } else {
                    req.flash('info', 'Successfully updated');
                    return res.redirect('/profile');
                  }
                });

              });
            });
          } else {
            req.flash('error', 'Check your current password and try again.');
            return res.redirect('/profile');
          }
        });
      } else {
        req.flash('error', 'User not found');
        return res.redirect('/profile');
      }

    });
  }
};