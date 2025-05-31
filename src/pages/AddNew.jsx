import { useEffect, useState } from "react";
import AccountPage from "./AccountPage";
import Perks from "../Perks";
import axios from "axios";
import { Link, Navigate, useParams } from "react-router-dom";


export default function AddNew() {
    const {id}=useParams();
   
    const[title,setTitle]=useState('');
    const[address,setAddress]=useState('');
    const[addPhoto, setAddedPhotos]=useState([]);
    const[photoLink,setPhotoLink]=useState('');
    const[description,setDescription]=useState('');
    const[perks,setPerks]=useState([]);
    const[extraInfo,setExtraInfo]=useState('');
    const[checkIn,setCheckIn]=useState("");
    const[checkOut,setCheckOut]=useState("");
    const[maxGuests,setMaxGuest]=useState("");
    const[redirect,setRedirect]=useState('');
    const[price,setPrice]=useState('');

    useEffect(()=>{
        if(!id){
            return;
        }
        axios.get('/places/'+id).then(response=>{
            const {data}=response;
            setTitle(data.title)
            setAddress(data.address)
            setAddedPhotos(data.addPhoto)
            setDescription(data.description)
            setPerks(data.perks)
            setExtraInfo(data. extraInfo)
            setCheckIn(data.checkIn)
            setCheckOut(data.checkOut)
            setMaxGuest(data.maxGuests)
            setPrice(data.price);
        });
    },[id]);

    function inputHeader(text){
        return(
        <h2 className="text-2xl mt-4">{text}</h2>
        )
    }
    function inputDescription(text){
        return(
        <p className="text-gray-500 text-sm">{text}</p>
        )
    }

    function preInput(header,description){
        return(
            <>
            {inputHeader(header)}
            {inputDescription(description)}
            </>
        )
    }
   async function addPhotoByLink(ev) {
  ev.preventDefault();
  const { data: url } = await axios.post('/upload-by-link', { link: photoLink }); // backend returns Cloudinary URL
  setAddedPhotos(prev => [...prev, url]);
  setPhotoLink('');
}
      console.log(addPhoto);
      console.log(photoLink)

    function uploadPhoto(ev) {
  const files = ev.target.files;
  const data = new FormData();
  for (let i = 0; i < files.length; i++) {
    data.append('photos', files[i]);
  }

  axios.post('/upload', data, {
    headers: { 'Content-type': 'multipart/form-data' }
  }).then(response => {
    const { data: urls } = response; // array of Cloudinary URLs
    setAddedPhotos(prev => [...prev, ...urls]);
  }).catch(error => {
    console.error('Error uploading photos:', error);
  });
}
    //sending the data to the backend

    async function addNewPlace(ev){
        ev.preventDefault();
        if(id){
            await axios.put('/places',{
               id, title,address,addPhoto,description
            ,perks,extraInfo,checkIn,checkOut,maxGuests,price  
            });
            setRedirect('/account/places')
            
        }else{
        await axios.post('/places',{
            title,address,addPhoto,description
            ,perks,extraInfo,checkIn,checkOut,maxGuests,price
        });
        setRedirect('/account/places')
    }
    }

    if(redirect){
        return <Navigate to={redirect}/>
    }
     
    function removePhoto(ev,filename){
        ev.preventDefault();
        setAddedPhotos([...addPhoto.filter(photo=>photo !==filename)])
    }
    function selectMainPhoto(ev,filename){
        ev.preventDefault();
        const addedPhotosWithoutSelected=addPhoto.filter(photo=>photo !==filename);
        const newAddedPhoto = [filename,...addedPhotosWithoutSelected];
        setAddedPhotos(newAddedPhoto);
    }
    return (
        <>
            <AccountPage />
            <div>
                <form onSubmit={addNewPlace}>
                    {preInput('Title','Title for your place should be short and catchy as in advertisement')}
                   

                    <input type="text"
                    placeholder="title, for example: My lovely apt" 
                    value={title}
                    onChange={ev=>setTitle(ev.target.value)}/>
                    {preInput('Address','Address to this place')}
                   
                  
                    <input type="text" 
                    placeholder="address"
                    value={address}
                    onChange={ev=>setAddress(ev.target.value)} />
                    {preInput('Photos','more = better')}
             
                    <div className="flex gap-2">
                        <input type="text" 
                        placeholder="Add using a link...jpg"
                        value={photoLink}
                        onChange={ev=>setPhotoLink(ev.target.value)} />
                        <button onClick={addPhotoByLink} className="bg-gray-300 rounded-2xl px-4">Add photos</button>
                    </div>
                    <div className="mt-2  grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 ">
                        {addPhoto.length>0 && addPhoto.map(link=>
                            <div key={link} className="relative flex h-32 ">
                                <img className="rounded-xl w-full object-cover border-4 border-slate-400" src={link.url}/>
                                {/* {link} */}
                                <button onClick={(ev)=>removePhoto(ev,link)} className="absolute bottom-2 right-2 text-white bg-black bg-opacity-60 ">
      
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
<path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
</svg>
          

                                </button>
                                <button onClick={(ev)=>selectMainPhoto(ev,link)} className="absolute bottom-2 left-2 text-white bg-black bg-opacity-60 ">
                                {link=== addPhoto[0]?(<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
  <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z" clipRule="evenodd" />
</svg>
):                              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 ">
<path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z" />
</svg>   }
   

                                </button>
                            </div>)}
                        <label className="h-32 cursor-pointer flex items-center justify-center gap-2 bg-transparent rounded-2xl p-4 text-2xl text-gray-600">
                            <input type="file" multiple className="hidden" onChange={uploadPhoto} />
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5" />
                            </svg>

                            Upload



                        </label>
                    </div>
                    {preInput('Description','description of the place')}

                    <textarea value={description} onChange={ev=>setDescription(ev.target.value)}/>
                    {preInput('Perks',"Select all the perks of your choices")}

                    <div className="grid mt-4 grid-cols-2 gap-2 md:grid-cols-4">
                       <Perks selected={perks} onChange={setPerks}/>
                    </div>
                    {preInput('Extra Info','house rule,etc')}
       
                    <textarea value={extraInfo} onChange={ev=>setExtraInfo(ev.target.value)}/>
                    {preInput('Check in & out times,max guests','add check in and out times, remember to have some time window for cleaning the room between guests')}
                   
                    <div className="grid grid-cols-3 gap-2">
                        <div>
                         <h3 className="mt-2">Check in time</h3>   
                        <input type="text" placeholder="14:00"
                        value={checkIn}
                        onChange={ev=>setCheckIn(ev.target.value)} />
                        </div>
                        <div>
                            <h3 className="mt-2">Check Out time</h3>
                        <input type="text" placeholder="9:00"
                        value={checkOut}
                        onChange={ev=>setCheckOut(ev.target.value)}/>
                        </div>
                         <div>
                            <h3 className="mt-2">Max number of guests</h3>

                         <input type="number" placeholder="4 Guest"
                         value={maxGuests}
                         onChange={ev=>setMaxGuest(ev.target.value)}
                         />
                         </div>
                         <div>
                         <h3 className="mt-2">Price  </h3>
                         <input type="number" 
                         placeholder="$100" 
                         value={price}
                         onChange={(ev)=>setPrice(ev.target.value)}/>
                         </div>
                         <div>
                           
                            <button className="primary my-4"> Save</button>
                           
                         </div>
                        
                    </div>
                    
                </form>
            </div>
        </>
    )
}