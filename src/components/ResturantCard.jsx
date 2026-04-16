import React, {useContext} from "react";
import ReactDOM from "react-dom/client";
import {CDN_URL} from "../utils/constants"; 
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import UserContext from "../utils/UserContext";

// const stylecard = {
//     backgroundColor : "#f0f0f0",
// }


const renderStars = (rating) => {
    const totalStars = 5;
  
    return Array.from({ length: totalStars }, (_, index) => {
      const starValue = index + 1;
      const fillPercentage = Math.min(Math.max(rating - index, 0), 1) * 100;
  
      return (
        <div key={index} className="relative w-5 h-5">
          {/* Empty star */}
          <AiOutlineStar className="absolute top-0 left-0 text-gray-400 w-5 h-5" />
  
          {/* Filled star (partial or full) */}
          <div
            className="absolute top-0 left-0 overflow-hidden"
            style={{ width: `${fillPercentage}%` }}
          >
            <AiFillStar className="text-yellow-500 w-5 h-5" />
          </div>
        </div>
      );
    });
  };

const ResturantCard =(resData) =>{
    const { name, cuisine, rating, cookTimeMinutes, image } = resData;
    const {loggedInUser} = useContext(UserContext);
    return(

        <div className="m-4 p-4 w-60 h-95 rounded-sm bg-gray-50 hover:bg-gray-200">
           
            <img  className="rounded-sm" src={image}/>
  <h3 className="font-bold py-4 px-2">{name}</h3>
  <h4 className="font-sans">{cuisine}</h4>

  <h4 className="flex items-center gap-1">
  {rating}
  <span className="flex">
    {renderStars(rating)}
  </span>
</h4>
  <h4 className="font-bold">{cookTimeMinutes} minutes</h4>
  <h4> User: {loggedInUser}</h4>
        </div>
    )
};
export const withPromotedLabel = (ResturantCard) =>
{
return (props) =>
{
    return(
       
<div className="relative">
        {/* Promoted Badge */}
        <span className="absolute top-2 left-2 z-10 bg-black text-white text-xs font-semibold px-2 py-1 rounded-lg">
          Promoted
        </span>

            <ResturantCard {...props}/>
        </div>
    )
}
}

export default ResturantCard;