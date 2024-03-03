const mongoose=require("mongoose");
// const { platform } = require("os");
mongoose.connect("mongodb://localhost:27017/devCreeps")//will create new or if exist then use it 

const db=mongoose.connection
db.on('connected',()=>{
    console.log("connected");
})
db.on("error",(err)=>{
    console.log(err);
})
