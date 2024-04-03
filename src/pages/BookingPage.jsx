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
            <div>
                {booking?.length > 0 && booking.map(booking => (
                    <Link to={`/account/booking/${booking._id}`} className="flex gap-2  bg-gray-300 rounded-2xl overflow-hidden">
                        <div className="w-48">
                            <PlaceImg place={booking.place} />
                        </div>
                        <div className="py-2  font-serif font-medium">
                            <div>
                                <h2>{booking.place.title}</h2>
                            </div>
                           <BookingDates booking={booking}/> 

                        </div>

                    </Link>


                ))}
            </div>


        </>
    )
}