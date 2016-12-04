

// NPM Modules
const express = require('express');

// Internal Modules
const CSVStreamParser = require('./CSVStreamParser');

// Express Initialization
var app = express();

// REST Endpoints

app.post('/records', function (req, res) {

  var errors = [];
  var successes = 0;

  req.setEncoding('utf8');

  var items = req.pipe(new CSVStreamParser([ '|', ',', ' ' ], 5));

  items.on('data', (data) => {

    if(data.constructor === Error)
      errors.push(data);
    else
      successes++;

  });

  items.on('end', () => {

    var response = {};

    if(errors.length)
      response.errors = errors;
    else
      response.success = true;
    if(successes) response.successes = successes;

    res.setHeader("Content-Type", "text/json");

    res.send(JSON.stringify(
      response,
      function(key, value){
        if(value.constructor === Error){
          value.error = value.message;
        }
        return value;
      }
    ));

  });

});

// Start listening
app.listen(3000, function () {

  console.log('Listening on port 3000!');

});
