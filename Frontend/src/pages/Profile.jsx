import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom';
import axios from "axios"
import { set } from 'mongoose'
const Profile = () => {
  console.log("hello profile")
  const location = useLocation();
  const { id } = location.state; 
  console.log(id);
//const userId = localStorage.getItem('userId') || location?.state?.id;
  const [studentName, setStudentName] = useState('');
  const [studentEmail, setStudentEmail] = useState('');
  const [studentContact, setStudentContact] = useState('');
  const [profile,setProfile]=useState({
    Bio: "",
    github: "",
    instagram: "",
    linkedin: "",
    twitter: "",
    leetcode: "",
    projects: "",
    skills: ""
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
    fetchStudentName(); // Fetch student name on component load
  }, [id]);



  const handleSave=()=>{
    axios.post("http://localhost:20000/Profile",profile)
    .then(result=>console.log(result))
    .catch(err=>console.log(err))
  }
const handleChange=(e)=>{
  const { name, value } = e.target;
  setProfile((prevProfile) => ({ ...prevProfile, [name]: value }));
}

  return (
    <>
     <div className='profile-container  p-5 bg-zinc-700 flex'>
 
        <div className=' left-profile bg-red-500 p-3 mt-10'>
        <h4 className="student-name">
    {studentName ? `Welcome ${studentName}` : "Loading..."}
  </h4>
        <img className='mt-5 p-5' src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR9SRRmhH4X5N2e4QalcoxVbzYsD44C-sQv-w&s" alt="" />
        {/* <h1 className="student-name">Student's name</h1> */}
  <div className='flex flex-col gap-3'>
  <input type="email" className="input-links bg-zinc-500" value={studentEmail}  placeholder="kiit mail" />

  <input  className="input-links  bg-zinc-500" type="text" placeholder='location' />
  <input type="tel" className="input-links  bg-zinc-500" value={studentContact} placeholder="Contact" />
    
        <input type="text" className="input-links  bg-zinc-500" placeholder='branch'/>
        <input type="text" className="input-links  bg-zinc-500" placeholder='selectYear' />
  </div>
        </div>
        <div className='bg-zinc-500  border-2 rounded-md outline-none w-full right-profile-info p-5'>
            <h1 className='text-3xl text-start mb-3' >write short bio</h1>
            <textarea className='outline- bg-zinc-700 w-full border-2 rounded-md' onChange={handleChange} name="Bio" value={profile.Bio} id=""></textarea>
            <h1 className='text-2xl text-start mt-3  mb-2'>Social media links</h1>

            <div className='border-blue-300 flex flex-row  bg-zinc-700 p-5 border-2 rounded-md outline-none'>
              
<div className='space-y-5 ml-20'>
<input placeholder='Github Link' className="input-links  bg-zinc-500" type="url" name="github" onChange={handleChange} value={profile.github} />
            <input placeholder=" Linkedin Link" className="input-links  bg-zinc-500" type="url" name="linkedin" onChange={handleChange} value={profile.linkedin} />
            <input placeholder=" leetcode Link" className="input-links  bg-zinc-500" onChange={handleChange} type="url" name="leetcode" value={profile.leetcode}/>  
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
                <textarea  onChange={handleChange} className='bg-zinc-600 outline-none w-full border-2 rounded-md' name="skills" value={profile.skills}  id=""></textarea>
            </div>


        </div>
     </div>
     <div className='flex justify-center mt-5'>
    <button type="button" onClick={handleSave} className='text-center px-5 py-2 bg-blue-500 rounded-lg'>Save</button>
    </div>
    </>
  )
}

export default Profile
