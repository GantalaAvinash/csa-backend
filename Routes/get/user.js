const express = require('express');
const router = express.Router();
const getUser = require('../../Controllers/getUsers');
const getUserbyId = require('../../Controllers/getUserbyId')

router.route('/user').get(getUser.getUsers);
router.route('/user/:user_id').get(getUserbyId.getUserbyId);

module.exports = router;
