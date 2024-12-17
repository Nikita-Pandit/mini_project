import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom';
import axios from "axios"
import { set } from 'mongoose'
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {assets,url} from '../assets/assets'
const Profile = () => {
  console.log("hello profile")
  const location = useLocation();
 const  id = location?.state?.id || localStorage.getItem('userId') || "defaultID"
       
  localStorage.setItem('userId', id);                                                                                                                                                                                                                                     
  console.log(id);

  const [studentName, setStudentName] = useState('');
  const [studentEmail, setStudentEmail] = useState('');
  const [studentContact, setStudentContact] = useState('');
  const [image,setImage]=useState(false)
  //const userProfile = JSON.parse(localStorage.getItem('userProfile'))
  const [profile,setProfile]=useState({
    // Bio:userProfile.Bio || "",
    // github: userProfile.github || "",
    // instagram: userProfile.instagram || "",
    // linkedin: userProfile.linkedin || "",
    // twitter: userProfile.twitter || "",
    // leetcode: userProfile.leetcode || "",
    // projects: userProfile.projects || "",
    // skills: userProfile.skills || "",
    // location:userProfile.location || "",
    // branch:userProfile.branch || "",
    // selectYear:userProfile.selectYear || ""
    Bio:"",
    github: "",
    instagram: "",
    linkedin: "",
    twitter: "",
    leetcode: "",
    projects:  "",
    skills: "",
    location:"",
    branch:"",
    selectYear:"",
  })


  const fetchStudentName = async () => {
    try {
      const response = await axios.get(`http://localhost:20000/api/student/${id}`);
      setStudentName(response.data.name);
      setStudentEmail(response.data.email);
      setStudentContact(response.data.contact);
      console.log(studentEmail) // Update student name from API response
    } catch (error) {
      console.error('Error fetching student name:', error);
    }
  };


  useEffect(() => {
    fetchStudentName();
   //fetchProfileInfo(); // Fetch student name on component load
  }, [id]);


  const handleSave=async (e)=>{
e.preventDefault()
if(!image){
  toast.error("Image not selected")
  return null;
}
const formData=new FormData()
console.log(typeof(formData))
Object.keys(profile).forEach((key)=>{
  formData.append(key,profile[key])
})
formData.append("image",image)
//localStorage.setItem('userProfile',JSON.stringify(profile))
console.log("Middle ware")
    try {
      const response = await axios.post('http://localhost:20000/api/Profile',formData,{
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });
    console.log("Profile saved:", response.data);
    toast.success('profile info completed ', {
      style: { color: "#ff5722" } 
     
    });
// const uploadedImageUrl=`http://localhost:20000/uploads/${response.data.filename}`
//     setImage(uploadedImageUrl)
setImage(false)
  } 
  catch (error) {
    console.error("Error saving profile:", error);
     toast.error("Failed to save profile",{
      style: { color: "#ff5722" } 
    });
  }
  }

const handleChange=(e)=>{
  const { name, value } = e.target;
  setProfile((prevProfile) => ({ ...prevProfile, [name]: value }));
}

  return (
    <>
      <form onSubmit={handleSave} >
      <ToastContainer />
     <div className='profile-container  p-5 bg-zinc-700 flex'>
 
        <div className=' left-profile  p-3 mt-10'>
        <h4 className="student-name">
    {studentName ? `Welcome ${studentName}` : "Loading..."}
  </h4>
   <input type="file" accept='image/*' id="image" hidden onChange={(e)=>{setImage(e.target.files[0]); e.target.value=''}}/> 
 <label htmlFor="image">
                        <img src={!image ? assets.upload_area : URL.createObjectURL(image)} alt="Uploaded Profile" />
                    </label>
  <div className='flex flex-col gap-3'>
  <input type="email" className="input-links bg-zinc-500" value={studentEmail}  placeholder="kiit mail" />

  <input  className="input-links  bg-zinc-500" type="text"  placeholder='location' onChange={handleChange} required name="location" value={profile.location} />
  <input type="tel" className="input-links  bg-zinc-500" value={studentContact} placeholder="Contact" />
    
        <input type="text" className="input-links  bg-zinc-500" placeholder='branch' onChange={handleChange} required name="branch" value={profile.branch}/>
        <input type="text" className="input-links  bg-zinc-500" placeholder='selectYear' onChange={handleChange} required name="selectYear" value={profile.selectYear} />
  </div>
        </div>
        <div className='bg-zinc-500  border-2 rounded-md outline-none w-full right-profile-info p-5'>
            <h1 className='text-3xl text-start mb-3' >write short bio</h1>
            <textarea className='outline- bg-zinc-700 w-full border-2 rounded-md' onChange={handleChange} name="Bio" value={profile.Bio} required id=""></textarea>
            <h1 className='text-2xl text-start mt-3  mb-2'>Social media links</h1>

            <div className='border-blue-300 flex flex-row  bg-zinc-700 p-5 border-2 rounded-md outline-none'>
              
<div className='space-y-5 ml-20'>
<input placeholder='Github Link' className="input-links  bg-zinc-500"  name="github" onChange={handleChange} value={profile.github} />
            <input placeholder=" Linkedin Link" className="input-links  bg-zinc-500" name="linkedin" onChange={handleChange} value={profile.linkedin} />
            <input placeholder=" leetcode Link" className="input-links  bg-zinc-500" onChange={handleChange} name="leetcode" value={profile.leetcode}/>  
</div>

           <div className='space-y-5 me-20'>
           <input placeholder="Instagram Link" onChange={handleChange} className="bg-zinc-500 input-links" type="url" name="instagram"  value={profile.instagram} />
           <input placeholder="Twitter Link" onChange={handleChange} className="bg-zinc-500 input-links" type="url" name="twitter"  value={profile.twitter}/>
           </div>
            </div>

            <div>
                <h1 className='text-2xl text-start mt-3  mb-2'>Ongoing Projects</h1>
                <textarea  className='outline-none bg-zinc-700 w-full border-2 rounded-md' onChange={handleChange} name="projects" value={profile.projects} id=""></textarea>
            </div>
    
            <h1 className='text-2xl text-start mt-3  mb-2'>Skills</h1>
            <div>
                <textarea  onChange={handleChange} className='bg-zinc-600 outline-none w-full border-2 rounded-md' name="skills" value={profile.skills}  required id=""></textarea>
            </div>


        </div>
     </div>
     <div className='flex justify-center mt-5'>
    <button type="submit"  className='text-center px-5 py-2 bg-blue-500 rounded-lg'>Save</button>
    </div>
      </form>
    </>
  )
}

export default Profile
