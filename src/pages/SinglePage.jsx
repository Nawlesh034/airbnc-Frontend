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
        axios.get('/booking').then(res => {
            const foundBooking = res.data.find(booking => booking._id === id);
            if (foundBooking) {
                setBooking(foundBooking);
            }
        }).catch(error => {
            console.error("Error fetching booking:", error);
        });
    }, [id]);

    if (!booking) {
        return 'Loading...';
    }

    return (
        <div className="my-8 mx-4 ">
           <h1 className="font-bold text-6xl ">{booking.place.title}</h1>
            {/* Render details of the booking here */}
            <div className="my-4 bg-gray-300 px-4 rounded-2xl py-3">
                <h1 className="font-bold ">Your Booking Details:</h1>
                <div className="font-normal my-2">
                <BookingDates booking={booking} className="font-normal"/>
                </div>
            
            </div>
            <AddressLink className={`font-extrabold text-2xl leading-3`}>{booking.place.address}</AddressLink>
            <PlaceGallery place={booking.place}/>
           
        </div>
    );
}
