'use strict';

// Validate Email
function checkEmail(e){
  var email = "";

  email = document.getElementById('loginEmail').value.trim();

  resetInnerHTML('errEmailLogin');
  document.getElementById('loginEmail').removeAttribute('class');
  var errorMsg = "";

  if (!email.match(/^\S+@\S+\.\S+$/)) {
    errorMsg += "* Email must be in valid format <br />";
  }

  if (errorMsg.length > 0) {
    if(e){
      e.preventDefault();
    }
    document.getElementById('errEmailLogin').innerHTML = errorMsg;
    setAttribute('loginEmail', 'class', 'errorBorder');
  }
}


// Check Password
function checkPassword(e) {
  var password = "";

  password = document.getElementById('loginPassword').value.trim();

  resetInnerHTML('errPassLogin');
  document.getElementById('loginPassword').removeAttribute('class');
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
    document.getElementById('errPassLogin').innerHTML = errorMsg;
    setAttribute('loginPassword', 'class', 'errorBorder');
  }
}


function validationFallbackOnLogin(e){
  // Check if browser supports validation.
  // i.e. Safari does not support 'required', so use
  // following fallback function on submit
  resetInnerHTML('errEmailLogin');
  resetInnerHTML('errPassLogin');
  if (!e.target.checkValidity()) {

    if(e.target[0].value.length === 0){
      e.preventDefault();
      document.getElementById('errEmailLogin').innerHTML = '* Email required';
    }

    if(e.target[1].value.length === 0){
      e.preventDefault();
      document.getElementById('errPassLogin').innerHTML = '* Password required';
    }
  }
}


document.getElementById('loginForm').addEventListener('submit', (e)=> {
  
  validationFallbackOnLogin(e);

  checkEmail(e);
  checkPassword(e);

}, false);
