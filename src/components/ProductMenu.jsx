import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

const ProductMenu = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [status, setStatus] = useState("idle"); // idle|loading|success|error
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadProduct = async () => {
      try {
        setStatus("loading");
        const res = await fetch(`https://dummyjson.com/products/${id}`);
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const json = await res.json();
        setProduct(json);
        setStatus("success");
      } catch (err) {
        setError(err.message);
        setStatus("error");
      }
    };
    loadProduct();
  }, [id]);

  if (status === "loading") return <div className="p-4">Loading…</div>;
  if (status === "error")
    return (
      <div className="p-4 text-red-600">
        Failed to load product: {error} — <Link to="/instamart" className="underline">Go back</Link>
      </div>
    );

  if (!product) return null;

  return (
    <div className="max-w-4xl mx-auto p-4">
      <Link to="/instamart" className="text-blue-600 underline">&larr; Back to products</Link>

      <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-3">
          <img
            src={product.thumbnail}
            alt={product.title}
            className="w-full h-full object-cover rounded-lg border"
          />
          {/* Optional: show additional images */}
          {product.images?.length > 1 && (
            <div className="flex flex-wrap gap-2">
              {product.images.slice(0, 4).map((img, i) => (
                <img
                  key={i}
                  src={img}
                  alt={`${product.title} ${i + 1}`}
                  className="w-24 h-24 object-cover rounded-md border"
                />
              ))}
            </div>
          )}
        </div>

        <div>
          <h1 className="text-2xl font-semibold">{product.title}</h1>
          <p className="text-gray-700 mt-2">{product.description}</p>

          <div className="mt-4 space-y-1">
            <div><span className="font-medium">Brand:</span> {product.brand}</div>
            <div><span className="font-medium">Category:</span> {product.category}</div>
            <div><span className="font-medium">Price:</span> ${product.price}</div>
            <div><span className="font-medium">Rating:</span> {product.rating} / 5</div>
            {product.stock !== undefined && (
              <div><span className="font-medium">In stock:</span> {product.stock}</div>
            )}
          </div>

          <button className="mt-6 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
            Add to cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductMenu;