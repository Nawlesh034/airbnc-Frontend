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
     <div className="font-mono font-poppins bg-gray-100 w-full px-4 py-6 md:px-8 md:py-10 rounded-md">
  {/* Title */}
  <h1 className="text-3xl md:text-4xl font-bold mb-2 text-gray-800">{place?.title}</h1>

  {/* Address */}
  <div className="mb-6 text-blue-700 underline">
    <AddressLink>{place.address}</AddressLink>
  </div>

  {/* Gallery */}
  <div className="mb-6">
    <PlaceGallery place={place} />
  </div>

  {/* Description */}
  <div className="mb-6">
    <h2 className="text-2xl font-semibold mb-1 text-gray-700">Description</h2>
    <p className="text-gray-600 leading-relaxed">{place.description}</p>
  </div>

  {/* Info + Booking */}
  <div className="grid md:grid-cols-2 gap-6 items-start">
    {/* Stay Info */}
    <div className="text-gray-700 text-base md:text-lg space-y-2">
      <p><strong>Check-In:</strong> {place.checkIn}</p>
      <p><strong>Check-Out:</strong> {place.checkOut}</p>
      <p><strong>Max Guests:</strong> {place.maxGuests}</p>
    </div>

    {/* Booking Widget */}
    <div className="bg-white p-4 md:p-8 rounded-2xl shadow-md w-full max-w-md mx-auto md:mx-0">
      <BookingWidget place={place} />
    </div>
  </div>
</div>

    </>
  )
}