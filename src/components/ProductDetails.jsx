import React from "react";
import AddToCartButton from "./AddToCartButton";

const ProductDetails = ({ product }) => {
  if (!product) return null;

  return (
    <div className="mt-6 bg-white shadow-lg rounded-lg p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="space-y-3">
        <img
          src={product.thumbnail}
          alt={product.title}
          className="w-full h-80 object-cover rounded-lg border border-gray-200 shadow-sm"
        />
        {product.images?.length > 1 && (
          <div className="flex flex-wrap gap-2 mt-2">
            {product.images.slice(0, 4).map((img, i) => (
              <img
                key={i}
                src={img}
                alt={`${product.title} ${i + 1}`}
                className="w-24 h-24 object-cover rounded-md border border-gray-200 hover:scale-105 transition-transform"
              />
            ))}
          </div>
        )}
      </div>

      <div>
        <h1 className="text-3xl font-extrabold text-gray-900">{product.title}</h1>
        <p className="text-gray-600 mt-2">{product.description}</p>

        <div className="mt-4 space-y-3">
          <div className="text-sm text-gray-700">
            <span className="font-medium">Brand:</span> <span className="text-gray-600">{product.brand}</span>
          </div>
          <div className="text-sm text-gray-700">
            <span className="font-medium">Category:</span> <span className="text-gray-600">{product.category}</span>
          </div>

          <div className="flex items-baseline gap-4">
            <div className="text-3xl font-bold text-gray-900">${product.price}</div>
            <div className="px-2 py-1 bg-green-50 text-green-700 rounded-md text-sm font-medium">{product.rating} ★</div>
          </div>

          {product.stock !== undefined && (
            <div className="text-sm text-gray-600">
              <span className="font-medium">In stock:</span> <span className="text-gray-700">{product.stock}</span>
            </div>
          )}
        </div>

        {/* ADD TO CART */}
        <div className="mt-6">
          <AddToCartButton item={product} className="" />
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;