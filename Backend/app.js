const express=require("express")
const app=express()

const cors=require("cors")
app.use(cors())

const sendVerificationMail = require('./utils/sendVerificationMail');

const crypto = require('crypto');
const nodemailer = require('nodemailer');
const jwt = require('jsonwebtoken');


PORT=20000
app.use(express.json())
const mongoose=require("mongoose")

const studentModel=require("./models/studentModel")
const studentMoreInfo=require("./models/studentMoreInfo")

mongoose.connect("mongodb+srv://22054434:nikitapandi@cluster2.nj73n.mongodb.net/mini_project?retryWrites=true&w=majority&appName=Cluster2")



app.post("/SignUp",async (req,res)=>{
  const {email,name,password,contact}=req.body
  console.log("Received data:",name,email,contact);
  try {
    // Generate a unique token
    const verificationToken = crypto.randomBytes(32).toString('hex');

    // Create a new user
    const user = new studentModel({
      name,
      email,
      contact,
      password,
      verificationToken,
  });
  
    await user.save();

    // Send the verification email
    const emailSent = await sendVerificationMail(email, verificationToken);

    if (emailSent) {
        res.status(201).json({ message: 'User created. Verification email sent!' });
        console.log('User created. Verification email sent!')
    } else {
        res.status(500).json({ message: 'User created, but email not sent. Try again.' });
        console.log(" 'User created, but email not sent. Try again.' ")
    }
} catch (error) {
    console.error('Error during signup:', error);
    res.status(400).json({ error: 'Error creating user' });
}


})

app.get('/verify', async (req, res) => {
  const { token } = req.query;

  try {
    console.log("verify route 2")
      // Find the user with the token
      const userIDMatchWithToken=await studentModel.findOne({verificationToken: token})

      const user = await studentModel.findOneAndUpdate(
        
          { verificationToken: token },
          { isVerified: true, verificationToken: null },
          { new: true }
      );
      console.log(user)
// await user.save()
      if (!user) {
          return res.status(400).json({ message: 'Invalid or expired token' });
      }

      // res.json({ message: 'Email verified successfully!' });
       return res.redirect(`http://localhost:5174/SignUp?id=${userIDMatchWithToken._id}`);
  } catch (error) {
      console.error('Error during verification:', error);
      res.status(400).json({ error: 'Verification failed' });
  }
});


app.post("/profile",(req,res)=>{
  console.log("Received data:",req.body);
  const {Bio, github,linkedin,leetcode,twitter,instagram,projects,skills}=req.body
studentMoreInfo.create(req.body)
.then(student=>res.json(student))
.catch(err=>console.log(err))
})

app.post("/Login",async (req,res)=>{
console.log("Received data:", req.body);
const {email,password}=req.body
const user= await studentModel.findOne({email})
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
// .then(user=>{
//   if(user){
//     if(user.email===email){
//       res.json("Login successful")
//     }
//     else{
//       res.json("Login Unsuccessful")
//     }
//   }
//   else{
//     res.json("No record existed")
//   }
// })

})

app.get('/api/student/:id', async (req, res) => {
  const { id } = req.params; // Extract the id from the request params
  try {
    // Find the student by ID in the database
    const student = await studentModel.findById(id);
    
    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }

    // Send the student name as a response
    res.status(200).json({ name: student.name,
email:student.email,
contact:student.contact
     });
  } catch (error) {
    console.error('Error fetching student:', error);
    res.status(500).json({ error: 'Error fetching student' });
  }
});




app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});6
