import { createContext, useEffect } from "react";
import { useState } from "react";
import axios from "axios";

export const UserContext = createContext({});

export function UserContextProvider({children}){
    const[user,setUser]=useState(null);
    const[ready,setReady]=useState(false);

    useEffect(()=>{
        if(!user){
         axios.get('/profile', {withCredentials:true})
            .then(({data})=>{
                setUser(data);
                setReady(true);
            })
            .catch(() => {
                console.log('No user session found');
                setUser(null);
                setReady(true);
            });
        }
    },[user])

    return(
        <UserContext.Provider value={{user,setUser,ready}}>
            {children}
        </UserContext.Provider>
    )
}