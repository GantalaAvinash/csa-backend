const mongoose = require('mongoose');

// Initialising the mongoose Schema
const Schema = mongoose.Schema;
const autoIncrement = require("mongoose-auto-increment");

// Registering the City Schema

const ProductSchema = new Schema({
    product_id:{
		type: Number,
		required:true
	},
    name: {
        type: String,
        required: true
    },
    content: [
        {
            Description :{
                type: String,
            },
            Short_Description: {
                type: String,
            },
            Deliver:{
                type: String,
            },
        }
    ],
    min_price:{
        type:Number,
        require:true
    },
    image: {
        type: String,
        required: true
    }
})

autoIncrement.initialize(mongoose.connection);
ProductSchema.plugin(autoIncrement.plugin, {
  model: "product", // collection or table name in which you want to apply auto increment
  field: "product_id", // field of model which you want to auto increment
  startAt: 1, // start your auto increment value from 1
  incrementBy: 1, // incremented by 1
});

module.exports = mongoose.model('product', ProductSchema, 'product');   // exporting the model