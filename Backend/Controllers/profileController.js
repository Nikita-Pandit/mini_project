
const { JsonWebTokenError } = require("jsonwebtoken");
const studentMoreInfo= require("../models/studentMoreInfo");
const { get } = require("mongoose");
const createProfileInfo = async (req, res) => {
  console.log("Request Body:", req.body);
console.log("Uploaded File:", req.file)
const {id}=req.params;
  const {name,Bio, github,linkedin,leetcode,twitter,instagram,projects,skills,location,branch,selectYear,domain}=req.body
  try {
      let image_filename = req.file ? req.file.filename : null;
if (!image_filename) {
    return res.status(400).json({ success: false, message: "Image upload failed" });
}

      const profile = new studentMoreInfo({
        name,
    Bio,
    github,
    instagram,
    linkedin,
    twitter,
    leetcode,
    projects ,
    skills,
    // domain:req.body.domain || [],
    domain,
    location,
    branch,
    selectYear,
    image:  `/uploads/${image_filename}`,
    studentID:id
    })

    await profile.save();
    console.log(profile)
  res.json({success:true,message:"Profile info saved in the db successfully."})
  } catch (error) {
    console.error("Error in saving profile in the database:", error.message);
      res.json({ success: false, message: "Error" })
  }
}



// const getProfileInfo=async (req,res)=>{
// const {id}=req.params;
// try{
//   const moreInfo= await studentMoreInfo.findOne({studentID:id})
// console.log("Before",moreInfo)
//   if(!moreInfo){
//     return res.status(404).json({ success: false, message: "Profile info not matched from the database." });
//   }
//   // Convert domain to array if it's a string
//   if (typeof moreInfo.domain === "string") {
//     moreInfo.domain = moreInfo.domain.split(",").map((item) => item.trim());
//   }
//   console.log("After",moreInfo)
//   res.status(200).json({ success: true, moreInfo});
// }
// catch(error){
//   console.error("Error in getProfileInfo:", error.message);
//   res.status(500).json({ success: false, message: "An error occurred while fetching the profile info from the db.", error: error.message });
// }
// }
const getProfileInfo = async (req, res) => {
  const { id } = req.params;
  try {
    const moreInfo = await studentMoreInfo.findOne({ studentID: id });
    console.log("Before", moreInfo);
    if (!moreInfo) {
      return res.status(404).json({ success: false, message: "Profile info not matched from the database." });
    }
    // Convert domain to array if it's a string
    if (typeof moreInfo.domain === "string") {
      moreInfo.domain = moreInfo.domain.split(",").map((item) => item.trim());
    }
    console.log("After", moreInfo);
    res.status(200).json({ success: true, moreInfo });
  } catch (error) {
    console.error("Error in getProfileInfo:", error.message);
    res.status(500).json({
      success: false,
      message: "An error occurred while fetching the profile info from the db.",
      error: error.message,
    });
  }
};


module.exports={createProfileInfo,getProfileInfo} 