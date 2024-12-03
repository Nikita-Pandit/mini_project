// CORS (Cross-Origin Resource Sharing) enables your backend server to handle requests from different origins (e.g., your React app running on localhost:5173 making requests to the backend on localhost:5000). Without it, browsers block such requests for security reasons.
const express=require("express")
const app=express()

const path=require("path")
const cookieParser=require("cookie-parser")
app.use(cookieParser())

const bcrypt=require("bcrypt")
const jwt=require("jsonwebtoken")
app.set("view engine","ejs")
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(express.static(path.join(__dirname,"public")));

const cors = require('cors'); // To allow cross-origin requests
const PORT = 5000;

// Middleware
app.use(cors());

// Routes
/*app.post('/signup', (req, res) => {
  const { username, password } = req.body;
  if (username && password) {
    // Simulate storing in the database
    return res.status(200).json({ message: 'Sign up successful', username });
  }
  res.status(400).json({ message: 'Invalid data' });
});*/

app.get("/",(req,res)=>{
    res.send("Hello")
})

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
