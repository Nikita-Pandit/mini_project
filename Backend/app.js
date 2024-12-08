const express=require("express")
const app=express()
const cors=require("cors")
app.use(cors())
app.use(express.json())
const mongoose=require("mongoose")
const studentModel=require("./models/studentModel")

PORT=3000

mongoose.connect("mongodb+srv://22054434:nikitapandi@cluster2.nj73n.mongodb.net/mini_project?retryWrites=true&w=majority&appName=Cluster2")

app.post("/SignUp",(req,res)=>{
  console.log("Received data:", req.body);
studentModel.create(req.body)
.then(student=>res.json(student))
.catch(err=>console.log(err))
})




app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
