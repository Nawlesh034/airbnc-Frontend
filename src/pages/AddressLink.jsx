export default function AddressLink({children, className=null}){
    if(!className){
       className = 'font-semibold '
    }
    className +="my-3 underline block " 
    return(
        <>
         <a className={className}target="_blank" href={'https://maps.google.com/?q=' + {children}}>{children}</a>
        
        </>
    )
}