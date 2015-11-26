// Check if user is authenticated via Passport's method
module.exports = function(req, res, next) {
  if (req.isAuthenticated()) {
    return next();

  } else {
    return res.redirect('/register');
  }
}

