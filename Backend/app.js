const express=require("express")
const app=express()
// const nodemailer = require('nodemailer');
const dotenv=require("dotenv")
const config=dotenv.config()
const studentModel=require("./models/studentModel")
const PORT = process.env.PORT;

const cors=require("cors")
app.use(cors())

const bodyParser = require('body-parser');
app.use(bodyParser.json());

app.use('/uploads', express.static('uploads'));


const jwt = require('jsonwebtoken');
app.use(express.json())


//Routes
const signupRoutes=require("./routes/signupRoutes")
const loginRoutes=require("./routes/loginRoutes")
const profileRoutes=require("./routes/profileRoutes")
const projectRoutes=require("./routes/projectRoutes")
const forgotPasswordRoutes=require("./routes/forgotPasswordRoutes")
const resetPasswordRoutes=require("./routes/resetPasswordRoutes")

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
       return res.redirect(`http://localhost:5173/SignUp?id=${userIDMatchWithToken._id}`);
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
