var express = require('express');
var app = express();

require('./express-config').expressSetup(app);
require('./server/routes')(app);

app.listen(app.get('port'), function() {
  console.log('listening on http://localhost:' + app.get('port'));
});
