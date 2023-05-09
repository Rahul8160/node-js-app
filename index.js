import  express  from "express";
import path from 'path';
import mongoose from "mongoose";
import cookieParser from "cookie-parser";

mongoose.connect("mongodb://127.0.0.1:27017" , {
    dbName: "backend",

}).then(()=>console.log("Database connected")).catch((e)=> {
    console.log(e)
})

const  messageSchema = new mongoose.Schema({
    name:String,
    email:String
})

const Message = mongoose.model("Message" , messageSchema)
const app = express() ; 

// const users = [];





// middleWare
app.use(express.static(path.join(path.resolve() , "public")))
app.use(express.urlencoded({extended:true})) 
app.use(cookieParser());

app.set("view engine" , "ejs")


const isAuthenticated = (req , res , next)=> {
    const {token} = req.cookies;
    if (token) {
        res.render("logout")
        next()
    }else{
        res.render("login")
    }
}



app.post("/login" , (req , res , next )=> {

    
    res.cookie("token" , "iamin" ,{
        httpOnly : true,
        expires: new Date(Date.now() + 60*1000)
    })
    res.redirect("/")
})

app.get("/logout" , (req,res) =>{
    res.cookie("token" , null , {
        httpOnly : true,
        expires:new Date(Date.now())
    })
        res.redirect("/")
})

app.get("/" ,isAuthenticated, (req , res)=> {
    
    res.render("logout" )

})

// app.post("/" ,  async (req , res)=> {
//     // res.render("index" , {name : "Rahul "})
//     // console.log(req.body.name)
//     // users.push({userName:req.body.name , email:req.body.email})

//     /// through destructuring
//     const {name , email} = req.body;
//      await Message.create({name , email})

//     res.render("success")


// })

// app.get("/add" , async (req , res) => {

//    await Message.create({name:"Rahul2" , email:"abc@gmail.com"})
//         res.send("ahahahaha")
    
    
// })

app.listen (4000 , ()=> {
    console.log("Server is Running")
})