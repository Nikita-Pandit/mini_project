  
  const mongoose=require("mongoose")
  const studentSchema=new mongoose.Schema({
    name:String,
    email:String,
    contact:Number,
    branch:String,
    currentYear:Number
  })
const studentModel=mongoose.model("student",studentSchema)
module.exports=studentModel