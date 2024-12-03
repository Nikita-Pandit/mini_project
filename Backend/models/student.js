const mongoose=require("mongoose")
const studentSchema=new mongoose.Schema({
name:{
    type:String,
    minLength:3,
    required:true
},
email:{
    type:String,
    required:true,
    unique: true
},
contact:{
    type:Number,
    required:true
},
branch:{
    type:String,
    required:true
},
currentYear:{
    type:Number,
    required:true
}
}) 

module.exports=mongoose.model("student",studentSchema)