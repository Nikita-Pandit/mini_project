import React ,{useState} from 'react'
import axios from "axios"
import { Link } from 'react-router-dom'
// import { useNavigate } from 'react-router-dom'
const SignUp = () => {
  const[name,setName]=useState("")
  const[email,setEmail]=useState("")
  const[contact,setContact]=useState("")
const[branch,setBranch]=useState("")
const[currentYear,setCurrentYear]=useState("")

 const handleSubmit=(e)=>{
  e.preventDefault()
  axios.post("http://localhost:3000/SignUp",{name,email,contact,branch,currentYear})
  .then(result=>(
    console.log(result)
    // Navigate("/home")
  ))
  .catch(err=>console.log(err))
 }

  return (
    <>
    <div className='flex form-container items-center justify-center'>
      <div className='border-2 bg-zinc-700 rounded-md p-5 border-blue-300'>
      <form onSubmit={handleSubmit} action="" className='form flex  items-center justify-center flex-col space-y-4'>
        <input  className="input-field bg-zinc-500 p-3" type="text" name="name" onChange={(e)=>setName(e.target.value)} placeholder='Name' /> 
        <input className="input-field bg-zinc-500 p-3 " type="email" name="email"    onChange={(e)=>setEmail(e.target.value)} placeholder='Kiit mail id' /> 
        <input className="input-field bg-zinc-500 p-3 " type="tel"  name="contact"  onChange={(e)=>setContact(e.target.value)}  placeholder='Contact' /> 
        <input className="input-field bg-zinc-500 p-3" type="text" name="branch"  onChange={(e)=>setBranch(e.target.value)} placeholder='branch' /> 
        <input className="input-field bg-zinc-500 p-3 " type="number" name="currentYear"   onChange={(e)=>setCurrentYear(e.target.value)}  placeholder='Current year' /> 
  <span className='flex flex-row gap-2'>
  
    <input type="checkbox" required />
    <p className='input-p'>I agree to the Terms and Conditions and Privacy Policy</p>
    </span>
         {/* <input class="px-5 py-2 bg-blue-500 rounded-lg  " type="submit" value="Sign up"/> */}
         <button type="submit">Sign Up</button> 
      </form>

      <button><Link to="/Login">Login</Link></button>  
      </div>
    </div>
    </>
  )
}

export default SignUp
