import { useContext, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import axios from "axios";
import { UserContext } from "../UserContext";
export default function LoginPage(){
  const[email,setEmail]=useState('');
  const[password,setPassword]=useState('');
  const[redirect,setRedirect]=useState(false);
  const {setUser}=useContext(UserContext);
  async function handleLoginSubmit(ev){
    ev.preventDefault();
    try{
     const {data}= await axios.post('/login',{email,password}, {
       withCredentials: true
     });

     console.log('Login response:', data);
     setUser(data);
     alert('Login successful');
     setRedirect(true);

    }catch(e){
       console.error('Login error:', e);
       alert('Login Failed: ' + (e.response?.data || e.message));
    }
  }
  if(redirect){
    return<Navigate to={'/'}/>
  }

  
    return(
        <div className="mt-4 md:mt-8 grow flex justify-center items-center px-4">
            <div className="w-full max-w-md mb-16">
            <h1 className="text-3xl md:text-4xl text-center mb-6 font-bold">Login</h1>
          <form className="space-y-4" onSubmit={handleLoginSubmit}>
            <input type="email" 
            placeholder="your@gmail.com" 
            value={email} 
            onChange={ev=>setEmail(ev.target.value)}
            className="w-full border my-2 py-3 px-4 rounded-2xl text-base"
            />
            <input type="password" 
            placeholder="*****"
             value={password} 
             onChange={ev=>setPassword(ev.target.value)}
             className="w-full border my-2 py-3 px-4 rounded-2xl text-base"
             />
            <button className="primary py-3 text-base font-medium">Login</button>
            <div className="text-center py-4 text-gray-500 text-sm md:text-base">Don't have an account yet?
                <Link to={'/register'} className="text-black underline ml-1">Register now</Link>
            </div>
          </form>
          </div>
        </div>
    )
}