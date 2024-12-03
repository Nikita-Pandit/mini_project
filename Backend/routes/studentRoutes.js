const express=require("express")
const router=express.Router();

// router.post('/', async (req, res) => {
//     try {
//       const { name, email, contact, branch, currentYear} = req.body;
//       const newUser = new User({ name, email, password });
//       await newUser.save();
//       res.status(201).json({ message: 'User created successfully', user: newUser });
//     } catch (err) {
//       res.status(400).json({ message: 'Error creating user', error: err.message });
//     }
//   }); 

router.get("/",(req,res)=>{
    res.send("Hello students looooo")
})
module.exports=router;