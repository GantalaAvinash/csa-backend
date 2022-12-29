const mongoose = require('mongoose');

// Initialising the mongoose Schema
const Schema = mongoose.Schema;
const autoIncrement = require("mongoose-auto-increment");

// Registering the City Schema

const CourseSchema = new Schema({
    course_id:{
		type: Number,
		required:true
	},
    title: {
        type: String,
        required: true
    },
    Description :{
        type: String,
        required: true
    },
    driveLink:{
        type: String,
    },
    image: {
        type: String,
        required: true
    }
})

autoIncrement.initialize(mongoose.connection);
CourseSchema.plugin(autoIncrement.plugin, {
  model: "course", // collection or table name in which you want to apply auto increment
  field: "course_id", // field of model which you want to auto increment
  startAt: 1, // start your auto increment value from 1
  incrementBy: 1, // incremented by 1
});

module.exports = mongoose.model('course', CourseSchema, 'course');   // exporting the model