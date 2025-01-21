const express=require("express")
const app=express()
// const nodemailer = require('nodemailer');
const dotenv=require("dotenv")
const config=dotenv.config()
const studentModel=require("./models/studentModel")
const teacherModel=require("./models/teacherModel")
const PORT = process.env.PORT;
const path = require("path");

const cors=require("cors")
app.use(cors())

app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use('/images', express.static(path.join(__dirname, '../Frontend/public/images')));

const bodyParser = require('body-parser');
app.use(bodyParser.json());

app.use('/uploads', express.static('uploads'));


const jwt = require('jsonwebtoken');



//Routes
const signupRoutes=require("./routes/signupRoutes")
const loginRoutes=require("./routes/loginRoutes")
const profileRoutes=require("./routes/profileRoutes")
const projectRoutes=require("./routes/projectRoutes")
const forgotPasswordRoutes=require("./routes/forgotPasswordRoutes")
const resetPasswordRoutes=require("./routes/resetPasswordRoutes")
const teacherProfileRoutes=require("./routes/teacherProfileRoutes")
const mongoose=require("mongoose");

const studentMoreInfo = require("./models/studentMoreInfo");

mongoose.connect(process.env.MONGO_URL)
.then(()=>console.log("MongoDB connected successfully"))
.catch(err => console.error('Error connecting to MongoDB:', err));

app.use("/api",signupRoutes)
app.use("/api",loginRoutes)
app.use("/api",profileRoutes)
app.use("/api",projectRoutes)
app.use("/api",forgotPasswordRoutes)
app.use("/api",resetPasswordRoutes)
app.use("/api",teacherProfileRoutes)

app.get('/verify', async (req, res) => {
  const { token } = req.query;
  const {role}=req.query
  try {
    console.log("verify route 2")
    let userIDMatchWithToke;
    let user;
      // Find the user with the token
      if(role=="student"){
        userIDMatchWithToken =await studentModel.findOne({verificationToken: token})
         user = await studentModel.findOneAndUpdate(
        
          { verificationToken: token },
          { isVerified: true, verificationToken: null },
          { new: true }
      );
      }
    else   { 
      userIDMatchWithToken=await teacherModel.findOne({verificationToken: token})

       user = await teacherModel.findOneAndUpdate(
        
        { verificationToken: token },
        { isVerified: true, verificationToken: null },
        { new: true }
    );
  }

    
      console.log(user)
// await user.save()
      if (!user) {
          return res.status(400).json({ message: 'Invalid or expired token' });
      }

      // res.json({ message: 'Email verified successfully!' });
      return res.redirect(`http://localhost:5173/SignUp?id=${userIDMatchWithToken._id}&role=${role}`);
      // return res.redirect(`http://localhost:5173/Profile`);
  } catch (error) {
      console.error('Error during verification:', error);
      res.status(400).json({ error: 'Verification failed' });
  }
});







app.get('/api/student/:id', async (req, res) => {
  const { id } = req.params; // Extract the id from the request params
  try {
    // Find the student by ID in the database
    const student = await studentModel.findById(id);
    //const moreinfo=await studentMoreInfo
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



app.get('/api/teacher/:teacherId', async (req, res) => {
  const { teacherId } = req.params; // Extract the id from the request params
  try {
    // Find the student by ID in the database
    const teacher = await teacherModel.findById(teacherId);
    //const moreinfo=await studentMoreInfo
    if (!teacher) {
      return res.status(404).json({ message: 'Student not found' });
    }

    // Send the student name as a response
    res.status(200).json({ name: teacher.name,
email:teacher.email,
contact:teacher.contact
     });
  } catch (error) {
    console.error('Error fetching student:', error);
    res.status(500).json({ error: 'Error fetching student' });
  }
});

app.post("/api/Logout", async (req, res) => {
  try {
    const { userId } = req.body;
    if (!userId) {
      return res.status(400).json({ message: "User ID is required for logout" });
    }

    // If using session storage, destroy the session here.
    // If using JWT, you can blacklist the token if needed or rely on expiration.

    console.log(`User with ID ${userId} has logged out.`);

    // Respond with a success message
    res.status(200).json({ message: "Logout successful" });
  } catch (error) {
    console.error("Error during logout:", error);
    res.status(500).json({ message: "Logout failed due to server error" });
  }
});



app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
