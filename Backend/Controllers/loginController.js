
// const studentModel=require("../models/studentModel");
// const bcrypt = require("bcrypt");
// const jwt = require("jsonwebtoken");
// const studentMoreInfo = require("../models/studentMoreInfo");
// const loginController=async (req,res)=>{

//     const {email,password}=req.body
//     try{
//       const user= await studentModel.findOne({email})
//       const userMoreDetails=await studentMoreInfo.findOne({studentID:user._id})
//       if(user){
//         const isPasswordValid =  await bcrypt.compare(password,user.password)
//         if(isPasswordValid){
//           // If password matches, send a success response
//           const token=jwt.sign(
//               {userID:user._id,email:user.email},
//               process.env.JWT_SECRET_KEY, 
//               { expiresIn: '1h' }  // Expiration time (optional)
//           )
//               res.status(200).json({ success: true, message: "Login successful", token});
//                } 
              
//     }
//     else {
//       res.status(404).json({ success: false, message: "No record found in the DB." });
//     }
//   }
//   catch(error){
//     console.error("Something went wrong", error.message);
//     res.status(500).json({ success: false, message: "Internal server error" });
//   }
// }
// module.exports={loginController}





const studentModel=require("../models/studentModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const studentMoreInfo = require("../models/studentMoreInfo");
const loginController=async (req,res)=>{
 const userMoreDetails=''
    const {email,password}=req.body
console.log(email)
    try{
      const user= await studentModel.findOne({email})
      if(studentMoreInfo.studentID){
 userMoreDetails =await studentMoreInfo.findOne({studentID:user._id})
      }
   // const userMoreDetails  =await studentMoreInfo.findOne({studentID:user._id})
   // console.log("studentID",userMoreDetails)
console.log("After studentMoreInfo",user)
      if(user){
        console.log("abcd")
        const isPasswordValid =  await bcrypt.compare(password,user.password)
        if(isPasswordValid){
          console.log(isPasswordValid)
          // If password matches, send a success response
          const token=jwt.sign(
              {userID:user._id,email:user.email},
              process.env.JWT_SECRET_KEY, 
              { expiresIn: '1h' }  // Expiration time (optional)
          )
              if(userMoreDetails){
                res.status(200).json({ success: true, message: "Login successful", token,userMoreDetails});
              }
              else{
                console.log("The user info in backend",user)
                res.status(200).json({ success: true, message: "Login successful", token,user});
              }
               } 
              
    }
    else {
      res.status(404).json({ success: false, message: "No record found in the DB." });
    }
  }
  catch(error){
    console.error("Something went wrong", error.message);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
}
module.exports={loginController}

