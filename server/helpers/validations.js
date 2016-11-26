var helpers = exports;

helpers.emailValidation = function(email){
  var re = /\S+@\S+\.\S+/;
  var eamil = email.trim();
  if(!re.test(email) || email.length === 0) {
    return false;
  } else {
    return true;
  }
};

// Event Creation Validation
helpers.eventValidation = function(eventObject){

}