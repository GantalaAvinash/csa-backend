
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
    const { title, Description, driveLink, image} = req.body;
    const userevent = new event({
        title: title,
        Description: Description,
        driveLink: driveLink,
        image: image
    });
    if(!title || !Description ){
        res.status(200).json({ message: "Please enter all details "});
    }
    else{userevent.save().then(response => {
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


exports.updateEvent = (req, res, next) => {

    const { event_id, title, Description, driveLink, image} = req.body;

    event.findOneAndUpdate(
        { event_id },
        { event_id, title, Description, driveLink, image }
    ).then(_result => {
        res.status(200).json({
            status: true,
            message: `User object ${event_id} updated successfully`
        })
    }).catch(error => {
        next(error);
    })
}

exports.updateEventId = async (req, res, next) => {

    const {event_id, event } = req.body;
    const p = await User.findOne({ event_id })
    console.log(p)
    const events = p.event
    event.push(event[0])
    console.log(event)
    event.findOneAndUpdate(
        { event_id },
        { event: events }
    ).then(result => {
        res.status(200).json({
            status: true,
            message: `Users object ${event_id} updated successfully`
        })
    }).catch(error => {
        next(error);
    })
}
