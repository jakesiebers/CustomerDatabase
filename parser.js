
// NPM Transform Stream
const Transform = require('stream').Transform;


// Parses lines

class Parser extends Transform {

  constructor(options) {

    super({

      objectMode : true

    });

    this.unendedLine = '';

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

    // Find the correct delineator and push the results
    var items;
    if(
      (items = prepare(line, '|')).length === 5 ||
      (items = prepare(line, ',')).length === 5 ||
      (items = prepare(line, ' ')).length === 5
    ){

      this.push(items);

    }else{

      this.push(line);

    }

  }

}

module.exports = Parser;
