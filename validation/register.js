const Validator = require('validator');
const isEmpty = require('is-empty');

module.exports = function validateRegisterInput(data){
    let errors = {};

    data.rollNumber = !isEmpty(data.rollNumber) ? data.rollNumber : "";
    data.password = !isEmpty(data.password) ? data.password : "";
    data.confirmpassword = !isEmpty(data.confirmpassword) ? data.confirmpassword : "";

    if (Validator.isEmpty(data.rollNumber)){
        errors.message = "rollNumber field is required";
    }else if (!Validator.isrollNumber(data.rollNumber)) {
        errors.message = "rollNumber is invaild";
    }
    if (Validator.isEmpty(data.password)){
        errors.message = "Password field is required";
    }
    if (Validator.isEmpty(data.confirmpassword)){
        errors.message = "Confirm password field is required";
    }

    if(!Validator.equals(data.password, data.confirmpassword)) {
       errors.message = "Password must match";
    }

    return {
        errors,
        isValid: isEmpty(errors)
    };
};