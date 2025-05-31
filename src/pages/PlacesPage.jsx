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

        <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2">
          {places.length > 0 &&
            places.map((place) => (
              <div
                key={place._id}
                className="bg-white shadow-lg rounded-xl overflow-hidden flex flex-col md:flex-row transition hover:shadow-xl cursor-pointer"
              >
                <div className="w-full md:w-48 h-48 bg-gray-200">
                  <PlaceImg place={place} />
                </div>
                <div className="flex flex-col items-center p-4">
                  <h2 className="text-lg font-semibold text-gray-800 text-center">{place.title}</h2>
                  <NavLink to={`/account/places/${place._id}`} className="text-gray-600 mt-2 line-clamp-3 hover:text-primary transition text-center">
                    {place.description}
                  </NavLink>
                </div>
              </div>
            ))}
        </div>
      </div>
    </>
    );
}
 