import React, { useState, useEffect } from "react";

const useOnlineStatus = () =>
{
    const[onlineStatus,SetOnlineStatus] = useState(true);
     useEffect(()=>
    {

       const handleOnline = () =>{
        SetOnlineStatus(true)
       }
       const handleOffline = () =>{
        SetOnlineStatus(false)
       }

       window.addEventListener("offline" ,handleOffline);
       window.addEventListener("online", handleOnline);

       return () =>
       {
        window.removeEventListener("offline" , handleOffline);
        window.removeEventListener("online", handleOnline);

       }

    },[])

    return onlineStatus;
}

export default useOnlineStatus;