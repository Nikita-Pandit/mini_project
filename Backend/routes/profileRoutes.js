const {profileController}=require("../Controllers/profileController")
const express=require("express")
const multer=require("multer")
const router=express.Router();
const path = require("path");
//IMAGE STORAGE ENGINE
const fs = require("fs");
// Ensure uploads directory exists
const uploadDir = path.join(__dirname, '../uploads');
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir);
}
const storage = multer.diskStorage({
   // destination: 'uploads',
   destination: (req, file, cb) => {
    cb(null, 'uploads/');
},
    filename: (req, file, cb) => {
         cb(null,`${Date.now()}-${file.originalname}`);
    }
})
const upload = multer({ storage: storage,fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith("image/")) {
        cb(null, true);
    } else {
        cb(new Error("Only image files are allowed"), false);
    }
},})
router.post("/Profile",upload.single('image'),profileController);

module.exports=router