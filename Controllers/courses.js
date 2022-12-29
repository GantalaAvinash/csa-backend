
const course = require("../Models/course");

exports.getCourse=(req,res)=>{
    course.find().then(
        response=>{
            res.status(200).json({message:"Sucessfull fetched courses!",course:response});
        }
    ).catch(
        err =>{
            res.status(500).json({message:"Error",error:err});
        }
    );
}

exports.course=(req,res)=>{
    const { title, Description, driveLink, image} = req.body;
    const usercourse = new course({
        title: title,
        Description: Description,
        driveLink: driveLink,
        image: image
    });
    if(!title || !Description || !image){
        res.status(200).json({ message: "Please enter all details "});
    }
    else{usercourse.save().then(response => {
            res.status(200).json({ message: "Data saved Successfully" })
        })
        .catch(err => {
            res.status(500).json({ error: err })
        })}
}

exports.getcoursebyId = async (req, res, next) => {
	try {
		const { course_id } = req.params;

		const courseList = await course.find({
			course_id: course_id,
		});

		res.status(200).json({
			status: true,
			NoOfCourses: courseList.length,
			course: courseList,
		});
	} catch (error) {
		next(error);
	}
};



exports.deletecourse = (req, res, next) => {

    const { course_id } = req.params;

    course.findOneAndDelete(
        { course_id }
    ).then(_result => {
        res.status(200).json({
            status: true,
            message: `course object ${course_id} deleted successfully`
        })
    }).catch(error => {
        next(error);
    })
}


exports.updatecourse = (req, res, next) => {

    const { course_id, title, Description, driveLink, image} = req.body;

    course.findOneAndUpdate(
        { course_id },
        { course_id, title, Description, driveLink, image }
    ).then(_result => {
        res.status(200).json({
            status: true,
            message: `course object ${course_id} updated successfully`
        })
    }).catch(error => {
        next(error);
    })
}

exports.updatecourseId = async (req, res, next) => {

    const {course_id, course } = req.body;
    const p = await User.findOne({ course_id })
    console.log(p)
    const courses = p.course
    course.push(course[0])
    console.log(course)
    course.findOneAndUpdate(
        { course_id },
        { course: courses }
    ).then(result => {
        res.status(200).json({
            status: true,
            message: `course object ${course_id} updated successfully`
        })
    }).catch(error => {
        next(error);
    })
}