import React, { useEffect, useState } from "react";
import Shimmer from "./Shimmer";
import ProductCard from "./ProductCard";

const Instamart = () => {
  const [products, setProducts] = useState([]);
  const [status, setStatus] = useState("idle"); // idle|loading|success|error
  const [error, setError] = useState(null);

  const fetchData = async () => {
    try {
      setStatus("loading");
      const data = await fetch("https://dummyjson.com/products?limit=500");
      if (!data.ok) throw new Error(`HTTP ${data.status}`);
      const json = await data.json();
      setProducts(json.products || []);
      setStatus("success");
    } catch (err) {
      setError(err.message);
      setStatus("error");
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (status === "loading") return <Shimmer />;
  if (status === "error")
    return (
      <div className="p-4 text-red-600">
        Failed to load products: {error}
      </div>
    );

  return (
    <div className="flex flex-wrap justify-center">
      {products.map((p) => (
        <ProductCard key={p.id} id={p.id} title={p.title} image={p.thumbnail} />
      ))}
    </div>
  );
};

export default Instamart;