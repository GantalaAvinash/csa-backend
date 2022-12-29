const UserData = require('../Models/students');


exports.getUserbyId = async (req, res, next) => {
	try {
		const { std_id } = req.params;

		const UsersList = await UserData.find({
			std_id: std_id,
		});

		res.status(200).json({
			status: true,
			NoOfUsers: UsersList.length,
			Users: UsersList,
		});
	} catch (error) {
		next(error);
	}
};
