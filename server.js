

// NPM Modules
const express = require('express');

// Internal Modules
const CSVStreamParser = require('./CSVStreamParser');
const Customer = require('./Customer');
const Database = require('./Database');


// Set up customer database
var customers = new Database();


// Handle a csv stream and return a response
var handleCSVStream = (stream) => {

  // Initialize your collections of errors/successes
  var errors = [];
  var items = [];

  // Set our stream encoding
  stream.setEncoding('utf8');

  // Pipe te stream through the CSV Parser
  stream = stream.pipe(new CSVStreamParser([ '|', ',', ' ' ], 5));

  // For each line that comes back, convert it to a customer object and log it as an error/success
  stream.on('data', (data) => {

    if(data.constructor !== Error) data = new Customer(data[1] + ' ' + data[0], data[2], data[3], data[4]);

    if(data.constructor === Error){

      errors.push(data);

    }else{

      customers.add(data);
      items.push(data);

    }

  });

  // When the stream is complete resolve the promise with the response
  var p = Promise.defer();

  stream.on('end', () => {

    var response = {};

    if(errors.length)
      response.errors = errors;
    else
      response.success = true;

    if(items.length) response.items = items;

    p.resolve(response);

  });

  return p.promise;

};


// Express Initialization
var app = express();

// Input REST Endpoint
app.post('/records', function (req, res) {

  // Handle the incomming POST data stream and return the response on success
  handleCSVStream(req).then((response) => {

    if(response.success)
      res.statusCode = 200;
    else
      res.statusCode = 400;

    res.setHeader("Content-Type", "text/json");

    res.end(JSON.stringify(
      response,
      (key, value) => {
        if(value && value.constructor === Error) value.error = value.message;
        return value;
      }
    ));

  });

});

// Search REST Endpoint
app.get('/records/:field/:desc?', function (req, res) {

  res.statusCode = 200;
  res.setHeader("Content-Type", "text/json");
  res.end(JSON.stringify({
    items : customers.getSortedBy(req.params.field, req.params.desc),
    success : true
  }));

});

// Start listening
app.listen(3000, function () {

  console.log('Listening on port 3000!');

});
