
const event = require("../Models/events");

exports.getEvent=(req,res)=>{
    event.find().then(
        response=>{
            res.status(200).json({message:"Sucessfull fetched Events!",event:response});
        }
    ).catch(
        err =>{
            res.status(500).json({message:"Error",error:err});
        }
    );
}

exports.event=(req,res)=>{
    const { title, description, driveLink, image} = req.body;
    const events = new event({
        title: title,
        description: description,
        driveLink: driveLink,
        image: image
    });
    if(!title || !description ){
        res.status(200).json({ message: "Please enter all details "});
    }
    else{events.save().then(response => {
            res.status(200).json({ message: "Data saved Successfully" })
        })
        .catch(err => {
            res.status(500).json({ error: err })
        })}
}

exports.getEventbyId = async (req, res, next) => {
	try {
		const { event_id } = req.params;

		const eventList = await event.find({
			event_id: event_id,
		});

		res.status(200).json({
			status: true,
			NoOfEvents: eventList.length,
			event: eventList,
		});
	} catch (error) {
		next(error);
	}
};

exports.deleteevent = (req, res, next) => {

    const { event_id } = req.params;

    event.findOneAndDelete(
        { event_id }
    ).then(_result => {
        res.status(200).json({
            status: true,
            message: `Event object ${event_id} deleted successfully`
        })
    }).catch(error => {
        next(error);
    })
}


exports.updateEvent = (req, res) => {
    const { title, description, driveLink, image } = req.body;
    event.updateOne({ _id: req.params.id }, {
        $set: {
            title: title,
            description: description,
            driveLink: driveLink,
            image: image
        }
    }).then(response => {
        res.status(200).json({ message: "Data Updated Successfully" })
    })
        .catch(err => {
            res.status(500).json({ error: err })
        })
}
