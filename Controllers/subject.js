const subject = require("../Models/subject");

exports.getSubject=(req,res)=>{
    subject.find().then(
        response=>{
            res.status(200).json({message:"Sucessfull fetched subjects!",subject:response});
        }
    ).catch(
        err =>{
            res.status(500).json({message:"Error",error:err});
        }
    );
}

exports.getSubjectbyId = async (req, res, next) => {
	try {
		const { subId } = req.params;

		const subjectList = await subject.find({
			subId: subId,
		});

		res.status(200).json({
			status: true,
			NoOfsubjects: subjectList.length,
			subject: subjectList,
		});
	} catch (error) {
		next(error);
	}
};

exports.getSubjectbySemId = async (req, res, next) => {
	try {
		const { semId } = req.params;

		const subjectList = await subject.find({
			semId: semId,
		});

		res.status(200).json({
			status: true,
			NoOfsubjects: subjectList.length,
			subject: subjectList,
		});
	} catch (error) {
		next(error);
	}
};

exports.subject=(req,res)=>{
    const { subId, semId, batchId, subjectName, subjectLink } = req.body;
    const usersubject = new subject({
        subId: subId,
        semId: semId,
        batchId: batchId,
        subjectName: subjectName,
        subjectLink: subjectLink
    });
    if(!subjectName || !subjectLink || !subId || !semId || !batchId){
        res.status(200).json({ message: "Please enter all details "});
    }
    else{usersubject.save().then(response => {
            res.status(200).json({ message: "Data saved Successfully" })
        })
        .catch(err => {
            res.status(500).json({ error: err })
        })}
}

exports.deleteSubject = (req, res, next) => {

    const { subjectId } = req.params;

    subject.findOneAndDelete(
        { subjectId }
    ).then(_result => {
        res.status(200).json({
            status: true,
            message: `Subject object ${subjectId} deleted successfully`
        })
    }).catch(error => {
        next(error);
    })
}