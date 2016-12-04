
function Customer(lastName, firstName, gender, favoriteColor, birthDate){

  this.lastName = lastName;
  this.firstName = firstName;
  this.gender = gender;
  this.favoriteColor = favoriteColor;
  this.birthDate = new Date(birthDate);

  // If the date is invalid then return an error
  if(isNaN(this.birthDate.getTime())){
    var error = new Error('Invalid birthdate format.');
    error.given = birthDate;
    return error;
  }

}

Customer.prototype = {



}

module.exports = Customer;
