const { MongoChangeStreamError } = require("mongodb")
const mongoose =require("mongoose")
const { stringify } = require("querystring")
const schema_Basic=new mongoose.Schema({
    usr_id:{
        type:String,
        require:true,
        unique:true
    },
    usr_pass:{
        type:String,
        require:true
    }
})
// below is collection

// ye usr_data ko app.js line 30 and usse hum new data collection mein daal re hai 
const Usr_data=new mongoose.model("schema_Basic",schema_Basic)
module.exports=Usr_data