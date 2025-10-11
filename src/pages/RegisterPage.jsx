import axios from "axios";
import React, { useState } from "react"
import { Link } from "react-router-dom"
export default function RegisterPage(){
    const [name,setName]=useState('');
    const [email,setEmail]=useState('');
    const [password,setPassword]=useState('');
    async function registerUser(e){
       e.preventDefault();
       try{
        await axios.post('/register',{
            name,
            email,
            password,
        });
        alert('Registration Successful.')
    } catch(e){
        alert('Registration failed');
    }
}
    return(
        <div className="mt-4 md:mt-8 grow flex justify-center items-center px-4">
            <div className="w-full max-w-md mb-16">
            <h1 className="text-3xl md:text-4xl text-center mb-6 font-bold">Register</h1>
          <form className="space-y-4" onSubmit={registerUser}>
            <input type="text" 
            placeholder="Nawlesh"
            value={name}
            onChange={e=>setName(e.target.value)}
            className="w-full border my-2 py-3 px-4 rounded-2xl text-base"
            />
            <input type="email" 
            placeholder="your@gmail.com" 
            value={email}
            onChange={e=>setEmail(e.target.value)}
            className="w-full border my-2 py-3 px-4 rounded-2xl text-base"
            />
            <input type="password" 
            placeholder="*****"
            value={password}
            onChange={e=>setPassword(e.target.value)}
            className="w-full border my-2 py-3 px-4 rounded-2xl text-base"
            />
            <button className="primary py-3 text-base font-medium">Register</button>
            <div className="text-center py-4 text-gray-500 text-sm md:text-base">Already a member?
                <Link to={'/login'} className="text-black underline ml-1">Login now</Link>
            </div>
          </form>
          </div>
        </div>
    )
}