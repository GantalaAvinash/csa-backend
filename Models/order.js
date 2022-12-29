const mongoose = require("mongoose");

const schema = mongoose.Schema;

const autoIncrement = require("mongoose-auto-increment");

const orderSchema = new schema({
    order_id: {
        type: Number,
        required: true
    },
    firstName:{
        type:String,
    },
    lastName:{
        type:String,
    },
    email:{
        type:String,
    },
    address:{
        type:String,
    },
    phone:{
        type:Number,
    },
    product:{
        type:Array,
    },
    user:[
		{
			user_id:{
				type:Number
			}
		}
	]
})

autoIncrement.initialize(mongoose.connection);
orderSchema.plugin(autoIncrement.plugin, {
  model: "order", // collection or table name in which you want to apply auto increment
  field: "order_id", // field of model which you want to auto increment
  startAt: 1, // start your auto increment value from 1
  incrementBy: 1, // incremented by 1
});

module.exports = mongoose.model('order',orderSchema,'order');
