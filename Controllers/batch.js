
const batch = require("../Models/batch");
const semester = require("../Models/semester");

exports.getBatch=(req,res)=>{
    batch.find().then(
        response=>{
            res.status(200).json({message:"Sucessfull fetched batchs!",batch:response});
        }
    ).catch(
        err =>{
            res.status(500).json({message:"Error",error:err});
        }
    );
}

exports.getBatchbyId = async (req, res, next) => {
	try {
		const { batchId } = req.params;

		const batchList = await batch.find({
			batchId: batchId,
		});

		res.status(200).json({
			status: true,
			NoOfBatchs: batchList.length,
			batch: batchList,
		});
	} catch (error) {
		next(error);
	}
};

exports.getSemester=(req,res)=>{
    semester.find().then(
        response=>{
            res.status(200).json({message:"Sucessfull fetched semesters!",semester:response});
        }
    ).catch(
        err =>{
            res.status(500).json({message:"Error",error:err});
        }
    );
}

exports.getSemesterbyId = async (req, res, next) => {
	try {
		const { semId } = req.params;

		const semesterList = await semester.find({
			semId: semId,
		});

		res.status(200).json({
			status: true,
			NoOfsemesters: semesterList.length,
			semester: semesterList,
		});
	} catch (error) {
		next(error);
	}
};
exports.getSemesterbyBatchId = async (req, res, next) => {
	try {
		const { batchId } = req.params;

		const semesterList = await semester.find({
			batchId: batchId,
		});

		res.status(200).json({
			status: true,
			NoOfsemesters: semesterList.length,
			semester: semesterList,
		});
	} catch (error) {
		next(error);
	}
};