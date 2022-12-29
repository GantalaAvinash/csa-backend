const UsersData = require('../Models/students');

exports.getUsers = async (req, res) => {
	const Users = await UsersData.find();
	res.status(200).json({
		status: true,
		Users,
	});
};