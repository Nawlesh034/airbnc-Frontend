import React, { useEffect, useState } from "react"
import AccountPage from "./AccountPage"
import { Link, NavLink } from "react-router-dom"
import axios from "axios";
import PlaceImg from "./PlaceImg";

export default function PlacesPage() {
    const [places, setPlaces] = useState([]);

    useEffect(() => {
        axios.get('/user-places')
            .then(({ data }) => {
                setPlaces(data);
            })
            .catch(error => {
                console.error("Error fetching places:", error);
            });
    }, []); // empty dependency array to run only once after initial render

    return (
        <>
            <AccountPage />
            <div>
                <div className="text-center">
                    <NavLink to={'/account/places/new'} className="bg-primary rounded-full text-white py-2 px-4 gap-2 justify-center  inline-flex">
                        Add New Places
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                        </svg>
                    </NavLink>
                </div>
                <div className="mt-4 flex border rounded-lg text-white">
                    {places.length > 0 && places.map(place => (
                        <div key={place._id} className=" bg-slate-600 px-4 flex h-[32vh] justify-start gap-4">
                            <div className=" bg-gray-300 w-32 h-[16vh] mt-2 shrink-0">
                               <PlaceImg place={place}/>
                            </div>
                            <div>
                                <h2 className="mt-2">{place.title}</h2>
                                <NavLink to={'/account/places/' + place._id}>
                                    <p>{place.description}</p>
                                </NavLink>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}
 