// import { useParams } from "react-router-dom";
// import Shimmer from "./Shimmer";

// const RestaurantMenu = () => {
//   const { id } = useParams();
//   const [resInfo, setResInfo] = useState(null);
//   const [error, setError] = useState("");

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

//       const url = `https://dummyjson.com/recipes/${id}`;
//       const resp = await fetch(url);
//       if (!resp.ok) {
//         throw new Error(`Request failed: ${resp.status} ${resp.statusText}`);
//       }
//       const json = await resp.json();
//       setResInfo(json);
//     } catch (e) {
//       console.error(e);
//       setError(e?.message || "Failed to load recipe.");
//     }
//   };

//   // Loading
//   if (!error && resInfo === null) return <Shimmer />;

//   // Error
//   if (error) {
//     return (
//       <div className="p-4 text-red-600">
//         <h3 className="text-lg font-semibold mb-1">Couldn’t load the recipe</h3>
//         <p className="text-sm">{error}</p>
//       </div>
//     );
//   }

//   // Normalize to array for map()
//   const recipesArray = resInfo ? [resInfo] : [];

//   // Pick only the fields you need
//   const minimalRecipes = recipesArray.map(
//     ({ name, cuisine, rating, cookTimeMinutes, ingredients, image }) => ({
//       name,
//       cuisine,
//       rating,
//       cookTimeMinutes,
//       ingredients,
//       image,
//     })
//   );

//   // Guard: no data case
//   if (!minimalRecipes.length) {
//     return (
//       <div className="p-4">
//         <h3 className="text-lg font-semibold">No recipe found</h3>
//         <p className="text-sm text-gray-600">Try a different id.</p>
//       </div>
//     );
//   }

//   return (
//     <div className="p-4">
//       <ul className="list-none p-0 m-0">
//         {minimalRecipes.map(
//           ({ name, cuisine, rating, cookTimeMinutes, ingredients, image }, idx) => (
//             <li
//               key={`${name}-${idx}`}
//               className="border border-gray-200 rounded-lg p-4 mb-3 bg-white shadow-sm"
//             >
//               <h3 className="text-xl font-semibold mb-1">{name}</h3>

//               {image && (
//                 <img
//                   src={image}
//                   alt={name}
//                   className="w-[200px] h-auto rounded-md mb-2"
//                 />
//               )}

//               {cuisine && (
//                 <h4 className="text-sm font-medium text-gray-600 mb-2">
//                   {cuisine}
//                 </h4>
//               )}

//               {ingredients?.length ? (
//                 <p className="text-sm text-gray-800 mb-2">
//                   <strong>Ingredients:</strong> {ingredients.join(", ")}
//                 </p>
//               ) : null}

//               <p className="text-sm text-gray-700">
//                 <span>⭐ Rating: {rating ?? "N/A"}</span>
//                 <span className="mx-1">·</span>
//                 <span>⏱️ Cook Time: {cookTimeMinutes ?? "—"} min</span>
//               </p>
//             </li>
//           )
//         )}
//       </ul>
//     </div>
//   );
// };

// export default RestaurantMenu;

import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Shimmer from "./Shimmer";
import { Link } from "react-router-dom";

const RestaurantMenu = () => {
  const { id } = useParams();
  const [resInfo, setResInfo] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const fetchData = async () => {
    try {
      if (!id) {
        setError("No recipe id provided in the route.");
        return;
      }

      setError("");
      setResInfo(null);

      const resp = await fetch(`https://dummyjson.com/recipes/${id}`);
      if (!resp.ok) {
        throw new Error(`Request failed: ${resp.status}`);
      }

      const json = await resp.json();
      setResInfo(json);
    } catch (e) {
      setError(e?.message || "Failed to load recipe.");
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

  const {
    name,
    cuisine,
    rating,
    cookTimeMinutes,
    ingredients,
    image,
  } = resInfo;

  return (
    <div className="max-w-4xl mx-auto p-4">
      {/* MAIN LAYOUT */}
        <Link to="/" className="text-blue-600 underline">&larr; Back to Home</Link>
      <div className="flex gap-6 items-start border border-gray-200 rounded-lg p-4 bg-white shadow-sm">
        
        {/* LEFT: IMAGE */}
        {image && (
          <img
            src={image}
            alt={name}
            className="w-[300px] h-[300px] object-cover rounded-lg"
          />
        )}

        {/* RIGHT: CONTENT */}
        <div className="flex-1">
          <h2 className="text-2xl font-semibold mb-1">{name}</h2>

          {cuisine && (
            <p className="text-sm text-gray-600 mb-2">{cuisine}</p>
          )}

          {ingredients?.length > 0 && (
            <p className="text-sm text-gray-800 mb-2">
              <strong>Ingredients:</strong> {ingredients.join(", ")}
            </p>
          )}

          <p className="text-sm text-gray-700">
            ⭐ Rating: {rating ?? "N/A"} <br />
            ⏱️ Cook Time: {cookTimeMinutes ?? "—"} min
          </p>
          <button className="mt-6 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
            Add to cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default RestaurantMenu;

