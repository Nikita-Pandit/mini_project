  
  const mongoose=require("mongoose")
  const studentMoreInfoSchema=new mongoose.Schema({
    Bio:{
      type:String,
      required:true
    },
    github:String,
    linkedin:String,
    leetcode:String,
    twitter:String,
    instagram:String,
    projects:String,
   skills:{
    type:String,
    //required:true
  },
  location:{
    type:String,
    ///required:true
  },
  branch:{
    type:String,
   // required:true
  },
  selectyear:{
    type:String,
    //required:true
  },
  image:{
    type:String,
    //required:true
  }
  })
const studentMoreInfo=mongoose.model("studentMoreInfo",studentMoreInfoSchema)
module.exports=studentMoreInfo