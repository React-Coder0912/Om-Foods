import React from "react";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import AddToCartButton from "./AddToCartButton";

const MenuDetails = ({
  name,
  cuisine,
  rating = 0,
  ingredients = [],
  image,
  cartItem,
}) => {
  const renderStars = (rating) => {
    const totalStars = 5;

    return Array.from({ length: totalStars }, (_, index) => {
      const fillPercentage = Math.min(Math.max(rating - index, 0), 1) * 100;

      return (
        <div key={index} className="relative w-5 h-5">
          <AiOutlineStar className="absolute top-0 left-0 text-gray-400 w-5 h-5" />
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

  return (
    <div className="flex gap-6 items-start border border-gray-200 rounded-lg p-4 bg-white shadow-sm">
      {image && (
        <img
          src={image}
          alt={name}
          className="w-[300px] h-[300px] object-cover rounded-lg"
        />
      )}

      <div className="flex-1">
        <h2 className="text-2xl font-semibold mb-1">{name}</h2>

        {cuisine && (
          <p className="text-sm text-gray-600 mb-2">{cuisine}</p>
        )}

        {ingredients.length > 0 && (
          <p className="text-sm text-gray-800 mb-2">
            <strong>Ingredients:</strong> {ingredients.join(", ")}
          </p>
        )}

        <h4 className="flex items-center gap-1">
          {rating}
          <span className="flex">{renderStars(rating)}</span>
        </h4>

        <AddToCartButton item={cartItem} className="mt-6" />
      </div>
    </div>
  );
};

export default MenuDetails;