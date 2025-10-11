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
      <div className="px-4 md:px-8 lg:px-16 py-6 max-w-7xl mx-auto">
        <div className="text-center mb-6">
          <NavLink
            to={"/account/places/new"}
            className="bg-primary hover:bg-primary/90 transition-colors duration-300 rounded-full text-white py-3 px-6 gap-2 inline-flex items-center"
          >
            Add New Place
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-5 h-5"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
            </svg>
          </NavLink>
        </div>

        <div className="grid gap-4 md:gap-6 grid-cols-1 lg:grid-cols-2">
          {places.length > 0 &&
            places.map((place) => (
              <div
                key={place._id}
                className="bg-white shadow-lg rounded-xl overflow-hidden flex flex-col transition hover:shadow-xl cursor-pointer"
              >
                <div className="w-full h-48 bg-gray-200">
                  <PlaceImg place={place} />
                </div>
                <div className="flex flex-col p-4 md:p-6">
                  <h2 className="text-lg md:text-xl font-semibold text-gray-800 mb-2">{place.title}</h2>
                  <p className="text-gray-600 text-sm md:text-base mb-4 line-clamp-3 flex-1">
                    {place.description}
                  </p>
                  <NavLink 
                    to={`/account/places/${place._id}`} 
                    className="bg-primary hover:bg-primary/90 text-white rounded-full py-2 px-4 text-center font-medium transition-colors duration-200"
                  >
                    Edit Place
                  </NavLink>
                </div>
              </div>
            ))}
        </div>
      </div>
    </>
    );
}
 