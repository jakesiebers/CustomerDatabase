
// Everything is held locally right now.
// In the future this should be a wrapper that talks to an external database

function Database(){

  this.initialize();

}

Database.prototype = {

  add(item){

    this.objects.push(item);

  },

  getSortedBy(field, desc){

    return this.objects.sort((a, b) => {

      if(a[field] === b[field]) return 0;

      var res;

      if(a[field] > b[field])
        res = 1;
      else
        res = -1;

      if(desc) res *= -1;

      return res;

    });

  },

  initialize(){

    this.objects = [];

  }

}

module.exports = Database;
