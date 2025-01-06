
const studentModel=require("../models/studentModel");

const studentMoreInfo = require("../models/studentMoreInfo");
const loginController=async (req,res)=>{
    console.log("Received data:", req.body);
    const {email,password}=req.body
    const user= await studentModel.findOne({email})
    const userMoreDetails=await studentMoreInfo.findOne({studentID:user._id})
    if(user){
     if(user.password===password){
      res.json({message:"Login Successful",userMoreDetails})
     }
     else{
      res.json("Login Unsuccessful")
     }
    }
    else{
      res.json("No record exist")
    }
    }
module.exports={loginController}

