

const Database = require('../Database.js');

const assert = require('assert');

describe('Database', function() {

  var database;

  before(function() {

    database = new Database();

  });

  beforeEach(function() {

    database.initialize();

  });

  it('Should add a record to the database.', function() {

    // the record to add
    var record = {
      somekey : 'somevalue'
    };

    // Add it
    database.add(record);

    // was a record added?
    assert.equal(1, database.getAll().length);

    // was it our record?
    assert.equal(record, database.getAll().shift());

  });

  it('Should return records in sorted order (ASC).', function() {

    // records to add
    var records = [
      {
        something : 4
      },
      {
        something : 10
      },
      {
        something : 7
      }
    ];

    // add all the records
    records.forEach((record) => database.add(record));

    // get the records sorted
    var sorted = database.getSortedBy('something');

    // did we get back 3 records?
    assert.equal(3, sorted.length);

    // are all the records in order?
    assert(sorted.reduce((a, b) => {
      if(a && a.something <= b.something) return b;
    }));

  });

  it('Should return records in sorted order (DESC).', function() {

    // records to add
    var records = [
      {
        something : 4
      },
      {
        something : 10
      },
      {
        something : 7
      }
    ];

    // add all the records
    records.forEach((record) => database.add(record));

    // get the records sorted
    var sorted = database.getSortedBy('something');

    // did we get back 3 records?
    assert.equal(3, sorted.length);

    // are all the records in order?
    assert(sorted.reduce((a, b) => {
      if(a && a.something <= b.something) return b;
    }));

  });

});
