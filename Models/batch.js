const mongoose = require('mongoose');

// Initialising the mongoose Schema
const Schema = mongoose.Schema;
const autoIncrement = require("mongoose-auto-increment");

// Registering the City Schema

const BatchSchema = new Schema({
    batchId:{
		type: Number,
		required:true
	},
    batchYear: {
        type: String,
        required: true
    },
})

autoIncrement.initialize(mongoose.connection);
BatchSchema.plugin(autoIncrement.plugin, {
  model: "batch", // collection or table name in which you want to apply auto increment
  field: "batchId", // field of model which you want to auto increment
  startAt: 1, // start your auto increment value from 1
  incrementBy: 1, // incremented by 1
});

module.exports = mongoose.model('batch', BatchSchema, 'batch');   // exporting the model