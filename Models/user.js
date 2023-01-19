const mongoose = require('mongoose');

const autoIncrement = require("mongoose-auto-increment");

const UserSchema = new mongoose.Schema({
    user_id:{
		type: Number,
		required:true
	},
    name: {
        type: String,
        required: true
    },
    rollNumber: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ['student', 'admin'],
        default: 'student'
    },
    date: {
        type: Date,
        default: Date.now
    }
});

autoIncrement.initialize(mongoose.connection);
UserSchema.plugin(autoIncrement.plugin, {
  model: "User", // collection or table name in which you want to apply auto increment
  field: "user_id", // field of model which you want to auto increment
  startAt: 1, // start your auto increment value from 1
  incrementBy: 1, // incremented by 1
});

const User = mongoose.model('User', UserSchema);

module.exports = User;
