const express = require('express');
const userControl = require('../../Controllers/user');
const router = express.Router();

router.route('/login').post(userControl.login);
router.route('/signup').post(userControl.signUp);
router.route('/verify').post(userControl.verifyToken);

module.exports = router;