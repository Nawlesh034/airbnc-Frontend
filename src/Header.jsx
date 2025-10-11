import React, { useContext } from "react"
import { Link } from "react-router-dom"
import { UserContext } from "./UserContext"


export default function Header(){
  const{user}=useContext(UserContext);

    return(
        <header className='w-full'>
          {/* Top row with logo and user menu */}
          <div className='flex justify-between items-center mb-4'>
            <Link to={'/'} className="flex items-center gap-1">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 rotate-90">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5" />
              </svg>
              <span className='font-bold text-xl md:text-2xl'>airbnc</span>
            </Link>

            {/* User Menu */}
            <Link to={user?'/account/profile':'/login'} className='flex items-center border border-gray-300 rounded-full py-2 px-3 gap-2 min-h-[44px] hover:shadow-md transition-shadow' >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 hidden md:block">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
              </svg>
              <div className='bg-gray-500 text-white rounded-full overflow-hidden'>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 p-0.5">
                  <path fillRule="evenodd" d="M7.5 6a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM3.751 20.105a8.25 8.25 0 0 1 16.498 0 .75.75 0 0 1-.437.695A18.683 18.683 0 0 1 12 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 0 1-.437-.695Z" clipRule="evenodd" />
                </svg>
              </div>
              {!!user && (
                <div className="text-sm font-medium hidden sm:block">
                  {user.name}
                </div>
              )}
            </Link>
          </div>

          {/* Static Full-width Search Bar */}
          <div className='w-full'>
            <div className='w-full border border-gray-300 rounded-full py-4 px-6 shadow-lg bg-white flex items-center justify-between'>
              <div className="flex items-center gap-4 text-gray-600">
                <div className="flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                  </svg>
                  <span className="font-medium">Search destinations</span>
                </div>
              </div>
              <div className='bg-primary text-white p-2 rounded-full'>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                  <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                </svg>
              </div>
            </div>
          </div>
        </header>
    )
}