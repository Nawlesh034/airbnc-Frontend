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
        <div className="px-4 md:px-8 lg:px-16 py-6 max-w-7xl mx-auto">
          <div className="bg-white shadow-lg rounded-2xl p-6 md:p-8 max-w-2xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-6">Profile Information</h2>
            <div className="space-y-4 text-center">
              <div className="text-lg md:text-xl">
                <span className="font-semibold">Name:</span> {user?.name}
              </div>
              <div className="text-lg md:text-xl">
                <span className="font-semibold">Email:</span> {user?.email}
              </div>
            </div>
            <div className="flex justify-center mt-8">
              <button 
                onClick={logout} 
                className="bg-primary hover:bg-primary/90 text-white rounded-full py-3 px-8 text-lg font-medium transition-all duration-200 min-w-[120px]"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
        </>
    )
}