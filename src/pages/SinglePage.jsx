import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import AddressLink from "./AddressLink";
import PlaceGallery from "./PlaceGallery";
import BookingDates from "./BookingDates";

export function SinglePage() {
    const { id } = useParams();
    const [booking, setBooking] = useState(null);

    useEffect(() => {
        axios.get('/booking', {
            withCredentials: true
        }).then(res => {
            const foundBooking = res.data.find(booking => booking._id === id);
            if (foundBooking) {
                setBooking(foundBooking);
            }
        }).catch(error => {
            console.error("Error fetching booking:", error);
            if (error.response?.status === 401) {
                console.log("Authentication required for booking");
            }
        });
    }, [id]);

    if (!booking) {
        return 'Loading...';
    }

    return (
       <div className="my-10 px-4 md:px-12 font-poppins">
  <h1 className="font-bold text-3xl md:text-5xl lg:text-6xl mb-4 text-gray-800">
    {booking.place.title}
  </h1>

  {/* Booking Details Card */}
  <div className="bg-gray-100 border border-gray-300 shadow-inner rounded-2xl p-6 mt-6">
    <h2 className="text-xl font-semibold mb-3 text-gray-700">Your Booking Details:</h2>
    <div className="text-gray-600 text-base">
      <BookingDates booking={booking} />
    </div>
  </div>

  {/* Address */}
  <div className="mt-6">
    <AddressLink className="text-xl md:text-2xl font-semibold text-blue-600 hover:underline">
      {booking.place.address}
    </AddressLink>
  </div>

  {/* Gallery */}
  <div className="mt-8">
    <PlaceGallery place={booking.place} />
  </div>
</div>

    );
}
