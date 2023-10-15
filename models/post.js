const mongoose = require("mongoose");


const postSchema = new mongoose.Schema({
    content : {
        type: String, 
        required:true,
    }, 
    users:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"User"
    }
}
,{
    timestamps:true,
    // strictPopulate:false,
},)
module.exports=mongoose.model("Post", postSchema);