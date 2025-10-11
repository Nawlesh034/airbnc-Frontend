import { NavLink, Navigate, useParams } from "react-router-dom"
import { UserContext } from "../UserContext.jsx"
import { useContext, useState } from "react"
import { Link } from "react-router-dom"

export default function AccountPage(){
    const {ready,user}=useContext(UserContext)
    const [state,setState]=useState('');
    if(!ready){
        return 'Loading....'
    }
    if(ready && !user){
        return <Navigate to={'/login'}/>
    }
   

    return(
        <div>
            <nav className="my-6 md:my-8 flex flex-col sm:flex-row justify-center gap-3 md:gap-6 px-4">
            <NavLink to={'/account/profile'} className={({isActive})=>(isActive?'py-3 px-4 bg-primary inline-flex items-center justify-center text-white rounded-full text-sm md:text-base font-medium':'py-3 px-4 bg-gray-300 inline-flex items-center justify-center rounded-full text-sm md:text-base font-medium')}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 md:w-6 md:h-6 mr-2">
  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
</svg>
                My Profile
            </NavLink>
                <NavLink to={'/account/bookings'} className={({isActive})=>(isActive?'py-3 px-4 inline-flex items-center justify-center bg-primary text-white rounded-full text-sm md:text-base font-medium':'py-3 px-4 bg-gray-300 inline-flex items-center justify-center rounded-full text-sm md:text-base font-medium')}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 md:w-6 md:h-6 mr-2">
  <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 6.75h12M8.25 12h12m-12 5.25h12M3.75 6.75h.007v.008H3.75V6.75Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0ZM3.75 12h.007v.008H3.75V12Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm-.375 5.25h.007v.008H3.75v-.008Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
</svg>
                    My Bookings
                </NavLink>
                <NavLink to={'/account/places'}  className={({isActive})=>(isActive?'py-3 px-4 inline-flex items-center justify-center bg-primary text-white rounded-full text-sm md:text-base font-medium':'py-3 px-4 inline-flex items-center justify-center bg-gray-300 rounded-full text-sm md:text-base font-medium')}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 md:w-6 md:h-6 mr-2">
  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 21h16.5M4.5 3h15M5.25 3v18m13.5-18v18M9 6.75h1.5m-1.5 3h1.5m-1.5 3h1.5m3-6H15m-1.5 3H15m-1.5 3H15M9 21v-3.375c0-.621.504-1.125 1.125-1.125h3.75c.621 0 1.125.504 1.125 1.125V21" />
</svg>
                     My accommodation
                </NavLink>
            </nav>
        </div>
    )
}