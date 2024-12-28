
const studentModel=require("../models/studentModel")
const loginController=async (req,res)=>{
    console.log("Received data:", req.body);
    const {email,password}=req.body
    const user= await studentModel.findOne({email})
    console.log(user)
    if(user){
     if(user.password===password){
      res.json("Login Successful")
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

