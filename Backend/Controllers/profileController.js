
const { JsonWebTokenError } = require("jsonwebtoken");
const studentMoreInfo= require("../models/studentMoreInfo")
const profileController = async (req, res) => {
    console.log("Request Body:", req.body);
console.log("Uploaded File:", req.file)
const {email}=req.query
  const {Bio, github,linkedin,leetcode,twitter,instagram,projects,skills,location,branch,selectYear}=req.body
  try {
      // let image_filename = `${req.file.filename}`
      let image_filename = req.file ? req.file.filename : null;
if (!image_filename) {
    return res.status(400).json({ success: false, message: "Image upload failed" });
}
      const profile = new studentMoreInfo({
    Bio,
    github,
    instagram,
    linkedin,
    twitter,
    leetcode,
    projects ,
    skills,
    location,
    branch,
    selectYear,
    image: image_filename
    })

    await profile.save();

const moreInfo= await studentMoreInfo.findOne({email:email})
if(!moreInfo){
  console.log("profile email not matched")
}
    res.status(200).json({moreInfo:JSON.stringify(moreInfo)});

      res.status(200).json({ success: true, message: "Image uploaded"})
  } catch (error) {
    console.error("Error in profileController:", error.message);
      res.json({ success: false, message: "Error" })
  }
}
module.exports={profileController} 