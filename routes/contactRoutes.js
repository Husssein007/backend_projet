const express=require('express')
const contactSchema=require('../model/contact')



const contactRoute=express.Router()

//Route get all contact
//====> http://localhost:4000/contact/getall
contactRoute.get('/getall', async (req, res) => {
    try {
        const contacts = await contactSchema.find();
        res.status(200).json({
            msg: 'You have successfully retrieved all users.',
            contacts
        });
    } catch (err) {
        console.error("Error retrieving contacts:", err);
        
        // Send JSON error response
        res.status(500).json({
            msg: 'There was an error retrieving the users.',
            error: err.message
        });
    }
});



//Route post or add contact
//====> http://localhost:4000/contact/addcontact

contactRoute.post('/addcontact',async(req,res)=>{
    try {
const newContact= new contactSchema(req.body)
await newContact.save()

        res.status(200).json({msg:'you added the user',newContact})
        
    } catch(err){
        console.log(err)
        res.send("u have a problem")
    }
})




//Route update contact 
//====> http://localhost:4000/contact/update/:id


contactRoute.put('/update/:id', async (req, res) => {
    try {
        const { id } = req.params;
        
        // Correct method name and syntax for $set
        const updateUser = await contactSchema.findByIdAndUpdate(id, { $set: { ...req.body } }, { new: true });

        if (!updateUser) {
            return res.status(404).json({ msg: "User not found" });
        }

        res.status(200).json({ msg: "User updated successfully", updateUser });

    } catch (err) {
        console.log(err);
        res.status(500).send("There was a problem updating the user");
    }
});


//Route delete contact 
//====> http://localhost:4000/contact/delete/:id

contactRoute.delete('/delete/:id', async (req, res) => {
    try {
        const { id } = req.params;
        
        // Correct method name and syntax for $set
        const udeleteduser = await contactSchema.findByIdAndDelete(id)

      

        res.status(200).json({ msg: "User delete successfully"});

    } catch (err) {
        console.log(err);
        res.status(500).send("There was a problem updating the user");
    }
});


//Route get unique contact 
//====> http://localhost:4000/contact/getunique/:id

contactRoute.get('/getunique/:id', async (req, res) => {
    try {
        const { id } = req.params;
        
        // Correct method name and syntax for $set
        const getuser = await contactSchema.findByeId(id)

        if (!updateUser) {
            return res.status(404).json({ msg: "User not found",getuser });
        }

        res.status(200).json({ msg: "User find successfully", updateUser });

    } catch (err) {
        console.log(err);
        res.status(500).send("There was a problem updating the user");
    }
});




module.exports = contactRoute;