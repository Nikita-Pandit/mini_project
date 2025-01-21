
const teacherMoreInfo= require("../models/teacherMoreInfo");
const getTeacherProfileInfo = async (req, res) => {
  const { teacherId} = req.params;
  try {
    console.log(teacherId)
        const moreInfo = await teacherMoreInfo.findOne({ teacherID: teacherId});
    console.log("Before moreInfo", moreInfo);
    if (!moreInfo) {
      return res.status(404).json({ success: false, message: "Profile info not matched from the database." });
    }
    console.log("After", moreInfo);
    res.status(200).json({ success: true, moreInfo });
  } catch (error) {
    console.error("Error in getTeacherProfileInfo:", error.message);
    res.status(500).json({
      success: false,
      message: "An error occurred while fetching the profile info from the db.",
      error: error.message,
    });
  }
};





const createTeacherProfileInfo = async (req, res) => {
  console.log("Request Body:", req.body);
//console.log("Uploaded File:", req.file)
const {teacherId}=req.params;
  const {name,Bio, github,linkedin,twitter,location,domain,image}=req.body
  try {
      const profile = new teacherMoreInfo({
        name,
    Bio,
    github,
    linkedin,
    twitter,
    domain: Array.isArray(domain) ? domain : [],
    location,

    teacherID:teacherId,
    image
    })

    await profile.save();
    console.log("After Saving",profile)
  res.json({success:true,message:"Profile info saved in the db successfully.",profile})
  } catch (error) {
    console.error("Error in saving profile in the database:", error.message);
      res.json({ success: false, message: "Error" })
  }
}


const getTeacherProfileImage=async(req,res)=>{
try{
  const {teacherId}=req.params
const imagePath = `/uploads/${req.file.filename}`;
await teacherMoreInfo.findOneAndUpdate({ teacherID: teacherId }, { image: imagePath });
  res.json({ success: true, image: imagePath })
}
catch(error){
res.status(500).json({ success: false, message: "Error uploading image.", error: error.message });
}
}

module.exports={createTeacherProfileInfo,getTeacherProfileInfo,getTeacherProfileImage} 