import React from 'react'

const Profile = () => {
  return (
    <>
     <div className='profile-container p-5 bg-zinc-700 flex'>
        <div className=' left-profile  p-3'>
        <img className='mt-5 p-5' src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR9SRRmhH4X5N2e4QalcoxVbzYsD44C-sQv-w&s" alt="" />
        <h1 className="student-name">Nikita Pandit</h1>
        <h1>Nepal</h1>
        <h1>Contact: 8797296088</h1>
        
        </div>
        <div className='bg-zinc-500  border-2 rounded-md outline-none w-full right-profile-info p-5'>
            <h1 className='text-3xl text-start mb-3'>write short bio</h1>
            <textarea className='outline-none w-full border-2 rounded-md' name="" id=""></textarea>
            <h1 className='text-2xl text-start mt-3  mb-2'>Social media links</h1>

            <div className='border-blue-300 flex flex-row  bg-zinc-700 p-5 border-2 rounded-md outline-none'>
              
<div className='space-y-5 ml-20'>
<input placeholder='Github Link' className="input-links  bg-zinc-500" type="text " />
            <input placeholder=" Linkedin Link" className="input-links  bg-zinc-500" type="text" />
            <input placeholder=" leetcode Link" className="input-links  bg-zinc-500" type="text" />
</div>

           <div className='space-y-5 me-20'>
           <input placeholder="Instagram Link" className="bg-zinc-500 input-links" type="text" />
           <input placeholder="Twitter Link" className="bg-zinc-500 input-links" type="text" />
           </div>
            </div>

            <div>
                <h1 className='text-2xl text-start mt-3  mb-2'>Ongoing Projects</h1>
                <textarea  className='outline-none w-full border-2 rounded-md' name="" id=""></textarea>
            </div>
    
            <h1 className='text-2xl text-start mt-3  mb-2'>Skills</h1>
            <div>
                <textarea  className='bg-zinc-600 outline-none w-full border-2 rounded-md' name="" id=""></textarea>
            </div>


        </div>
     </div>
    </>
  )
}

export default Profile
