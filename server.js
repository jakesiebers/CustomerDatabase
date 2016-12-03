

// NPM Modules
const express = require('express');

// Express Initialization
var app = express();

// REST Endpoints

app.get('/', function (req, res) {

  res.send('Hello World!');

});

// Start listening
app.listen(3000, function () {

  console.log('Listening on port 3000!');

});
