import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";



export default function IndexPage(){
    const[places,setPlaces]=useState([]);
    useEffect(()=>{
        axios.get('/places').then(res=>{
             setPlaces(res.data);
        }).catch(error => {
            console.error('Error fetching places:', error);
        })
    },[])
return(
    <div className="mt-6 md:mt-10 gap-4 md:gap-8 font-poppins grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {places.length>0 && places.map(place=>(
           <Link to={'/places/'+place._id} key={place._id}> 
            <div className="cursor-pointer hover:scale-105 transition-transform duration-200">
            {place.addPhoto?.[0] && (
                <img className="aspect-square object-cover rounded-2xl w-full" src={place.addPhoto?.[0]} alt={place.title}/>
            )}
            <div className="mt-2 space-y-1">
              <h2 className="text-sm md:text-base font-bold truncate leading-5 md:leading-6">  {place.title}</h2> 
              <h3 className="text-xs md:text-sm text-gray-600 truncate">{place.address}</h3> 
              <p className="text-sm md:text-base font-semibold">${place.price}</p>
            </div>
            </div>
            </Link>
      ))}
      </div>
)
}