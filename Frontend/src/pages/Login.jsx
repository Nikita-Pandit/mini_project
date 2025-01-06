import React, {useState} from 'react'
import axios from "axios"
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom'
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const Login = () => {
  const[email,setEmail]=useState("")
  const[password,setPassword]=useState("")

  const navigate = useNavigate()
  const handleSubmit=async (e)=>{
e.preventDefault()
    try {
    const response = await axios.post('http://localhost:20000/api/Login',{email,password});
    console.log(response.data)
    console.log(response.data.userMoreDetails)
    console.log(response.data.message)
    if(response.data.message==="Login Successful"){
      navigate("/Home")
    }
  }
   catch (error) {
      console.error('Error sending verification email:', error);
     toast.error('Login Unsuccessful',{  className: 'custom-toast'});
  }
  }


  return (
    <>
      <ToastContainer />
    <div className='flex form-container items-center justify-center'>
      <div className='border-2 bg-zinc-700 rounded-md p-5 border-blue-300'>
      <form onSubmit={handleSubmit} action="" className='form p-5 flex  items-center justify-center flex-col space-y-4'>
      <h1 className='text-3xl'>Log in</h1>
      <input className="input-field bg-zinc-500 p-3 " type="email" name="email"    onChange={(e)=>setEmail(e.target.value)} placeholder='Kiit mail id' /> 
         <input className="input-field bg-zinc-500 p-3 " type="password" name="password"  onChange={(e)=>setPassword(e.target.value)} required placeholder='Enter your password....' /> 
        <input className="px-5 py-2 bg-blue-500 rounded-lg  " type="submit" value="Login"/>
      </form>
      <p className='text-center mt-5'>Don't have an account?<span className='text-blue-500'><Link to="/SignUp">&nbsp;SignUp</Link></span></p>
      </div>
    </div>
    </>
  )
}

export default Login
