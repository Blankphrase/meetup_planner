/**
 * Check the form values to make sure user fills the
 * inputs before submit it, otherwise disable the submit button
 **/
function checkform() {
  var f = document.forms['signupForm'].elements;
  var cansubmit = true;

  for (var i = 0; i < f.length - 1; i++) {
    if (f[i].value.length == 0) {
      cansubmit = false;
    }
  }

  if (cansubmit) {
    document.getElementById('registerButton').removeAttribute('disabled');
  }
}
