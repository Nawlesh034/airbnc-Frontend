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
        <div className="mt-4 grow flex justify-around items-center  ">
            <div className="mb-16">
            <h1 className="text-4xl text-center mb-4">Register</h1>
          <form className="max-w-md m-auto   border-gray-300" onSubmit={registerUser}>
            <input type="text" 
            placeholder="Nawlesh"
            value={name}
            onChange={e=>setName(e.target.value)}/>
            <input type="email" 
            placeholder="your@gmail.com" 
            value={email}
            onChange={e=>setEmail(e.target.value)}/>
            <input type="password" 
            placeholder="*****"
            value={password}
            onChange={e=>setPassword(e.target.value)} />
            <button className="primary">Register</button>
            <div className="text-center py-2 text-gray-500">Already a member?
                <Link to={'/login'} className="text-black underline">   Login now</Link>
            </div>
          </form>
          </div>
          

        </div>
    )
}