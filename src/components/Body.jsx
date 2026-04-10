
import React, { useEffect } from "react";
import ReactDOM from "react-dom/client";
import restaurants from "../utils/mockData";
import { useState } from "react";
import { Link } from "react-router-dom";
import Shimmer from "./Shimmer";
import useOnline from '../utils/useOnline';

import ResturantCard from "./ResturantCard";

const Body = () => {
  const [searchInput, setSearchInput] = useState("");
  const [filterResults, setFilterResults] = useState([]);
  const [listOfResturants, setListOfResturants] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const data = await fetch("https://dummyjson.com/recipes");
    const json = await data.json();

    setListOfResturants(json.recipes);
    setFilterResults(json.recipes);
  };


const onlineStatus = useOnline();

if(onlineStatus === false)
return(

    <h1>Looks like you are offline, Please check your internet Connection and try again </h1>

)

  return (listOfResturants.length === 0) ? <Shimmer/> : (
    <div className="body">
      <div className="flex">
        <div className="m-4 p-4">
          <input
            type="text"
            className="border border-solid border-black"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
          />
          <button
            className="bg-green-100 m-4 px-4 py-2 rounded-lg cursor-pointer hover:bg-green-300"
            onClick={() => {
              // filter the Restaurant and update the UI.

              const filteredRestaurant = listOfResturants.filter((res) => {
                return res.name
                  .toLowerCase()
                  .includes(searchInput.toLowerCase());
              });
              setFilterResults(filteredRestaurant);
            }}
          >
            Search
          </button>
        </div>
        <div className="m-4 p-4 flex items-center" >
        <button
          className="px-4 py-2 bg-gray-100 rounded-lg cursor-pointer hover:bg-gray-300"
          onClick={() => {
            const restaurantsfilterData = listOfResturants.filter(
              (res) => res.rating > 4.8,
            );
            setFilterResults(restaurantsfilterData);
            console.log("filter" + restaurantsfilterData);
          }}
        >
          Top Rated Resturant
        </button>
        </div>
       
      </div>
      <div className="flex flex-wrap">
        {filterResults.map((res) => {
          return <Link  className="recipes_links"to={"/recipes/" + res.id} 
          key={res.id}>
          <ResturantCard  {...res} /></Link>;
        })}
      </div>
    </div>
  );
};

export default Body;

