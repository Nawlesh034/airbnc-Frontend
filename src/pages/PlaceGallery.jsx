import { useState } from "react";

export default function PlaceGallery({ place }) {
  const [showAllPhoto, setShowAllPhoto] = useState(false);


  return (
 <>
      {/* Main gallery */}
      <div className="mt-6 px-2 md:px-16">
        <div className="grid grid-cols-1 sm:grid-cols-[2fr_1fr] gap-3">
          {/* Left big image */}
          <div className="rounded-2xl overflow-hidden">
            {place.addPhoto?.[0] && (
              <img
                onClick={() => setShowAllPhoto(true)}
                src={place.addPhoto[0]}
                alt=""
                className="cursor-pointer w-full h-full object-cover hover:scale-105 transition-transform duration-300"
              />
            )}
          </div>

          {/* Two stacked small images */}
          <div className="grid gap-3">
            {place.addPhoto?.[1] && (
              <div className="rounded-2xl overflow-hidden">
                <img
                  onClick={() => setShowAllPhoto(true)}
                  src={place.addPhoto[1]}
                  alt=""
                  className="cursor-pointer w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>
            )}
            {place.addPhoto?.[2] && (
              <div className="rounded-2xl overflow-hidden">
                <img
                  onClick={() => setShowAllPhoto(true)}
                  src={place.addPhoto[2]}
                  alt=""
                  className="cursor-pointer w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>
            )}
          </div>
        </div>

        {/* Show all photos button */}
        <div className="flex justify-end mt-6">
          <button
            onClick={() => setShowAllPhoto(true)}
            className="bg-black text-white py-2 px-6 rounded-xl text-sm font-semibold hover:bg-gray-800 transition"
          >
            Show all photos
          </button>
        </div>
      </div>

      {/* Fullscreen photo modal */}
      {showAllPhoto && (
        <div className="fixed inset-0 bg-black bg-opacity-90 z-50 overflow-y-auto">
          <div className="p-8 max-w-6xl mx-auto">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-semibold text-white">{place.title} – All Photos</h2>
              <button
                onClick={() => setShowAllPhoto(false)}
                className="bg-white text-black py-2 px-4 rounded-lg hover:bg-gray-300 transition"
              >
                Close
              </button>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {place.addPhoto?.map((photo, index) => (
                <div key={index} className="rounded-xl overflow-hidden">
                  <img
                    src={photo}
                    alt={`photo-${index}`}
                    className="w-full h-[250px] object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
