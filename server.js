var express = require('express');
var app = express();

require('./express-config').expressSetup(app);
require('./server/routes')(app);

app.listen(process.env.PORT || 3000, function() {
  console.log('Connected!');
});
