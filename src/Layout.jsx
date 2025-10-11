import { Outlet } from "react-router-dom";
import Header from "./Header";

export default function Layout(){
    return(
       <div className="px-3 md:px-5 py-4 md:py-8 flex flex-col min-h-screen max-w-screen-2xl mx-auto">
        <Header/>
        <main className="flex-1">
          <Outlet/>
        </main>
       </div> 
    )
}