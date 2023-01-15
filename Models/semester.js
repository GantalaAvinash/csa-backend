const mongoose = require('mongoose');

// Initialising the mongoose Schema
const Schema = mongoose.Schema;
const autoIncrement = require("mongoose-auto-increment");

// Registering the City Schema

const SemesterSchema = new Schema({
  semId:{
		type: Number,
		required:true
	},
  batchId:{
		type: Number,
		required:true
	},
  semester: {
    type: String,
    required: true
  },
})

autoIncrement.initialize(mongoose.connection);
SemesterSchema.plugin(autoIncrement.plugin, {
  model: "semester", // collection or table name in which you want to apply auto increment
  field: "semId", // field of model which you want to auto increment
  startAt: 1, // start your auto increment value from 1
  incrementBy: 1, // incremented by 1
});

module.exports = mongoose.model('semester', SemesterSchema, 'semester');   // exporting the model