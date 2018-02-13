var express  = require('express'),
    bp       = require('body-parser'),
    path     = require('path'),
    root     = __dirname,
    port     = process.env.PORT || 8000,
    app      = express();

app.use(bp.json())

require("./config/routes.js")(app);

app.listen( port, function() {
  console.log( `server running on port ${ port }` );
});