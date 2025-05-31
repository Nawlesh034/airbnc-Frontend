import { useEffect, useState } from "react"
import AccountPage from "./AccountPage"
import axios from "axios"
import PlaceImg from "./PlaceImg"

import { Link } from "react-router-dom";
import BookingDates from "./BookingDates";




export default function BookingPage() {
    const [booking, setBooking] = useState([])
    useEffect(() => {
        axios.get('/booking').then(response => {
            setBooking(response.data);
        })
    }, [])
    return (
        <>
      <AccountPage />
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        <h1 className="text-4xl font-bold mb-6 text-center font-serif text-gray-900">
          Your Bookings
        </h1>

        {booking?.length === 0 && (
          <p className="text-center text-gray-600 mt-10">
            No bookings found. Start exploring and book your next stay!
          </p>
        )}

        <div className="space-y-6">
          {booking?.map((booking) => (
            <Link
              to={`/account/booking/${booking._id}`}
              key={booking._id}
              className="flex flex-col sm:flex-row gap-4 bg-white shadow-md rounded-2xl overflow-hidden hover:shadow-lg transition-shadow duration-300"
            >
              <div className="w-full sm:w-48 h-40 sm:h-36 flex-shrink-0">
                <PlaceImg place={booking.place} className="w-full h-full rounded-l-2xl object-cover" />
              </div>
              <div className="flex flex-col justify-center px-4 py-3">
                <h2 className="text-2xl font-semibold text-gray-900 font-serif">
                  {booking.place.title}
                </h2>
                <div className="mt-2 text-gray-700">
                  <BookingDates booking={booking} />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </>
    )
}