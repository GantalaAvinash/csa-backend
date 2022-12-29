const { response } = require('express');
const orders = require('../Models/order')

exports.myOrder=(req,res)=>{
    const { email, firstName,lastName,product,address,subTotal,phone } = req.body;
    orders.find({ phone: phone })
    const userorder = new orders({
        email: email,
        firstName: firstName,
        lastName: lastName,
        address: address,
        phone:phone,
        product: product,
        subTotal: subTotal,
    });
    if (!email || !firstName || !lastName || !address || !phone) {
        res.status(200).json({ message: "please enter all details" })
     }
   else
   { userorder.save().then(response => {
            res.status(200).json({ message: "orders feactched Succesfully", orders: response })
        })
        .catch(err => {
            res.status(500).json({ error: err })
        })}
}

exports.previousOrders=(req,res)=>{
    const { phone} = req.body;
    orders.find({ phone: phone })
    .then(response=>{
        if(response.length >0){
            res.status(200).json({ message: "orders feactched Succesfully", orders: response });
        }
        else{
        res.status(500).json({ message: "Failed"});
        }
    }).catch(err => {
        res.status(500).json({ error: err })
    })
    
}

exports.getOrders=(req,res)=>{
    orders.find().then(
        response=>{
            res.status(200).json({message:"Sucessfull fetched Orders!",orders:response});
        }
    ).catch(
        err =>{
            res.status(500).json({message:"Error",error:err});
        }
    );
}

exports.getOrderbyuserId= async (req, res, next) => {
	try {
		const { user_id } = req.params;
        
		const orderList = await orders.find({
			'user.user_id': user_id
		});

		res.status(200).json({
			status: true,
			NoOfOrders: orderList.length,
			Orders: orderList,
		});
	} catch (error) {
		next(error);
	}
};