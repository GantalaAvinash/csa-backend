const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcryptjs');
const autoIncrement = require("mongoose-auto-increment");

const StudentSchema = new Schema({
	std_id:{
		type:Number,
		required:true,
		unique:true
	},
	
	fullName: {
		type: String,
		required: [true, 'Please add your fullname'],
	},
	rollNumber: {
		type: String,
		required: [true, 'Please add your roll number'],
		unique:true
	},
    email: {
		type: String,
		required: [true, 'Please add an email'],
		unique: true,
	},
    phoneNumber: {
		type: Number,
		required: [true, 'Please add your number'],
	},
    password: {
		type: String,
		required: [true, 'Please add your number'],
	},
});


autoIncrement.initialize(mongoose.connection);
StudentSchema.plugin(autoIncrement.plugin, {
  model: "student", // collection or table name in which you want to apply auto increment
  field: "std_id", // field of model which you want to auto increment
  startAt: 1, // start your auto increment value from 1
  incrementBy: 1, // incremented by 1
});
/* 
PatientSchema.pre('save', async function (next) {
	const salt = await bcrypt.genSalt(12);
	this.password = await bcrypt.hash(this.password, salt);
});

PatientSchema.methods.matchPassword = async function (enteredPass) {
	return await bcrypt.compare(enteredPass, this.password);
};
 */

module.exports = mongoose.model('student', StudentSchema);