import React, { useEffect, useState } from 'react'
import axios from "axios"
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Select from "react-select"; // Install via npm install react-select

const Teacherprofile = () => {
  const [isEditing, setIsEditing] = useState(false); // NEW STATE

  const domainOptions = [
    { value: "Web Development", label: "Web Development" },
    { value: "Data Science", label: "Data Science" },
    { value: "Machine Learning", label: "Machine Learning" },
    { value: "App Development", label: "App Development" },
    { value: "UI/UX Design", label: "UI/UX Design" },
  ];
  // const domainOptions = [
  //   {
  //     label: "Web Development",
  //     options: [
  //       { value: "Frontend Development", label: "Frontend Development" },
  //       { value: "Backend Development", label: "Backend Development" },
  //       { value: "Fullstack Development", label: "Fullstack Development" }
  //     ],
  //   },
  //   {
  //     label: "Data Science",
  //     options: [
  //       { value: "Data Analysis", label: "Data Analysis" },
  //       { value: "Data Visualization", label: "Data Visualization" },
  //       { value: "Big Data", label: "Big Data" }
  //     ],
  //   },
  //   {
  //     label: "Machine Learning",
  //     options: [
  //       { value: "Supervised Learning", label: "Supervised Learning" },
  //       { value: "Unsupervised Learning", label: "Unsupervised Learning" },
  //       { value: "Deep Learning", label: "Deep Learning" },
  //     ],
  //   },
  //   {
  //     label: "App Development",
  //     options: [
  //       { value: "Android Development", label: "Android Development" },
  //       { value: "iOS Development", label: "iOS Development" },
  //       { value: "Cross-Platform Development", label: "Cross-Platform Development" },
  //     ],
  //   },
  //   {
  //     label: "UI/UX Design",
  //     options: [
  //       { value: "Wireframing", label: "Wireframing" },
  //       { value: "Prototyping", label: "Prototyping" },
  //       { value: "User Research", label: "User Research" },
  //     ],
  //   },
  // ];
  
  // const handleDomainChange = (selectedOptions) => {
  //   setProfile((prevProfile) => ({
  //     ...prevProfile,
  //     domain: selectedOptions.map((option) => option.value),
  //   }));
  // };

  const handleDomainChange = (selectedOptions) => {
    setProfile((prevProfile) => ({
      ...prevProfile,
      domain: selectedOptions ? selectedOptions.map((option) => option.value) : [],
    }));
  };
  

  const id = localStorage.getItem('userId') || "defaultID";

  const [teacherName, setTeacherName] = useState('');
  const [teacherEmail, setTeacherEmail] = useState('');
  const [teacherContact, setTeacherContact] = useState('');
  const [profile, setProfile] = useState({
    name: "",
    Bio: "",
    github: "",
   
    linkedin: "",
    twitter: "",

    skills: "",
    domain: '',
    location: "",

    image: "/images/default_image.jpg"
  });

  const fetchTeacherName = async () => {
    try {
      const response = await axios.get(`http://localhost:20000/api/teacher/${id}`);
      setTeacherName(response.data.name);
      setTeacherEmail(response.data.email);
      setTeacherContact(response.data.contact);
      setProfile(prevProfile => ({
        ...prevProfile,
        name: response.data.name
      }));
    } catch (error) {
      console.error('Error fetching student name:', error);
    }
  };

  const fetchTeacherProfileInfo = async () => {
    try {
      const response = await axios.get(`http://localhost:20000/api/teacherProfile/${id}`);
      if (response.data.success) {
        const fetchedProfile = response.data.moreInfo;
        setProfile(prevProfile => ({
          ...prevProfile,
          ...fetchedProfile
        }));
      }
    } catch (error) {
      console.error("Error in fetching profile info:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile((prevProfile) => ({ ...prevProfile, [name]: value }));
  };

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`http://localhost:20000/api/teacherProfile/${id}`, profile);
      toast.success('Profile info saved in the database successfully.', {
        style: { color: "#ff5722" }
      });
       // Emit custom event
       const event = new Event("profileUpdated");
       window.dispatchEvent(event); // Dispatch the event globally
      setIsEditing(false); // Exit edit mode after saving
    } catch (error) {
      console.error("Error saving profile info in the database:", error);
      toast.error("Failed to save profile info in the database");
    }
  };

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("image", file);

    try {
      const response = await axios.post(`http://localhost:20000/api/teacherProfile/${id}/uploadImage`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setProfile(prevProfile => ({ ...prevProfile, image: response.data.image }));
      toast.success("Image uploaded successfully!");
    } catch (error) {
      console.error("Error uploading image:", error);
      toast.error("Failed to upload image.");
    }
  };

  const customStyles = {
    control: (base) => ({
      ...base,
      backgroundColor: "#374151",
      color: "#FFFFFF",
      border: "2px solid rgb(80, 158, 179)",
      borderRadius: "10px",
      boxShadow: "none",
      padding: "10px"
    }),
    menu: (base) => ({
      ...base,
      backgroundColor: "#71717A",
      color: "#FFFFFF",
    }),
    option: (base, state) => ({
      ...base,
      backgroundColor: state.isFocused ? "#374151" : "#1F2937",
      color: "#FFFFFF",
      "&:active": {
        backgroundColor: "#4B5563",
      },
    }),
    multiValue: (base) => ({
      ...base,
      backgroundColor: "#71717A",
      color: "#FFFFFF",
      borderRadius: "0.375rem",
    }),
    multiValueLabel: (base) => ({
      ...base,
      color: "#FFFFFF",
    }),
    multiValueRemove: (base) => ({
      ...base,
      color: "#FFFFFF",
      "&:hover": {
        backgroundColor: "#4B5563",
        color: "#FFFFFF",
      },
    }),
  };

  useEffect(() => {
    fetchTeacherName();
    fetchTeacherProfileInfo();
  }, [id]);

  return (
    <>
      <form onSubmit={handleSave}>
        <ToastContainer />
        <div className='profile-container p-5 bg-zinc-700 flex'>
          <div className='left-profile p-3 mt-10'>
            <h4 className="student-name">
              {teacherName ? `Welcome, ${teacherName}` : "Loading..."}
            </h4>
            <div className='flex items-center justify-center mt-3 mb-3'>
  
              <img
  src={profile.image.startsWith("/uploads/")
    ? `http://localhost:20000${profile.image}`
    : `http://localhost:20000/images/default_image.jpg`}
  alt="Profile"
  className="profile-image object-contain rounded-lg"
  onClick={() => isEditing && document.getElementById("imageUpload").click()} // Prevent click if not editing
  style={{ width: "180px", height: "180px", cursor: isEditing ? "pointer" : "default" }}
/>
<input
  type="file"
  id="imageUpload"
  style={{ display: "none" }}
  onChange={handleImageChange}
  disabled={!isEditing} // Disable file input if not in editing mode
/>

            </div>
            <div className='flex flex-col gap-3'>
              <input
                type="email"
                className="input-links bg-zinc-500"
                value={teacherEmail}
                placeholder="KIIT mail"
              />
              <input
                className="input-links bg-zinc-500"
                type="text"
                placeholder='Location'
                onChange={handleChange}
                required
                name="location"
                value={profile.location}
                disabled={!isEditing} // DISABLE BASED ON isEditing
              />
              <input
                type="tel"
                className="input-links bg-zinc-500"
                value={teacherContact}
                placeholder="Contact"
              />
           
            
            </div>
          </div>

          <div className='bg-zinc-500 border-2 rounded-md outline-none w-full right-profile-info p-5'>
            <h1 className='text-3xl text-start mb-3'>Write short bio</h1>
            <textarea
              className='outline-none bg-zinc-700 w-full border-2 rounded-md'
              onChange={handleChange}
              name="Bio"
              value={profile.Bio}
              required
              disabled={!isEditing} // DISABLE BASED ON isEditing
            ></textarea>
            <h1 className='text-2xl text-start mt-3 mb-2'>Social media links</h1>
            <div className='border-blue-300 flex flex-row bg-zinc-700 p-5 border-2 rounded-md outline-none'>
              <div className='space-y-5 ml-20'>
                <input
                  placeholder='Github Link'
                  className="input-links bg-zinc-500"
                  name="github"
                  onChange={handleChange}
                  value={profile.github}
                  disabled={!isEditing} // DISABLE BASED ON isEditing
                />
                <input
                  placeholder="LinkedIn Link"
                  className="input-links bg-zinc-500"
                  name="linkedin"
                  onChange={handleChange}
                  value={profile.linkedin}
                  disabled={!isEditing} // DISABLE BASED ON isEditing
                />
              
              </div>
              <div className='space-y-5 me-20'>
               
                <input
                  placeholder="Twitter Link"
                  onChange={handleChange}
                  className="bg-zinc-500 input-links"
                  name="twitter"
                  value={profile.twitter}
                  disabled={!isEditing} // DISABLE BASED ON isEditing
                />
              </div>
            </div>

            <h1 className='text-2xl text-start mt-3 mb-2'>Skills</h1>
            <div>
              <textarea
                onChange={handleChange}
                className='bg-zinc-700 outline-none w-full border-2 rounded-md'
                name="skills"
                value={profile.skills}
                required
                disabled={!isEditing} // DISABLE BASED ON isEditing
              ></textarea>
            </div>
            <h1 className='text-2xl text-start mt-3 mb-2'>Domain</h1>
            <div>
              <Select
                isMulti
                options={domainOptions}
                value={domainOptions.filter((option) =>
                  profile.domain.includes(option.value)
                )}
                onChange={handleDomainChange}
                styles={customStyles}
                isDisabled={!isEditing} // DISABLE BASED ON isEditing
              /> 

            </div>
          </div>
        </div>
        <div className='flex justify-center mt-5'>
          <button
            type="button"
            className='text-center px-5 py-2 bg-green-500 rounded-lg mr-3'
            onClick={() => setIsEditing(true)} // ENABLE EDIT MODE
          >
            Edit
          </button>
          <button
            type="submit"
            className='text-center px-5 py-2 bg-blue-500 rounded-lg'
            disabled={!isEditing} // DISABLE IF NOT EDITING
          >
            Save
          </button>
        </div>
      </form>
    </>
  );
};

export default Teacherprofile;

