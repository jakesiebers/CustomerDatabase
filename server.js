

// NPM Modules
const express = require('express');

// Internal Modules
const CSVStreamParser = require('./CSVStreamParser');
const Customer = require('./Customer');
const Database = require('./Database');


// Set up customer database
var customers = new Database();


// Express Initialization
var app = express();

// REST Endpoints

app.post('/records', function (req, res) {

  var errors = [];
  var items = [];

  req.setEncoding('utf8');

  var items = req.pipe(new CSVStreamParser([ '|', ',', ' ' ], 5));

  items.on('data', (data) => {

    if(data.constructor === Error)

      errors.push(data);

    else{

      customers.add(data);
      items.push(data);

    }

  });

  items.on('end', () => {

    var response = {};

    if(errors.length)
      response.errors = errors;
    else
      response.success = true;
    
    if(items.length) response.items = items;

    res.setHeader("Content-Type", "text/json");

    res.send(JSON.stringify(
      response,
      function(key, value){
        if(value.constructor === Error) value.error = value.message;
        return value;
      }
    ));

  });

});

// Start listening
app.listen(3000, function () {

  console.log('Listening on port 3000!');

});
