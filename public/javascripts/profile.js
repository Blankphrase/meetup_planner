'use strict';

// Check Name
function checkName(e){
  resetInnerHTML('errProfileName');
  document.getElementById('profileName').removeAttribute('class');
  var name = document.getElementById('profileName').value.trim();
  var errorMsg = "";

  if(name.length < 1) {
    errorMsg += '* Name required';
  }

  if(name.length > 50){
    errorMsg += '* Name should be shorter than 50';
  }

  if(errorMsg.length > 0){
    if(e){
      e.preventDefault();
    }
    document.getElementById('errProfileName').innerHTML = errorMsg;

    setAttribute('profileName', 'class', 'errorBorder');
  }
}

// Validate Email
function checkEmail(e){
  var email = "";

  email = document.getElementById('profileEmail').value.trim();

  resetInnerHTML('errProfileEmail');
  document.getElementById('profileEmail').removeAttribute('class');
  var errorMsg = "";

  if (!email.match(/^\S+@\S+\.\S+$/)) {
    errorMsg += "* Email must be in valid format <br />";
  }

  if (errorMsg.length > 0) {
    if(e){
      e.preventDefault();
    }
    document.getElementById('errProfileEmail').innerHTML = errorMsg;
    setAttribute('profileEmail', 'class', 'errorBorder');
  }
}

// Validate Age
function checkAge(e){
  var age = "";

  age = document.getElementById('profileAge').value.trim();

  resetInnerHTML('errProfileAge');
  document.getElementById('profileAge').removeAttribute('class');
  var errorMsg = "";

  if ((isNaN(age)) || (age.length == 0)){
    errorMsg += '* Age input must be number <br />';
  }

  if((age < 0)||(age > 200)){
    errorMsg += '* Age must be between 0 - 200 <br />';
  }

  if (errorMsg.length > 0) {
    if(e){
      e.preventDefault();
    }
    document.getElementById('errProfileAge').innerHTML = errorMsg;
    setAttribute('profileAge', 'class', 'errorBorder');
  }

}


function validationFallbackOnprofile(e){
  // Check if browser supports validation.
  // i.e. Safari does not support 'required', so use
  // following fallback function on submit
  resetInnerHTML('errProfileName');
  resetInnerHTML('errProfileEmail');
  resetInnerHTML('errProfileAge');
  if (!e.target.checkValidity()) {
    if(e.target[0].value.length === 0){
      e.preventDefault();
      document.getElementById('errProfileName').innerHTML = '* Name required';
    }

    if(e.target[1].value.length === 0){
      e.preventDefault();
      document.getElementById('errProfileEmail').innerHTML = '* Email required';
    }

    if(e.target[2].value.length === 0){
      e.preventDefault();
      document.getElementById('errProfileAge').innerHTML = '* Age required';
    }
  }
}

document.getElementById('editProfileForm').addEventListener('submit', (e)=> {
  
  validationFallbackOnprofile(e);

  checkName(e);
  checkEmail(e);
  checkAge(e);

}, false);


// =============== Update Password Form ===============

// Check Current Password
function checkCurrentPassword(e){
  var password = "";

  password = document.getElementById('currentPassword').value.trim();
  resetInnerHTML('errPass');
  document.getElementById('currentPassword').removeAttribute('class');
  var errorMsg = "";

  if (password.length <= 0) {
    errorMsg += "* Please enter your current password <br />";
  }

  if (errorMsg.length > 0) {
    if(e){
      e.preventDefault();
    }
    document.getElementById('errPass').innerHTML = errorMsg;
    setAttribute('currentPassword', 'class', 'errorBorder');
  }
}

// Check New Password
function checkNewPassword(e){
  var password = "";

  password = document.getElementById('newPassword').value.trim();

  resetInnerHTML('errNewPass');
  document.getElementById('newPassword').removeAttribute('class');
  var errorMsg = "";

  if (password.length > 30) {
    errorMsg += "* Must be fewer than 31 chars <br />";
  }

  if (password.length < 8) {
    errorMsg += "* Must be longer than 7 chars <br />";
  }

  if (!password.match(/[\!\@\#\$\%\^\&\*]/g)) {
    errorMsg += "* Missing a symbol(! @ # $ % ^ & *)<br />";
  }

  if (!password.match(/\d/g)) {
    errorMsg += "* Missing a number <br />";
  }

  if (!password.match(/[a-z]/g)) {
    errorMsg += "* Missing a lowercase letter <br />";
  }

  if (!password.match(/[A-Z]/g)) {
    errorMsg += "* Missing an uppercase letter";
  }

  if (errorMsg.length > 0) {
    if(e){
      e.preventDefault();
    }
    document.getElementById('errNewPass').innerHTML = errorMsg;
    setAttribute('newPassword', 'class', 'errorBorder');
  }
}

// Check New Password
function checkNewPassword2(e){
  var password = "";
  var confirmPassword = "";

  password = document.getElementById('newPassword').value.trim();
  confirmPassword = document.getElementById('newPassword2').value.trim();

  resetInnerHTML('errNewPass2');
  document.getElementById('newPassword2').removeAttribute('class');
  var errorMsg = "";

  if (password !== confirmPassword) {
    errorMsg += "* New Password should match Confirm Password <br />";
  }

  if (errorMsg.length > 0) {
    if(e){
      e.preventDefault();
    }
    document.getElementById('errNewPass2').innerHTML = errorMsg;
    setAttribute('newPassword2', 'class', 'errorBorder');
  }
}


function validationFallbackOnPassword(e){
  // Check if browser supports validation.
  // i.e. Safari does not support 'required', so use
  // following fallback function on submit
  resetInnerHTML('errPass');
  resetInnerHTML('errNewPass');
  resetInnerHTML('errNewPass2');
  if (!e.target.checkValidity()) {
    if(e.target[0].value.length === 0){
      e.preventDefault();
      document.getElementById('errPass').innerHTML = '* Current Password required';
    }

    if(e.target[1].value.length === 0){
      e.preventDefault();
      document.getElementById('errNewPass').innerHTML = '* New Password required';
    }

    if(e.target[2].value.length === 0){
      e.preventDefault();
      document.getElementById('errNewPass2').innerHTML = '* Confirm Password required';
    }
  }
}

document.getElementById('editPasswordForm').addEventListener('submit', (e)=> {
  
  validationFallbackOnPassword(e);

  checkCurrentPassword(e);
  checkNewPassword(e);
  checkAge(e);

}, false);
