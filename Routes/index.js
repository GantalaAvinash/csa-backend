const express = require("express");
const eventController = require("../Controllers/events");
const batchController = require("../Controllers/batch");
const subjectController = require("../Controllers/subject");
const courseController = require("../Controllers/courses");
const contactUs = require('../Controllers/contactUs');
const qr = require('../Controllers/qr');

const router = express.Router();

router.route('/qr').get(qr.getQr);
router.route('/subject').post(subjectController.subject);
router.route('/subject/:subId').delete(subjectController.deleteSubject);
router.route('/subject').get(subjectController.getSubject);
router.route('/subject/:subId').get(subjectController.getSubjectbyId);
router.route('/subjectbysem/:semId').get(subjectController.getSubjectbySemId);
router.route('/batch').get(batchController.getBatch);
router.route('/batch/:batchId').get(batchController.getBatchbyId);
router.route('/sem').get(batchController.getSemester);
router.route('/sem/:semId').get(batchController.getSemesterbyId);
router.route('/sembybatch/:batchId').get(batchController.getSemesterbyBatchId);
router.route('/events').get(eventController.getEvent);
router.route('/courses').get(courseController.getCourse);
router.route('/events/:event_id').get(eventController.getEventbyId);
router.route('/courses/:course_id').get(courseController.getcoursebyId);
router.route('/events').post(eventController.event);
router.route('/courses').post(courseController.course);
router.route('/events/:event_id').delete(eventController.deleteevent);
router.route('/courses/:course_id').delete(courseController.deletecourse);
router.route('/events/:event_id').put(eventController.updateEvent);
router.route('/courses/:course_id').put(courseController.updatecourse);
router.route('/contactUs').post(contactUs.contactUS);


module.exports=router;
