export default function PlaceImg({place,index=0,className}){
    return(
        <>
        {place.addPhoto?.length > 0 && (
            <img className="object-cover w-full h-full" src={ place.addPhoto[index]} alt=""  />
            
        )}
        </>
    )
}