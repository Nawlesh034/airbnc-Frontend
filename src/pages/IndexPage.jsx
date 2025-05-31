import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";



export default function IndexPage(){
    const[places,setPlaces]=useState([]);
    useEffect(()=>{
        axios.get('/places').then(res=>{
             setPlaces(res.data);
        })
    },[])
return(
    <div className="mt-10 gap-8 font-poppins  grid lg:grid-cols-4 md:grid-cols-4 grid-cols-2">
      {places.length>0 && places.map(place=>(
        
       
           <Link to={'/places/'+place._id}> 
            <div className="cursor-pointer hover: ">
            {place.addPhoto?.[0] && (// this places is different end point youtuber set this place
                <img className="aspect-square object-cover rounded-2xl" src={place.addPhoto?.[0] }alt=""/>
            )}
            <h2 className="text-sm font-bold truncate leading-6">  {place.title}</h2> 
            <h3 className="text-xs font-sans">{place.address}</h3> 
            <p>${place.price}</p>
          
            </div>
            </Link>
          
          
      )

      )}
      </div>
)
}