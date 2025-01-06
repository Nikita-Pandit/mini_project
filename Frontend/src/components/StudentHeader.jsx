import React from 'react'
 import { Link } from 'react-router-dom';
 import axios from "axios"
 import { useNavigate } from 'react-router-dom'
const StudentHeader = () => {
const navigate=useNavigate()
  const handleLogout = async (e) => {
    e.preventDefault(); // Prevent the default behavior of the link
    try {
      //await axios.post('http://localhost:20000/api/Logout', { userId: localStorage.getItem('userId') });
      localStorage.removeItem('userId');
      // navigate('/SignUp', { replace: true }); // Redirecting to SignUp page for now
      navigate('/SignUp');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };


  return (
    <>
      <div className='mb-3'>
        <div className='nav'>
            <div>ABC</div>
            <div >
            <ul className=' flex gap-4 items-end'>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/Profile">Profile</Link></li>
                <li><Link to="/Projects">Projects</Link></li>
               <li><Link to="/SignUp">Sign Up</Link></li>
                <li><Link to="/ResearchDoubts">Research Doubts</Link></li>
                <li>
                <a href="/" onClick={handleLogout} style={{ cursor: 'pointer', color: 'red' }}>
                  Log out
                </a>
              </li>
            </ul>
            </div>
        </div>
      </div>
    </>
  )
}

export default StudentHeader
