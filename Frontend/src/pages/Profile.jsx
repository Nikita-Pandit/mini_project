import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom';
import axios from "axios"
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
  const [profile,setProfile]=useState({
    name:"",
    Bio:"",
    github: "",
    instagram: "",
    linkedin: "",
    twitter: "",
    leetcode: "",
    projects:  "",
    skills: "",
    domain:[],
    location:"",
    branch:"",
    selectYear:"",
  })
  const domainOptions = ["ML", "App Dev", "Web Dev", "Cyber Security"];


  const fetchStudentName = async () => {
    try {
      const response = await axios.get(`http://localhost:20000/api/student/${id}`);
      setStudentName(response.data.name);
      setStudentEmail(response.data.email);
      setStudentContact(response.data.contact);
      console.log(studentEmail)
      setProfile(prevProfile => ({
        ...prevProfile,
        name: response.data.name
      }));
      
    } 
    catch (error) {
      console.error('Error fetching student name:', error);
    }
  };

  // const fetchProfileInfo=async()=>{
  //   console.log("profile section")
  //   try{
  //     const response=await axios.get(`http://localhost:20000/api/Profile/${id}`)
  //     const fetchedProfile=response.data.moreInfo
  //     if (typeof fetchedProfile.domain === "string") {
  //       fetchedProfile.domain = fetchedProfile.domain.split(",").map((item) => item.trim());
  //     }
  //     console.log(response.data.moreInfo)
  //     console.log(fetchedProfile)
  //       // setProfile(response.data.moreInfo);   
  //    setProfile(prevProfile => ({
  //     ...prevProfile,
  //     ...fetchedProfile
  //   }));   
  //   }
  //   catch (error) {
  //     console.error("Error in fetching profile info:", error);
  //   }
  // }
  const fetchProfileInfo = async () => {
    console.log("profile section");
    try {
      const response = await axios.get(`http://localhost:20000/api/Profile/${id}`);
      const fetchedProfile = response.data.moreInfo;
      console.log("Domain",fetchedProfile.domain)
      console.log("Type",typeof(fetchedProfile.domain))
      // Ensure domain is an array
      if (typeof fetchedProfile.domain === "string") {
      console.log("split",fetchedProfile.domain.split(","))
        fetchedProfile.domain = fetchedProfile.domain.split(",").map((item) => item.trim());
      }
  
      console.log(fetchedProfile);
      setProfile((prevProfile) => ({
        ...prevProfile,
        ...fetchedProfile,
      }));
    } catch (error) {
      console.error("Error in fetching profile info:", error);
    }
  };
  
  useEffect(() => {
    fetchStudentName();
    fetchProfileInfo(); // Always fetch profile info
  }, [id]);
  

  const handleDomainSelect = (e) => {
    const selectedDomain = e.target.value;
    if (selectedDomain && !profile.domain.includes(selectedDomain)) {
      setProfile((prevProfile) => ({
        ...prevProfile,
        domain: [...prevProfile.domain, selectedDomain],
      }));
    }
  };
  const removeDomain = (domainToRemove) => {
    setProfile((prevProfile) => ({
      ...prevProfile,
      domain: prevProfile.domain.filter((domain) => domain !== domainToRemove),
    }));
  };
  const handleSave=async (e)=>{
    
e.preventDefault()
if(!image){
  toast.error("Image not selected")
  return null;
}
const formData=new FormData()
Object.keys(profile).forEach((key)=>{
  formData.append(key,profile[key])
})

formData.append("image",image)
    try {
      const response = await axios.post(`http://localhost:20000/api/Profile/${id}`,formData,
      {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    }
  );
  console.log(response.data.profile)
  
    toast.success('profile info saved in the database successfully.', {
      style: { color: "#ff5722" } 
     
    });

  } 
  catch (error) {
    console.error("Error saving profile info in the database:", error);
    const customTextColor = "#0000FF"; 
     toast.error("Failed to save profile info in the database",{
      style: customTextColor,
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
                        {/* <img src={typeof image === 'string' ? assets.upload_area: image && URL.createObjectURL(image)} alt="Uploaded Profile" /> */}
          
                    </label>
  <div className='flex flex-col gap-3'>
  <input type="email"    className="input-links bg-zinc-500" value={studentEmail}  placeholder="kiit mail" />

  <input  className="input-links  bg-zinc-500" type="text"  placeholder='location' onChange={handleChange} required name="location" value={profile.location} />
  <input type="tel" className="input-links  bg-zinc-500" value={studentContact} placeholder="Contact" />
    


        <input type="text" className="input-links  bg-zinc-500" placeholder='branch' onChange={handleChange} required name="branch" value={profile.branch}/>
        {/* <input type="text" className="input-links  bg-zinc-500" placeholder='selectYear' onChange={handleChange} required name="selectYear" value={profile.selectYear} /> */}
      <select value={profile.selectYear} onChange={handleChange}  name="selectYear" id="year" required className="input-links  bg-zinc-500">
        <option value="">selectYear</option>
        <option value="1st year">
         1st year
         </option>
         <option value="2nd year">
         2nd year
         </option>
         <option value="3rd year">
         3rd year
         </option>
         <option value="4th year">
            4th year
            </option>
      </select>
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
           <input placeholder="Instagram Link" onChange={handleChange} className="bg-zinc-500 input-links"  name="instagram"  value={profile.instagram} />
           <input placeholder="Twitter Link" onChange={handleChange} className="bg-zinc-500 input-links"  name="twitter"  value={profile.twitter}/>
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

            <h1 className='text-2xl text-start mt-3  mb-2'>Domain</h1>
            {/* <div>
                <textarea  onChange={handleChange} className='bg-zinc-600 outline-none w-full border-2 rounded-md' name="domain" value={profile.domain}  required id=""></textarea>
            </div> */}
             {/* <div>
            <select
              className="bg-zinc-600 outline-none w-full border-2 rounded-md"
              onChange={handleDomainSelect}
            >
              <option value="">Select Domain</option>
              {domainOptions.map((domain) => (
                <option key={domain} value={domain}>
                  {domain}
                </option>
              ))}
            </select>
            <div className="flex flex-wrap mt-2">
              {profile.domain.map((domain, index) => (
                <div
                  key={index}
                  className="bg-blue-500 text-white px-3 py-1 rounded-full flex items-center gap-2 mr-2 mt-2"
                >
                  <span>{domain}</span>
                  <button
                    type="button"
                    onClick={() => removeDomain(domain)}
                    className="text-white bg-red-500 px-1 rounded-full"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
            <div className="flex flex-wrap mt-2">
  {profile.domain.map((domain, index) => (
    <div
      key={index}
      className="bg-blue-500 text-white px-3 py-1 rounded-full flex items-center gap-2 mr-2 mt-2"
    >
      <span>{domain}</span>
      <button
        type="button"
        onClick={() => removeDomain(domain)}
        className="text-white bg-red-500 px-1 rounded-full"
      >
        ×
      </button>
    </div>
  ))}
</div>

          </div> */}
         
         <div>
  <select
    className="bg-zinc-600 outline-none w-full border-2 rounded-md"
    onChange={handleDomainSelect}
  >
    <option value="">Select Domain</option>
    {domainOptions.map((domain) => (
      <option key={domain} value={domain}>
        {domain}
      </option>
    ))}
  </select>
  <div className="flex flex-wrap mt-2">
    {profile.domain.map((domain, index) => (
      <div
        key={index}
        className="bg-blue-500 text-white px-3 py-1 rounded-full flex items-center gap-2 mr-2 mt-2"
      >
        <span>{domain}</span>
        <button
          type="button"
          onClick={() => removeDomain(domain)}
          className="text-white bg-red-500 px-1 rounded-full"
        >
          ×
        </button>
      </div>
    ))}
  </div>
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