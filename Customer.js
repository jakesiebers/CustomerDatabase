
function Customer(name, gender, favoriteColor, birthDate){

  if(typeof name !== 'string') return new Error('A name is required to create a customer.');
  if(typeof gender !== 'string') return new Error('A gender is required to create a customer.');
  if(typeof favoriteColor !== 'string') return new Error('A favorite color is required to create a customer.');
  if(typeof birthDate !== 'string') return new Error('A birth date is required to create a customer.');

  this.name = name;
  this.gender = gender;
  this.favoritecolor = favoriteColor;
  this.birthdate = new Date(birthDate);

  // If the date is invalid then return an error
  if(isNaN(this.birthdate.getTime())){
    var error = new Error('Invalid birthdate format.');
    error.given = birthDate;
    return error;
  }

}

Customer.prototype = {



}

module.exports = Customer;
