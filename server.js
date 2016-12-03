

// NPM Modules
const express = require('express');

// Internal Modules
const Parser = require('./parser');

// Express Initialization
var app = express();

// REST Endpoints

app.post('/records', function (req, res) {

  var failures = 0;
  var successes = 0;

  req.setEncoding('utf8');

  var items = req.pipe(new Parser());

  items.on('data', (data) => {

    if(typeof data === 'string'){

      failures++;

    }else{

      successes++;

    }

  });

  items.on('end', () => {

    var response = {};

    if(failures){
      response.failures = failures;
    } else {
      response.success = true;
    }
    if(successes) response.successes = successes;

    res.setHeader("Content-Type", "text/json");
    res.send(JSON.stringify(response));

  });

});

// Start listening
app.listen(3000, function () {

  console.log('Listening on port 3000!');

});
