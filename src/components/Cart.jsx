import { useSelector } from "react-redux";
import MenuDetails from "./MenuDetails";
import ProductDetails from "./ProductDetails";

const Cart = () => {
  const cartItems = useSelector((store) => store.cart.items);

  if (cartItems.length === 0) {
    return (
      <div className="min-h-[200px] flex items-center justify-center text-gray-500">
        Your cart is empty
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Cart</h1>

      <div className="flex flex-col gap-4">
        {cartItems.map((item) => {
          // If item looks like a restaurant (has `name`), render MenuDetails
          if (item.name) {
            return (
              <MenuDetails
              key={item.id}
              name={item.name}
              image={item.image}
              rating={item.rating || 0}
              ingredients={item.ingredients || []}
              cuisine={item.cuisine}
              cartItem={item}
            />
            );
          }

          // If item looks like a product (has `title`), render ProductDetails
          if (item.title) {
            return <ProductDetails key={item.id} product={item} />;
          }

          // Fallback: simple display
          return (
            <div key={item.id} className="p-4 border rounded bg-white shadow-sm flex items-center gap-4">
              <div className="w-20 h-20 bg-gray-100 rounded overflow-hidden flex items-center justify-center">
                {item.image ? (
                  <img src={item.image} alt={item.title || item.name} className="w-full h-full object-cover" />
                ) : (
                  <span className="text-sm text-gray-400">No image</span>
                )}
              </div>
              <div>
                <div className="font-medium text-gray-800">{item.name || item.title || "Item"}</div>
                <div className="text-sm text-gray-600">{item.description || item.cuisines?.join(", ")}</div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Cart;