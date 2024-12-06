import React from 'react'

const Login = () => {
  return (
    <>
    <div className='flex form-container items-center justify-center'>
      <div className='border-2 bg-zinc-700 rounded-md p-5 border-blue-300'>
      <form action="" className='form p-5 flex  items-center justify-center flex-col space-y-4'>
        <input className="input-field bg-zinc-500 p-3 " type="email" name="email"    placeholder='Kiit mail id' /> 
        <input className="input-field bg-zinc-500 p-3 " type="password" name="password"  placeholder='Enter your password....' /> 
  
        <input class="px-5 py-2 bg-blue-500 rounded-lg  " type="submit" value="Login"/>
      </form>
      </div>
    </div>
    </>
  )
}

export default Login
