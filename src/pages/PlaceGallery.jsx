import { useState } from "react";

export default function PlaceGallery({place}) {
    const [showAllPhoto, setShowAllPhoto] = useState(false);
    if (showAllPhoto) { // true return the whole page
        return <div className="absolute inset-0 bg-black text-white  min-h-screen">
       
          <div className="bg-black p-8 grid gap-4">
          <h2 className="text-xl mt-4 ml-8">{place.title}</h2>
            <div>
            <button onClick={()=>setShowAllPhoto()} className="bg-gray-700 text-white absolute right-4 rounded-2xl p-4 font-sans"> Close Button</button>
            </div>
            {place?.addPhoto?.length > 0 && place.addPhoto?.map(photo => (
              <div className=" ">
                <img src={'http://localhost:4000/uploads/' + photo} alt="" className="h-[20vh] w-[60] " />
              </div>
            ))}</div></div>
      }
    return(
        <>
     
        <div className="grid gap-2 grid-cols-[2fr_1fr] md:grid-cols-2 md:px-16">
          <div className="">
            {place.addPhoto?.[0] && (<div className="rounded-xl overflow-hidden">   <img onClick={()=>setShowAllPhoto(true)} className="cursor-pointer aspect-square object-cover" src={'http://localhost:4000/uploads/' + place.addPhoto?.[0]} alt="" /></div>)}

          </div>
          <div className="grid gap-2">
            {place.addPhoto?.[1] && (<div className="rounded-xl overflow-hidden">  <img onClick={()=>setShowAllPhoto(true)} className="cursor-pointer aspect-square object-cover" src={'http://localhost:4000/uploads/' + place.addPhoto?.[1]} alt="" /></div>)}
            <div className="">
              {place.addPhoto?.[2] && (<div className="rounded-xl overflow-hidden">   <img onClick={()=>setShowAllPhoto(true)} className="cursor-pointer aspect-square object-cover" src={'http://localhost:4000/uploads/' + place.addPhoto?.[2]} alt="" /></div>)}

            </div>


          </div>

        </div>
        <div className="flex justify-end  mt-4">
        <button onClick={() => setShowAllPhoto(true)} className="border  rounded-md border-gray-600 bg-black text-white ">Show all button</button>
        </div>
      
        </>
    )
}