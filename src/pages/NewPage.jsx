import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import axios from "axios";
import BookingWidget from "./BookingWidget";
import PlaceGallery from "./PlaceGallery";
import AddressLink from "./AddressLink";

export default function NewPage() {
  const { id } = useParams();
  const [place, setPlace] = useState(null);
  
 

  useEffect(() => {
    if (!id) {
      return
    }
    axios.get(`/places/${id}`).then((res) => { setPlace(res.data) })
  }, [id])
  if (!place) return '';
  
 
  return (
    <>
      <div className=" font-mono text-4xl text-justify mt-8 bg-gray-100 w-[100%] rounded-sm px-8 py-2">
        <h1>{place?.title}</h1>
       <AddressLink>{place.address}</AddressLink> 
        <PlaceGallery place={place}/>
    
        <div className="my-4">
          <h2 className="font-bold">Description</h2>
          {place.description}
          
          </div>
          <div className="grid grid-cols-2">
               <div className="text-xl">
                 Check-In: {place.checkIn}<br/>
                 Check-out: {place. checkOut}<br/>
                 Max Number Of guests: {place.maxGuests}
               </div>
               <div>
                <div>
                <div className="bg-white p-2 md:py-[50px] md:px-[40px] md:mx-[181px]  rounded-2xl shadow">
                 <BookingWidget place={place}/>
          </div>
          </div>
      </div>
      </div>
      </div>
    </>
  )
}