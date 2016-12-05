

const CSVStreamParser = require('../CSVStreamParser.js');

const assert = require('assert');

describe('CSVStreamParser', function() {

  describe('Should successfully parse the line with 5 items', function() {

    [' | ', ', ', ' '].forEach(function(delineator){

      it('delineated by \`' + delineator + '\`.', function(done) {

        // Create the stream
        var stream = new CSVStreamParser(['|', ',', ' '], 5);

        // Handle the result
        stream.on('data', function(data){

          // did we get back 5 items?
          assert.equal(5, data.length);

          done();

        });

        // Write a valid line with 5 items
        stream.write(['asdf', 'asdf', 'asdf', 'asdf', 'asdf'].join(delineator));

        // End the stream
        stream.end();

      });

    });

  });

  it('Should parse 5 lines successfully.', function() {

    var resultCount = 0;

    // Create the stream
    var stream = new CSVStreamParser(['|', ',', ' '], 5);

    // Handle the result
    stream.on('data', function(data){

      if(data.constructor !== Error) resultCount++;

    });

    // Handle the stream close
    stream.on('close', function(data){

      assert.equals(resultCount, 5);

      done();

    });

    // Write 5 valid lines
    stream.write(
      `asdf asdf asdf asdf asdf
      asdf | asdf | asdf | asdf | asdf
      asdf ,asdf, asdf ,asdf ,asdf
      asdf asdf asdf asdf asdf
      asdf asdf asdf asdf asdf`
    );

    // End the stream
    stream.end();

  });

  it('Should return an error because of a bad line', function(done) {

    // Create the stream
    var stream = new CSVStreamParser(['|', ',', ' '], 5);

    // Handle the result
    stream.on('data', function(data){

      // did we get an error?
      assert(data.constructor === Error);

      done();

    });

    // Write an invalid line
    stream.write('asdf | , asdf , asdf');

    // End the stream
    stream.end();

  });

});
