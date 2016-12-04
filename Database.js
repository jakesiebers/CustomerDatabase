
// Everything is held locally right now.
// In the future this should be a wrapper that talks to an external database

function Database(){

  var objects = [];

}

Database.prototype = {

  add(item){

    objects.push(item);

  },

  getSortedBy(field, desc){

    return this.objects.sort((a, b) => {

      if(a[field] === b[field]) return 0;

      if(a[field] > b[field])
        return -1;
      else
        return 1;

    });

  }

}

module.exports = Database;
