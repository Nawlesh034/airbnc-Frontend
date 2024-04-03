export default function PlaceImg({place,index=0,className}){
    return(
        <>
        {place.addPhoto?.length > 0 && (
            <img className="object-cover" src={'http://localhost:4000/uploads/'+ place.addPhoto[index]} alt=""  />
            
        )}
        </>
    )
}