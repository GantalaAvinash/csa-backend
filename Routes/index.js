const express = require("express");
const eventController = require("../Controllers/events");
const batchController = require("../Controllers/batch");
const courseController = require("../Controllers/courses");
const contactUs = require('../Controllers/contactUs');

const router = express.Router();


router.route('/getbatch').get(batchController.getBatch);
router.route('/getbatch/:batchId').get(batchController.getBatchbyId);
router.route('/getsem').get(batchController.getSemester);
router.route('/getsem/:semId').get(batchController.getSemesterbyId);
router.route('/getsembybatch/:batchId').get(batchController.getSemesterbyBatchId);
router.route('/getevent').get(eventController.getEvent);
router.route('/getcourse').get(courseController.getCourse);
router.route('/getevent/:event_id').get(eventController.getEventbyId);
router.route('/getcourse/:course_id').get(courseController.getcoursebyId);
router.route('/addevent').post(eventController.event);
router.route('/addcourse').post(courseController.course);
router.route('/deleteevent/:event_id').delete(eventController.deleteevent);
router.route('/deletecourse/:course_id').delete(courseController.deletecourse);
router.route('/updateevent/:event_id').put(eventController.updateEventId);
router.route('/updatecourse/:course_id').put(courseController.updatecourse);
router.route('/contactUs').post(contactUs.contactUS);


module.exports=router;
