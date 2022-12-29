const Student = require('../Models/students');

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const keys = require('../config/keys');

const validateRegister2Input = require('../validation/register1');
const validateLoginInput = require('../validation/login');


/// Inserting SignUp 
exports.signUp =(req, res) => {

    //Form vaildation
    const { errors, isValid } = validateRegister2Input(req.body)

    ///check vaildation

    if(!isValid) {
        return res.status(400).json(errors)
    }

    Student.findOne({ rollNumber: req.body.rollNumber }).then(returnedStuff => {
        if(returnedStuff) {
            return res.status(400).json({rollNumber: "rollNumber already exist!!!"})
        }
    });

    // saving user with request information to database
	const {std_id, fullName, rollNumber, email, phoneNumber, password } = req.body;

	const signupStudent = new Student({
		std_id : std_id,
		fullName : fullName,
		rollNumber : rollNumber,
        email : email,
        phoneNumber : phoneNumber,
		password : password
	});

    bcrypt.genSalt(10, (err, salt) =>{
        bcrypt.hash(signupStudent.password, salt, (err, hash) => {
            if(err) throw err;
            signupStudent.password = hash;
            signupStudent.save().then(Student => res.json(Student)).catch(err => console.log(err));
        });
    });

};


exports.login =(req, res) => {

    //what happens
    const {errors, isValid} = validateLoginInput(req.body)
    if (!isValid) {
        return res.status(400).json(errors)
    }
    const rollNumber = req.body.rollNumber;
    const password = req.body.password;

    Student.findOne({ rollNumber: rollNumber }).then(Student => {

        //check if user exists
        if(!Student){
            return res.status(404).json({message: "rollNumber not found"});
        }

        //check password
        bcrypt.compare(password, Student.password).then(isMatch => {
            if(isMatch){
                //user matched
                //create JWT payload

                const payload ={ id: Student.pat_id, name: Student.fullName, rollNumber: Student.rollNumber, email: Student.email, phone: Student.phoneNumber, age: Student.age, gender: Student.gender};

                //sign token
                jwt.sign(
                    payload,
                    keys.secretOrKey2,
                    {expiresIn: 3600},
                    (err, token) => {
                    res.json({ success: true, token: "Bearer" + token, payload});
                });

                
            } else {
                return res
                .status(400)
                .json({ message: "Password Incorrect"})
            }
        });
    });
};
