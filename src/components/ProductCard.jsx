// ProductCard.jsx
import React from "react";
import { Link } from "react-router-dom";

const ProductCard = ({ id, title, image }) => {
  return (
    <Link to={`/products/${id}`} aria-label={`Open ${title} details`}>
      <div className="w-[200px] border border-black m-4 p-4 rounded-lg bg-gray-100 hover:bg-gray-300 flex flex-col items-center text-center cursor-pointer">
        <img
          src={image}
          alt={title}
          className="w-[150px] h-[150px] object-cover rounded-lg mb-2"
        />
        <span className="font-medium">{title}</span>
      </div>
    </Link>
  );
};

export default ProductCard;