
const product = require("../Models/product");

exports.getProduct=(req,res)=>{
    product.find().then(
        response=>{
            res.status(200).json({message:"Sucessfull fetched Product!",product:response});
        }
    ).catch(
        err =>{
            res.status(500).json({message:"Error",error:err});
        }
    );
}

exports.product=(req,res)=>{
    const { name, Description, Short_Description, Deliver, min_price, image} = req.body;
    const userorder = new Product({
        name: name,
        Description: Description,
        Short_Description: Short_Description,
        Deliver: Deliver,
        amount: min_price,
        image: image
    });
    if(!email || !firstName || !lastName || !message || !address || !phone){
        res.status(200).json({ message: "Please enter all details "});
    }
    else{userorder.save().then(response => {
            res.status(200).json({ message: "Data saved Successfully" })
        })
        .catch(err => {
            res.status(500).json({ error: err })
        })}
}

exports.getProductbyId = async (req, res, next) => {
	try {
		const { product_id } = req.params;

		const productList = await product.find({
			product_id: product_id,
		});

		res.status(200).json({
			status: true,
			NoOfProducts: productList.length,
			product: productList,
		});
	} catch (error) {
		next(error);
	}
};
