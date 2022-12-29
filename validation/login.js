const Validator = require("validator");
const isEmpty = require("is-empty");

module.exports = function validateLoginInput(data) {

    let errors = {};

    data.rollNumber = !isEmpty(data.rollNumber) ? data.rollNumber : "";
    data.password = !isEmpty(data.password) ? data.password: "";


    //email check
    if (Validator.isEmpty(data.rollNumber)){
        errors.message = "rollNumber field is required";
    }else if (!Validator.isEmail(data.rollNumber)) {
        errors.message = "rollNumber is invaild";
        
    }

    //password check
    if (Validator.isEmpty(data.password)){
        errors.message = "Password field is required";
    }

    return {
        errors,
        isValid: isEmpty(errors)
    };
};