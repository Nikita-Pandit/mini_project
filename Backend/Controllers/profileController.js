
// const studentMoreInfo= require("../models/studentMoreInfo");

// const createProfileInfo = async (req, res) => {
//   console.log("Request Body:", req.body);
// //console.log("Uploaded File:", req.file)
// const {id}=req.params;
//   const {name,Bio, github,linkedin,leetcode,twitter,instagram,projects,skills,location,branch,selectYear,domain}=req.body
//   try {
//       // let image_filename = req.file ? req.file.filename : null;
//       //  let image_filename = `${req.file.filename}`
// // const image_filename = req.file ? `/uploads/${req.file.filename}` : null;
// // if (!image_filename) {
// //     return res.status(400).json({ success: false, message: "Image upload failed" });
// // }

//       const profile = new studentMoreInfo({
//         name,
//     Bio,
//     github,
//     instagram,
//     linkedin,
//     twitter,
//     leetcode,
//     projects ,
//     skills,
//     // domain:req.body.domain || [],
//     domain,
//     location,
//     branch,
//     selectYear,
//     // image:  `/uploads/${image_filename}`,
//     // image: image_filename,
//     studentID:id
//     })

//     await profile.save();
//     console.log(profile)
//   res.json({success:true,message:"Profile info saved in the db successfully.",profile})
//   } catch (error) {
//     console.error("Error in saving profile in the database:", error.message);
//       res.json({ success: false, message: "Error" })
//   }
// }



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

const studentMoreInfo= require("../models/studentMoreInfo");
const getProfileInfo = async (req, res) => {
  const { id } = req.params;
  try {
    const moreInfo = await studentMoreInfo.findOne({ studentID: id });
    console.log("Before moreInfo", moreInfo);
    if (!moreInfo) {
      return res.status(404).json({ success: false, message: "Profile info not matched from the database." });
    }

    // if (!moreInfo.image) {
    //   moreInfo.image = "/uploads/default_image.jpg";
    // }

    // Convert domain to array if it's a string
    // if (typeof moreInfo.domain === "string") {
    //   moreInfo.domain = moreInfo.domain.split(",").map((item) => item.trim());
    // }
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





const createProfileInfo = async (req, res) => {
  let profile
  console.log("Request Body:", req.body);
//console.log("Uploaded File:", req.file)
const {id}=req.params;
  const {name,Bio, github,linkedin,leetcode,twitter,instagram,projects,skills,location,branch,selectYear,domain,image}=req.body
  try {
    const matchID=await studentMoreInfo.findOne({ studentID:id})
    if(matchID){
  const updated=    await studentMoreInfo.findOneAndUpdate(
        { studentID:id},
        {name,Bio, github,linkedin,leetcode,twitter,instagram,projects,skills,location,branch,selectYear,domain,image}
          )
    }
    
    else{
      profile = new studentMoreInfo({
        name,
    Bio,
    github,
    instagram,
    linkedin,
    twitter,
    leetcode,
    projects ,
    skills,
    domain: Array.isArray(domain) ? domain : [],
    location,
    branch,
    selectYear,
    studentID:id,
    image
    })
    await profile.save();
    }

    // await profile.save();
    console.log("After Saving",profile)
  res.json({success:true,message:"Profile info saved in the db successfully.",profile})
  } catch (error) {
    console.error("Error in saving profile in the database:", error.message);
      res.json({ success: false, message: "Error" })
  }
}

const getProfileImage=async(req,res)=>{
try{
  const {id}=req.params
const imagePath = `/uploads/${req.file.filename}`;
await studentMoreInfo.findOneAndUpdate({ studentID: id }, { image: imagePath });
  res.json({ success: true, image: imagePath })
}
catch(error){
res.status(500).json({ success: false, message: "Error uploading image.", error: error.message });
}
}

module.exports={createProfileInfo,getProfileInfo,getProfileImage} 