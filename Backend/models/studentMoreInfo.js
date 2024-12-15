  
  const mongoose=require("mongoose")
  const studentMoreInfoSchema=new mongoose.Schema({
    Bio:String,
    github:String,
    linkedin:String,
    leetcode:String,
    twitter:String,
    instagram:String,
    projects:String,
   skills:String,
   
  })
const studentMoreInfo=mongoose.model("studentMoreInfo",studentMoreInfoSchema)
module.exports=studentMoreInfo