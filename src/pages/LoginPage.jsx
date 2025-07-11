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
        <div className="mt-4 grow flex justify-around items-center  ">
            <div className="mb-16">
            <h1 className="text-4xl text-center mb-4">Login</h1>
          <form className="max-w-md m-auto   border-gray-300" onSubmit={handleLoginSubmit}>
            <input type="email" 
            placeholder="your@gmail.com" 
            value={email} 
            onChange={ev=>setEmail(ev.target.value)} />
            <input type="password" 
            placeholder="*****"
             value={password} 
             onChange={ev=>setPassword(ev.target.value)} />
            <button className="primary">Login</button>
            <div className="text-center py-2 text-gray-500">Don't have an account yet?
                <Link to={'/register'} className="text-black underline">   Register now</Link>
            </div>
          </form>
          </div>
          

        </div>
    )
}