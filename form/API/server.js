import express from 'express';
import mongoose from 'mongoose';
import { Contact } from '../API/Contact_Modal.js';
import bodyParser from 'body-parser';
import cors from 'cors';

const app = express();

app.use(bodyParser.json());
app.use(cors({
    origin: true,
    methods: ["get", "delete", "put", "post"],
    Credential: true
}))

mongoose.connect("mongodb+srv://ArchProtios:Uttkarsh09%40@cluster0.7uh2jkv.mongodb.net/",{dbName: "MERN_FORM"})
        .then(console.log("MongoDB Connection created ..."))
        .catch((error) => {console.error(error);});

// get is used to Fetch_All_Resources
app.get('/', async (req,res) => {
    try {
        const contacts = await Contact.find()
        if(!contacts) {
            res.send("User Not Found ...")
        }
        res.json([{message: "All Contacts", contacts }])
    } catch (error) {
        res.send("Error Occured ...", error)
    }
});

// post is used to Add_Element_In_Resources or to Create_Element_In_Resources
app.post('/', async (req,res) => {
    const { message, gmail, phone, createdAt} = req.body
    try {
        const contact = await Contact.findOne({ gmail })
        if (contact) {
            // res.end("Email aldready exists ... ")
            res.send("Email aldready exists ... ")
        } else {
            contact = await Contact.create({ message, gmail, phone, createdAt })
            res.json({
                message: "Contact saved successfully ...", 
                contact
            })
        }
    } catch( error ) {
        res.send(`Error ${error} found ...`, error)
    }
});

// Delete Contacts
app.delete("/:id", async (req, res) => {
    const id = req.params.id;
    try {
        // Find the contact by its ID
        const contact = await Contact.findById(id);
        
        // Check if the contact exists
        if (!contact) {
            return res.status(404).send("Contact not found");
        }
        
        // Delete the contact
        await contact.deleteOne(); // or await contact.remove();
        
        res.send("Contact deleted successfully");
    } catch (error) {
        console.error("Error deleting contact:", error);
        res.status(500).send("Error deleting contact");
    }
});



// put is used to Edit_A_Resource
app.put("/:id", async (req,res) => {
    const id = req.params.id
    const updatedData = req.body
    try {
        let data = await Contact.findByIdAndUpdate(id, updatedData, ({ new: true }))
        if(!data) {
            res.send("User Not Found ... ")
        }
        res.json({message: "User contact has been updated" , data})
    } catch (error) {  
        res.send("Error Occurs Daily ... ", error)
    }
})



app.listen(4000, () => {
    console.log("Server is running on port 4000");
});




