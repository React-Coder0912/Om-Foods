import React from "react";
import ReactDOM from "react-dom/client";
import {CDN_URL} from "../utils/constants"; 

// const stylecard = {
//     backgroundColor : "#f0f0f0",
// }

const ResturantCard =(resData) =>{
    const { name, cuisine, rating, cookTimeMinutes, image } = resData;
    return(

        <div className="m-4 p-4 w-60 h-95 rounded-sm bg-gray-50 hover:bg-gray-200">
           
            <img  className="rounded-sm" src={image}/>
  <h3 className="font-bold py-4 px-2">{name}</h3>
  <h4 className="font-sans">{cuisine}</h4>
  <h4>Rating: {rating} stars</h4>
  <h4 className="font-bold">{cookTimeMinutes} minutes</h4>
        </div>
    )
}

export default ResturantCard;