  
  const mongoose=require("mongoose")
  const studentSchema=new mongoose.Schema({
    name:{
      type:String,
    },
    email:{
      type:String,
    },
    contact:{
      type:Number,
    },
   password:{
    type:String,
   },   
   isVerified: 

   { type: Boolean, default: false },
   
   verificationToken: { type: String }
  
  })
const studentModel=mongoose.model("students",studentSchema)
module.exports=studentModel