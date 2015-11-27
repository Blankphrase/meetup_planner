var express = require('express');
var app = express();

require('./express-config').expressSetup(app);
require('./server/routes')(app);

var port = process.env.PORT || 3000;
app.listen(port, function() {
  console.log('Connected to ', port);
});
