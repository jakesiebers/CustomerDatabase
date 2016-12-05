
const Customer = require('../Customer.js');

const assert = require('assert');

describe('Customer', function() {

  it('Should create a customer successfully.', function() {

    // Create a customer
    var c = new Customer('first last', 'gender', 'color', '1/1/1990');

    // Are all the fields correct?
    assert.equal('first last', c.name);
    assert.equal('gender', c.gender);
    assert.equal('color', c.favoritecolor);
    assert.equal((new Date('1/1/1990')).getTime(), c.birthdate.getTime());

  });

  describe('Required Fields', function(){

    var args = [];

    for(var a=0; a<4; a++){

      it('Should return an error when only the first ' + a + ' arguments were provided.', function() {

        // Create a customer
        var e = new Customer(args[0], args[1], args[2], args[3]);

        // Did we get the error?
        assert(e.constructor === Error);

      });

      args.push('something');

    }

  });

  it('Should return an error when an invalid date is provided.', function() {

    // Create a customer
    var e = new Customer('first last', 'gender', 'color', '3/40/1990');

    // Did we get the error?
    assert(e.constructor === Error);

  });

});
