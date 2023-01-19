const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const secret = 'yoursecretkey';

const User = require('../Models/user');


/// Inserting SignUp 
exports.signUp =(req, res) => {

    const { name, email, password } = req.body;
    const newUser = new User({ name, rollNumber, email, password });

    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
        if (err) throw err;
        newUser.password = hash;
        newUser.save()
            .then(user => {
            jwt.sign(
                { id: user._id },
                secret,
                { expiresIn: 3600 },
                (err, token) => {
                if (err) throw err;
                res.json({
                    token,
                    user: {
                    id: user._id,
                    name: user.name,
                    email: user.email,
                    rollNumber: user.rollNumber,
                    }
                });
                }
            );
            })
            .catch(err => console.log(err));
        });
    });
};


exports.login =(req, res) => {

    const { email, password } = req.body;
    User.findOne({ email })
    .then(user => {
      if (!user) {
        return res.status(404).json({ emailnotfound: "Email not found" });
      }
      bcrypt.compare(password, user.password)
        .then(isMatch => {
          if (isMatch) {
            const payload = { id: user.id, name: user.name };
            jwt.sign(
              payload,
              secret,
              { expiresIn: 3600 },
              (err, token) => {
                res.json({
                  success: true,
                  token: "Bearer " + token
                });
              });
          } else {
            return res
              .status(400)
              .json({ passwordincorrect: "Password incorrect" });
          }
        });
    });
};

exports.verifyToken = (req, res, next) => {
    const token = req.body.token;
    if (!token) {
        return res.json({ authenticated: false });
    }
    jwt.verify(token, secret, (err, decoded) => {
        if (err) {
            return res.json({ authenticated: false });
        }
        User.findById(decoded.id)
        .then(user => {
            if (!user) {
            return res.json({ authenticated: false });
            }
            return res.json({ authenticated: true });
        })
        .catch(err => {
            return res.json({ authenticated: false });
        });
    });
};
