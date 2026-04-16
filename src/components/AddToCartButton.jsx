import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addItem,
  increaseQty,
  decreaseQty,
} from "../utils/cartSlice";

const AddToCartButton = ({ item, className = "" }) => {
  const dispatch = useDispatch();

  const cartItem = useSelector((store) =>
    store.cart.items.find((i) => i.id === item?.id)
  );

  if (!item) return null;

  // Item NOT in cart
  if (!cartItem) {
    return (
      <button
        type="button"
        onClick={() => dispatch(addItem(item))}
        className={`${className} inline-flex items-center justify-center px-4 py-2 bg-blue-600 text-white rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 transition`}
      >
        Add to cart
      </button>
    );
  }

  // Item IN cart
  return (
    <div
      role="group"
      aria-label={`Quantity controls for ${item.name || "item"}`}
      className={`${className} inline-flex items-center gap-2 sm:gap-3 border border-gray-200 rounded-md px-2 py-1 sm:px-3 sm:py-1.5 bg-white`}
    >
      <button
        type="button"
        aria-label="Decrease quantity"
        onClick={() => dispatch(decreaseQty(item.id))}
        className="h-8 w-8 sm:h-10 sm:w-10 flex items-center justify-center bg-gray-100 hover:bg-gray-200 rounded-full text-lg sm:text-xl focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-blue-300 transition"
      >
        <svg aria-hidden="true" width="14" height="2" viewBox="0 0 14 2" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="14" height="2" rx="1" fill="currentColor" />
        </svg>
      </button>

      <div className="flex flex-col items-center min-w-[36px]">
        <span className="sr-only">Quantity</span>
        <span className="font-semibold text-sm sm:text-base">{cartItem.qty}</span>
      </div>

      <button
        type="button"
        aria-label="Increase quantity"
        onClick={() => dispatch(increaseQty(item.id))}
        className="h-8 w-8 sm:h-10 sm:w-10 flex items-center justify-center bg-gray-100 hover:bg-gray-200 rounded-full text-lg sm:text-xl focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-blue-300 transition"
      >
        <svg aria-hidden="true" width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M7 1v12M1 7h12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>
    </div>
  );
};

export default AddToCartButton;
