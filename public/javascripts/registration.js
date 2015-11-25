'use strict';

// Check Name
function checkName(e){
  resetInnerHTML('errName');
  document.getElementById('registerName').removeAttribute('class');
  var name = document.getElementById('registerName').value.trim();
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
    document.getElementById('errName').innerHTML = errorMsg;

    setAttribute('registerName', 'class', 'errorBorder');
  }
}

// Validate Email
function checkEmail(e){
  var email = "";

  email = document.getElementById('registerEmail').value.trim();

  resetInnerHTML('errEmail');
  document.getElementById('registerEmail').removeAttribute('class');
  var errorMsg = "";

  if (!email.match(/^\S+@\S+\.\S+$/)) {
    errorMsg += "* Email must be in valid format <br />";
  }

  if (errorMsg.length > 0) {
    if(e){
      e.preventDefault();
    }
    document.getElementById('errEmail').innerHTML = errorMsg;
    setAttribute('registerEmail', 'class', 'errorBorder');
  }
}

// Validate Age
function checkAge(e){
  var age = "";

  age = document.getElementById('registerAge').value.trim();

  resetInnerHTML('errAge');
  document.getElementById('registerAge').removeAttribute('class');
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
    document.getElementById('errAge').innerHTML = errorMsg;
    setAttribute('registerAge', 'class', 'errorBorder');
  }

}

// Check Password
function checkPassword(e) {
  var password = "";

  password = document.getElementById('registerPassword').value.trim();

  resetInnerHTML('errPass');
  document.getElementById('registerPassword').removeAttribute('class');
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
    document.getElementById('errPass').innerHTML = errorMsg;
    setAttribute('registerPassword', 'class', 'errorBorder');
  }
}

function validationFallbackOnRegister(e){
  // Check if browser supports validation.
  // i.e. Safari does not support 'required', so use
  // following fallback function on submit
  resetInnerHTML('errName');
  resetInnerHTML('errEmail');
  resetInnerHTML('errAge');
  resetInnerHTML('errPass');
  if (!e.target.checkValidity()) {
    if(e.target[0].value.length === 0){
      e.preventDefault();
      document.getElementById('errName').innerHTML = '* Name required';
    }

    if(e.target[1].value.length === 0){
      e.preventDefault();
      document.getElementById('errEmail').innerHTML = '* Email required';
    }

    if(e.target[2].value.length === 0){
      e.preventDefault();
      document.getElementById('errAge').innerHTML = '* Age required';
    }

    if(e.target[3].value.length === 0){
      e.preventDefault();
      document.getElementById('errPass').innerHTML = '* Password required';
    }
  }
}


document.getElementById('registerForm').addEventListener('submit', (e)=> {
  
  validationFallbackOnRegister(e);

  checkName(e);
  checkEmail(e);
  checkAge(e);
  checkPassword(e);

}, false);
