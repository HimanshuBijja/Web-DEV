const express = require("express");
const app = express();
const mongoose = require("mongoose");
mongoose.connect("mongodb+srv://bijjahimanshu05:Explore-MongoDB@cluster0.g0j9e.mongodb.net/test1");

app.use(express.json());

const schema = mongoose.model(
    "user4",{
        username : String,
        email : String,
        password : String
    }
)


app.post("/signin",async (req,res) =>{
    const username = req.body.username;
    const email = req.body.email;
    const password = req.body.password;

    const existingUser = await schema.findOne({username : username});
    console.log(existingUser);
    if(existingUser){
        return res.status(401).json({
            msg : "user already exists"
        })
    }

    const user = new schema({
        username : username,
        email : email,
        password : password
    });
    user.save().then(()=>{
        console.log("users saved in database");
    })

    res.json({
        msg : "done"
    })
});

app.listen(3000, () =>{
    console.log(`listening on ${3000}`);
})
