
function Customer(name, gender, favoriteColor, birthDate){

  this.name = firstName + lastName;
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
