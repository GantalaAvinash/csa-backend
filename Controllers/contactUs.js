const contact = require('../Models/contactUs')

exports.contactUS=(req,res)=>{
    const { email, firstName,lastName,message,address,phone } = req.body;
    const userorder = new contact({
        email: email,
        firstName: firstName,
        lastName: lastName,
        address: address,
        phone:phoner,
        message: message
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
