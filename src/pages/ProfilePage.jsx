import AccountPage from "./AccountPage";
import { UserContext } from "../UserContext.jsx"
import { useContext, useState } from "react";
import axios from "axios";
import { Navigate } from "react-router-dom";




export default function ProfilePage(){
    const{ready,user,setUser}=useContext(UserContext);
    const [redirect,setRedirect]= useState(null);
   async function logout(){
        try {
            await axios.post('/logout', {}, {
                withCredentials: true
            });
            setUser(null);
            setRedirect('/');
        } catch (error) {
            console.error('Logout error:', error);
            // Still redirect even if logout fails
            setUser(null);
            setRedirect('/');
        }
    }
    if(redirect){
        return <Navigate to ={redirect}/>
    }
    return(
        <>
        <AccountPage />
        <div className="flex justify-center">Logged in as {user?.name} {user?.email}
       
        </div>
        <button onClick={logout} className="bg-primary text-white rounded-full mt-2 mx-auto  py-2 text-2xl w-1/4">Logout</button>
        </>
    )
}