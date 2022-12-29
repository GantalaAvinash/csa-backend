const mongoose = require('mongoose');

// Initialising the mongoose Schema
const Schema = mongoose.Schema;
const autoIncrement = require("mongoose-auto-increment");

// Registering the City Schema
const LocationSchema = new Schema({
    location_id: {
        type: Number,
        required: true
    },
    name: {
        type: String,
    },
    city_id: {
        type: Number,
    },
    city: {
        type: String,
    },
    country_name: {
        type: String,
    }
})
autoIncrement.initialize(mongoose.connection);
LocationSchema.plugin(autoIncrement.plugin, {
  model: "location", // collection or table name in which you want to apply auto increment
  field: "location_id", // field of model which you want to auto increment
  startAt: 1, // start your auto increment value from 1
  incrementBy: 1, // incremented by 1
});


module.exports = mongoose.model('locations', LocationSchema, 'locations');   // exporting the model