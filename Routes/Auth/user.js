const express = require('express');
const userControl = require('../../Controllers/user');
const router = express.Router();

router.route('/userlogin').post(userControl.login);
router.route('/usersignup').post(userControl.signUp);

module.exports = router;