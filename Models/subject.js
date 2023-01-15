const mongoose = require('mongoose');

// Initialising the mongoose Schema
const Schema = mongoose.Schema;
const autoIncrement = require("mongoose-auto-increment");

// Registering the City Schema

const SubjectSchema = new Schema({
  auto_Id:{
    type: Number,
		required:true
  },
  subId:{
		type: Number,
		required:true
	},
  semId:{
		type: Number,
		required:true
	},
  batchId:{
		type: Number,
		required:true
	},
  subjectName: {
    type: String,
    required: true
  },
  subjectLink: {
    type: String,
    required: true
  },
})

autoIncrement.initialize(mongoose.connection);
SubjectSchema.plugin(autoIncrement.plugin, {
  model: "subject", // collection or table name in which you want to apply auto increment
  field: "auto_Id", // field of model which you want to auto increment
  startAt: 1, // start your auto increment value from 1
  incrementBy: 1, // incremented by 1
});

module.exports = mongoose.model('subject', SubjectSchema, 'subject');   // exporting the model