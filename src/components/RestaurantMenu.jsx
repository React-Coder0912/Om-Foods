// import React, { useEffect, useState, useContext } from "react";
// import { useParams } from "react-router-dom";
// import Shimmer from "./Shimmer";
// import { Link } from "react-router-dom";
// import { AiFillStar, AiOutlineStar } from "react-icons/ai";
// import UserContext from "../utils/UserContext";
// import AddToCartButton from "./AddToCartButton";

// const RestaurantMenu = () => {
//   const { id } = useParams();
//   const [resInfo, setResInfo] = useState(null);
//   const [error, setError] = useState("");
//   const { loggedInUser } = useContext(UserContext);

//   useEffect(() => {
//     fetchData();
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [id]);

//   const fetchData = async () => {
//     try {
//       if (!id) {
//         setError("No recipe id provided in the route.");
//         return;
//       }

//       setError("");
//       setResInfo(null);

//       const resp = await fetch(`https://dummyjson.com/recipes/${id}`);
//       if (!resp.ok) {
//         throw new Error(`Request failed: ${resp.status}`);
//       }

//       const json = await resp.json();
//       setResInfo(json);
//     } catch (e) {
//       setError(e?.message || "Failed to load recipe.");
//     }
//   };

//   // Loading
//   if (!error && resInfo === null) return <Shimmer />;

//   // Error
//   if (error) {
//     return (
//       <div className="p-4 text-red-600">
//         <h3 className="text-lg font-semibold">Couldn’t load the recipe</h3>
//         <p>{error}</p>
//       </div>
//     );
//   }

//   const { name, cuisine, rating, ingredients, image } = resInfo;

//   const renderStars = (rating) => {
//     const totalStars = 5;

//     return Array.from({ length: totalStars }, (_, index) => {
//       const fillPercentage = Math.min(Math.max(rating - index, 0), 1) * 100;

//       return (
//         <div key={index} className="relative w-5 h-5">
//           <AiOutlineStar className="absolute top-0 left-0 text-gray-400 w-5 h-5" />
//           <div className="absolute top-0 left-0 overflow-hidden" style={{ width: `${fillPercentage}%` }}>
//             <AiFillStar className="text-yellow-500 w-5 h-5" />
//           </div>
//         </div>
//       );
//     });
//   };

//   // prepare item object expected by cartSlice items[]
//   const cartItem = {
//     id: resInfo?.id || id,
//     name,
//     image,
//     price: resInfo?.price || 0,
//     qty: 1,
//   };

//   return (
//     <div className="max-w-4xl mx-auto p-4">
//       {/* MAIN LAYOUT */}
//       <ul className="flex py-10 px-10">
//         <li className="px-2 font-bold">{loggedInUser}</li>
//       </ul>
//       <Link to="/" className="text-blue-600 underline">
//         &larr; Back to Home
//       </Link>
//       <div className="flex gap-6 items-start border border-gray-200 rounded-lg p-4 bg-white shadow-sm">
//         {image && <img src={image} alt={name} className="w-[300px] h-[300px] object-cover rounded-lg" />}

//         {/* RIGHT: CONTENT */}
//         <div className="flex-1">
//           <h2 className="text-2xl font-semibold mb-1">{name}</h2>

//           {cuisine && <p className="text-sm text-gray-600 mb-2">{cuisine}</p>}

//           {ingredients?.length > 0 && (
//             <p className="text-sm text-gray-800 mb-2">
//               <strong>Ingredients:</strong> {ingredients.join(", ")}
//             </p>
//           )}

//           <h4 className="flex items-center gap-1">
//             {rating}
//             <span className="flex">{renderStars(rating)}</span>
//           </h4>

//           <AddToCartButton item={cartItem} className="mt-6" />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default RestaurantMenu;


import React, { useEffect, useState, useContext } from "react";
import { useParams, Link } from "react-router-dom";
import Shimmer from "./Shimmer";
import UserContext from "../utils/UserContext";
import MenuDetails from "./MenuDetails";

const RestaurantMenu = () => {
  const { id } = useParams();
  const [resInfo, setResInfo] = useState(null);
  const [error, setError] = useState("");
  const { loggedInUser } = useContext(UserContext);

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const fetchData = async () => {
    try {
      if (!id) {
        setError("No recipe id provided.");
        return;
      }

      setError("");
      setResInfo(null);

      const resp = await fetch(`https://dummyjson.com/recipes/${id}`);
      if (!resp.ok) throw new Error(`Request failed: ${resp.status}`);

      const json = await resp.json();
      setResInfo(json);
    } catch (e) {
      setError(e.message || "Failed to load recipe.");
    }
  };

  // Loading
  if (!error && resInfo === null) return <Shimmer />;

  // Error
  if (error) {
    return (
      <div className="p-4 text-red-600">
        <h3 className="text-lg font-semibold">Couldn’t load the recipe</h3>
        <p>{error}</p>
      </div>
    );
  }

  const { name, cuisine, rating, ingredients, image } = resInfo;

  // Prepare cart item
  const cartItem = {
    id: resInfo.id,
    name,
    image,
    price: resInfo.price || 0,
    qty: 1,
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <ul className="flex py-4 px-4">
        <li className="font-bold">{loggedInUser}</li>
      </ul>

      <Link to="/" className="text-blue-600 underline">
        &larr; Back to Home
      </Link>

      <MenuDetails
        name={name}
        cuisine={cuisine}
        rating={rating}
        ingredients={ingredients}
        image={image}
        cartItem={cartItem}
      />
    </div>
  );
};

export default RestaurantMenu;