
// NPM Transform Stream
const Transform = require('stream').Transform;


// Parses lines

class CSVStreamParser extends Transform {

  constructor(delineators, columns) {

    super({
      objectMode : true
    });

    this.unendedLine = '';

    if(typeof delineators === 'string')
      this.delineators = [delineators];
    else
      this.delineators = delineators;

    this.columns = columns;

  }

  _transform(chunk, encoding, done) {

    // Split incoming chunk into lines
    var lines = chunk.toString(16).split('\n');

    // Push all the completed lines
    lines.unshift(this.unendedLine + lines.shift());
    while(lines.length > 1) this.pushLine(lines.shift());

    // Store the last line as incomplete
    this.unendedLine = lines.shift();

    done();

  }

  _flush(callback) {

    // Push the incompleted line if it is not empty
    if(this.unendedLine) this.pushLine(this.unendedLine);

    callback();

  }

  pushLine(line) {

    // Split a line
    var prepare = (line, delineator) => line.split(delineator)
                                        .map((item) => item.trim())
                                        .filter((item) => item);

    // Find the working delineators
    var res = this.delineators.map((delineator) => prepare(line, delineator))
                              .filter((items) => items.length === this.columns);

    // Push our result
    if(res.length){

      var res = res.shift();
      this.push(new Customer(res[0], res[1], res[2], res[3], res[4]));

    }else{

      var error = new Error('Badly formatted line.');
      error.line = line;
      this.push(error);

    }

  }

}

module.exports = CSVStreamParser;
