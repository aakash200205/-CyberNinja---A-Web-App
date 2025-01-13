function checkUserDetails(email,password,fullname,address,pincode,city){
 return (userCredentials(email,password) && !isEmpty(fullname) && !isEmpty(address) && !isEmpty(pincode) && !isEmpty(city));
}

function isEmpty(value){
    return !value || value.trim()==='';
}

function userCredentials(email,password){
    return (email && email.includes('@')&&password&&password.trim().length >5);
}

function passwordIsConfirmed(password , confirmPassword){
    return password === confirmPassword;
}

module.exports = {
    checkUserDetails : checkUserDetails,
    passwordIsConfirmed : passwordIsConfirmed
}