import React, { useContext, useState } from 'react'
import assets from '../assets/assets'
import { AuthContext } from "../../context/AuthContext";



export const LoginPage = () => {

const [currentState, setCurrentState] = useState('Sign up');
const [fullName, setFullName] = useState('');
const [email, setEmail] = useState('');
const [password, setPassword] = useState('');
const [bio, setBio] = useState('');
const [isDataSubmitted, setIsDataSubmitted] = useState(false);

const { login } = useContext(AuthContext);

const onSubmitHandler = (event)=>{
  event.preventDefault();

  if(currentState === 'Sign up' && !isDataSubmitted){
    setIsDataSubmitted(true)
    return;
  }
  login(currentState === "Sign up" ? "signup" : "login", {
      fullName,
      email,
      password,
      bio,
    });
};


  return (
    <div className='min-h-screen bg-white bg-center flex items-center justify-center gap-8 sm:justify-evenly max-sm:flex-col'>
{/* Left Section------------------------------------------------------- */}
      
        <h1 className='text-5xl font-bold text-red-500'>VChat</h1>
       
      
{/* Right Section---------------------------------------------------------------- */}
      <form onSubmit={onSubmitHandler} className='border-2 bg-white text-black border-gray-300 p-6 flex flex-col gap-6 w-100 rounded-lg shadow-lg'>
        <h2 className='font-medium text-2xl flex justify-between items-center'>{currentState}
          {isDataSubmitted && <img onClick={()=> setIsDataSubmitted(false)} src={assets.arrow_icon} alt="" className='w-5 cursor-pointer' /> }
          
        </h2>
        {currentState === 'Sign up' && !isDataSubmitted && (
      <input onChange={(e)=>setFullName(e.target.value)} value={fullName}
      type="text" placeholder='Full Name' required className='p-2 border border-gray-300 rounded-md focus:outline-none'/> 
       
       )}
        {!isDataSubmitted && (
          <>
           <input onChange={(e)=>setEmail(e.target.value)} value={email}
           type="email" placeholder='Email' required className='p-2 border border-gray-300 rounded-md focus:outline-none'/>
        <input onChange={(e)=>setPassword(e.target.value)} value={password}
        type="password" placeholder='Password' required className='p-2 border border-gray-300 rounded-md focus:outline-none'/>
          </>
        )}

        {currentState === 'Sign up' && isDataSubmitted && (
          <textarea onChange={(e)=>setBio(e.target.value)} value={bio}
          rows={4}placeholder='Bio' required className='p-2 border border-gray-300 rounded-md focus:outline-none'/>

        )}

        <button type='submit' className='bg-red-500 text-white p-2 rounded-md hover:bg-red-600 transition duration-300'>
          {currentState === 'Sign up' ? 'Create Account' : 'Login'}
          </button>

          <div className='flex items-center gap-1 text-sm text-gray-600'>
            <input type="checkbox" />
            <p>Agree to the terms of use & privacy policy.</p>
          </div>

          <div>
            {currentState === 'Sign up' ? (
              <p className='text-sm'>Already have an account? <span className='text-red-500 cursor-pointer'
              onClick={()=>{setCurrentState('Login')}}>Login here</span></p>
            ) : (
              <p className='text-sm'>Don't have an account? <span className='text-red-500 cursor-pointer'
              onClick={()=>{setCurrentState('Sign up')}}>Sign up</span></p>
            )}
          </div>

      </form>
    </div>
  )
}
