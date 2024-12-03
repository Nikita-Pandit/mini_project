import React from 'react'
// w-full: Full width of the screen.
// h-screen: Full height of the viewport.
const SignUp = () => {
  return (
    <>
      <form action="" className='flex h-screen items-center justify-center flex-col space-y-4 '>
        <input className="bg-zinc-500  p-3 border-2 rounded-md outline-none border-none text-center" type="text" required placeholder='Name' /> 
        <input className="bg-zinc-500 p-3 border-2 rounded-md outline-none border-none text-center " type="email" required placeholder='Kiit mail id' /> 
        <input className="bg-zinc-500 p-3 border-2 rounded-md outline-none border-none text-center " type="tel" required placeholder='Contact' /> 
        <input className="bg-zinc-500 p-3 border-2 rounded-md outline-none border-none text-center " type="text" required placeholder='Branch' /> 
        <input className="bg-zinc-500 p-3 border-2 rounded-md outline-none border-none text-center " type="number" required placeholder='Current year' /> 
        <input class="px-5 py-2 bg-blue-500 rounded-lg  " type="submit" value="Sign up"/>
      </form>
    </>
  )
}

export default SignUp
