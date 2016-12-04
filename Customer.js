
function Customer(lastName, firstName, gender, favoriteColor, birthDate){

  this.lastName = lastName;
  this.firstName = firstName;
  this.gender = gender;
  this.favoriteColor = favoriteColor;

  try{
    this.birthDate = new Date(birthDate);
  }catch(e){
    var error = new Error('Invalid birthdate format.');
    error.given = birthDate;
    return error;
  }

}

Customer.prototype = {

  

}

module.exports = Customer;
