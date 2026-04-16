import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import ProductDetails from "./ProductDetails";

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

      <ProductDetails product={product} />
    </div>
  );
};

export default ProductMenu;