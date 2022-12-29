const Validator = require('validator');
const isEmpty = require('is-empty');

module.exports = function validateRegister2Input(data){
    let errors = {};

    data.rollNumber = !isEmpty(data.rollNumber) ? data.rollNumber : "";
    data.password = !isEmpty(data.password) ? data.password : "";

    if (Validator.isEmpty(data.rollNumber)){
        errors.message = "rollNumber field is required";
    }else if (!Validator.isRollNumber(data.rollNumber)) {
        errors.message = "rollNumber is invaild";
    }
    if (Validator.isEmpty(data.password)){
        errors.message = "Password field is required";
    }

    return {
        errors,
        isValid: isEmpty(errors)
    };
};