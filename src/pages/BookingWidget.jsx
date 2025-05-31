import { useContext, useEffect, useState } from "react"
import { addDays } from "date-fns/addDays";
import { Navigate } from "react-router-dom";
import axios from "axios";
import { UserContext } from "../UserContext";


export default function BookingWidget({place}){
    const[checkIn,setCheckIn]=useState('');
    const[checkOut,setCheckOut]=useState('');
    const[guests,setMaxGuest]=useState(1);
    const[name,setName]=useState('');
    const[email,setEmail]=useState('')
    const[mobile,setMobile]=useState('');
    const[redirect,setRedirect]= useState();
    const {user}=useContext(UserContext)
     
    useEffect(()=>{
        if(user){
            setName(user.name);
            setEmail(user.email)
        }
    },[user])

    let numberOfDays=0;
    if(checkIn && checkOut){
        numberOfDays = Math.ceil((new Date(checkOut) - new Date(checkIn)) / (1000 * 60 * 60 * 24));

    }
  async function bookThisPlace() {
  try {
    const data = {
      checkIn,
      checkOut,
      guests,
      name,
      mobile,
      place: place._id,
      price: numberOfDays * place.price,
    };
    const response = await axios.post('/booking', data);
    const bookingId = response.data._id;
    setRedirect(`/account/bookings/${bookingId}`);
  } catch (err) {
    console.error("Booking failed:", err.response?.data || err.message || err);
    alert("Booking failed: " + (err.response?.data?.error || err.message));
  }
}
    if(redirect){

        return <Navigate to={redirect}/>
    }
    return(
        <div className="font-poppins">

        <div className=" text-center  text-2xl">Price:{place.price} / per night</div> 
                 
                 <div className="grid grid-col-[1fr_2fr] md:mb-6 md:mt-6 mb-6 mt-6 ">
                  <div className="flex ">
                 <div className=" border py-3 px-1 font-semibold   text-sm ">
                  <label >Check-In: 
                  <input type="date" 
                  className="cursor-pointer  "
                  value={checkIn}
                  onChange={(ev)=>setCheckIn(ev.target.value)} />
                  </label>
                 </div>
                 <div className="py-3 px-2 text-sm font-semibold  border ">
                  <label >Check-out:
                  <input type="date" 
                  className="cursor-pointer" 
                  value={checkOut}
                  onChange={(ev)=>setCheckOut(ev.target.value)} />
                  </label>
                 </div>
                 </div>
                 <div className="py-3 px-2 text-sm font-semibold  border">
                  <label htmlFor="">Guests:</label>
                  <input type="number" name="" id="" 
                  value={guests} 
                  onChange={(ev)=>setMaxGuest(ev.target.value)}/>
                 </div>
                 {numberOfDays>0 && (
                    <>
                    <div className="py-3 px-2 text-sm font-semibold   border">
                    <label className="block" >Your Name</label>
                    <input type="text" name="" id="" 
                    value={name} 
                    onChange={(ev)=>setName(ev.target.value)}/>
                   </div>
                    <div className="py-3 px-2 text-sm font-semibold  border">
                    <label className="block">Your Email</label>
                    <input type="text" name="" id="" 
                    value={email} 
                    onChange={(ev)=>setEmail(ev.target.value)}/>
                   </div>
                   <div className="py-3 px-2 text-sm font-semibold  border">
                    <label className="block">Phone</label>
                    <input type="tel"  
                    value={mobile} 
                    onChange={(ev)=>setMobile(ev.target.value)}/>
                   </div>
                   </>
                 )}
                 </div>
                 

                  <button onClick={bookThisPlace} className="bg-[#F5385D] text-white rounded-xl font-sans text-4xl py-2 px-4 mx-4 my-2 md:-mx[12px]">Book this place
                  {numberOfDays>0 &&(
                     <span> Rs:{numberOfDays * place.price}</span>
                  )}
                  </button>
                </div>
               
              
    )
}