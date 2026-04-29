import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import MenuDetails from "./MenuDetails";
import ProductDetails from "./ProductDetails";
import { clearCart, removeSelectedItems } from "../utils/cartSlice";

const Cart = () => {
  const cartItems = useSelector((store) => store.cart.items);
  const dispatch = useDispatch();
  const [selectedItems, setSelectedItems] = useState([]);

  const handleClearCart = () => {
    dispatch(clearCart()); // ✅ FIXED
    setSelectedItems([]);
  };

  const handleClearSelected = () => {
    dispatch(removeSelectedItems(selectedItems));
    setSelectedItems([]);
  };

  const handleCheckboxChange = (id) => {
    setSelectedItems((prev) =>
      prev.includes(id)
        ? prev.filter((itemId) => itemId !== id)
        : [...prev, id]
    );
  };

  if (cartItems.length === 0) {
    return (
      <div className="min-h-[200px] flex items-center justify-center text-gray-500">
        Your cart is empty
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4 text-center">Cart</h1>

      {/* ✅ ACTION BUTTONS */}
      <div className="flex justify-end gap-3 mb-4">
        <button
          onClick={handleClearSelected}
          disabled={selectedItems.length === 0}
          className="px-4 py-2 bg-red-500 text-white rounded disabled:opacity-50"
        >
          Clear Selected
        </button>

        <button
          onClick={handleClearCart}
          className="px-4 py-2 bg-green-500 text-white rounded"
        >
          Clear Cart
        </button>
      </div>

      {/* ✅ CART ITEMS */}
      <div className="flex flex-col gap-4">
        {cartItems.map((item) => (
          <div
            key={item.id}
            className="flex items-start gap-4 p-4 border rounded bg-white shadow-sm"
          >
            <input
              type="checkbox"
              checked={selectedItems.includes(item.id)}
              onChange={() => handleCheckboxChange(item.id)}
              className=" w-[20px] mt-2"
            />

            <div className="flex-1">
              {item.name ? (
                <MenuDetails {...item} cartItem={item} />
              ) : (
                <ProductDetails product={item} />
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Cart;