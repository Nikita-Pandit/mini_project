import React ,{useState,useEffect} from 'react'
import axios from "axios"
import { Link, useLocation } from 'react-router-dom'
import { use } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const SignUp = () => {
  const location=useLocation()
  const navigate = useNavigate()
  useEffect(() => {
    // Extract token from query params
    const queryParams = new URLSearchParams(location.search);
    const id = queryParams.get('id');
  
    if (id) {
      console.log('Id received from URL:', id);
      navigate("/Profile", { state: { id } });

      // Handle the token (e.g., validate or display to the user)
    }
  }, [location,navigate]);
  const[name,setName]=useState("")
  const[email,setEmail]=useState("")
  const[contact,setContact]=useState("")
  const[password,setPassword]=useState("")
  // const [alertMessage, setAlertMessage] = useState('');

 const handleSubmit=async (e)=>{
  e.preventDefault()
  // axios.post("http://localhost:20000/SignUp",{name,email,contact,password})
  try {
    const response = await axios.post('http://localhost:20000/api/SignUp',{name,email,contact,password});
  //  alert('Verification email sent! Please check your inbox.');
  toast.success('Verification email sent! Please check your inbox.', {
    style: { color: "#ff5722" } 
  });
  
  
} catch (error) {
    console.error('Error sending verification email:', error);
   // alert('Failed to send verification email.');
   toast.error('Failed to send verification email.',{  className: 'custom-toast'});
}


 }

  return (
    <>
      <ToastContainer />

    <div className='flex form-container items-center justify-center'>
      <div className='border-2 bg-zinc-700 rounded-md p-5 border-blue-300'>
      <form onSubmit={handleSubmit} action="" className='form flex  items-center justify-center flex-col space-y-4'>
      <h1 className='text-3xl'>Sign Up</h1>
        <input  className="input-field bg-zinc-500 p-3" type="text" required name="name" onChange={(e)=>setName(e.target.value)} placeholder='Enter Name' /> 
        <input className="input-field bg-zinc-500 p-3 " type="email" name="email"  required  onChange={(e)=>setEmail(e.target.value)} placeholder='Enter Kiit email' /> 
        <input className="input-field bg-zinc-500 p-3 " type="tel"  name="contact" required onChange={(e)=>setContact(e.target.value)}  placeholder='Enter Contact' /> 
        <input className="input-field bg-zinc-500 p-3 " type="password"  name="password" required onChange={(e)=>setPassword(e.target.value)}  placeholder="Enter Password" />
  <span className='flex flex-row gap-2'>
  
    <input type="checkbox" required />
    <p className='input-p'>I agree to the Terms and Conditions and Privacy Policy</p>
   
    </span>
         <input className="px-5 py-2 bg-blue-500 rounded-lg  " type="submit" value="Sign up"/>
      </form>

    <p className='text-center mt-5'>Already have an account?<span className='text-blue-500'><Link to="/Login">&nbsp;Login</Link></span></p>

  
      </div>
    </div>
    </>
  )

}
export default SignUp
