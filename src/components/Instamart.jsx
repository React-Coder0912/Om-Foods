import React, { useEffect, useState } from "react";
import Shimmer from "./Shimmer";
import ProductCard from "./ProductCard";

const Instamart = () => {
  const [products, setProducts] = useState([]);
  const [status, setStatus] = useState("idle"); // idle|loading|success|error
  const [error, setError] = useState(null);
  const[searchTerm, setSearchTerm] = useState("");
  const[page, setPage] = useState(1);

  const perPage = 12;

  const startIndex = (page - 1) * perPage;
  const endIndex = startIndex + perPage;

  const filteredProducts = products.filter((p) => p.title.toLowerCase().includes(searchTerm.toLowerCase()));

  const paginatedProducts = filteredProducts.slice(startIndex, endIndex);

  const fetchData = async () => {
    try {
      setStatus("loading");
      const data = await fetch("https://dummyjson.com/products");
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

        <div className="w-full flex justify-center my-4">
          <input type="text" placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="px-4 py-2 border rounded w-1/2"  />
          </div>

      {paginatedProducts.map((p) => (
        <ProductCard key={p.id} id={p.id} title={p.title} image={p.thumbnail} />
      ))}
      <div className="w-full flex justify-center my-4">
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded disabled:bg-gray-400"
          onClick={() => setPage((prev) => prev - 1)}
          disabled={page === 1}
        >
          Previous
        </button>
        <span className="mx-4">Page {page}</span>
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded disabled:bg-gray-400"
          onClick={() => setPage((prev) => prev + 1)}
          disabled={endIndex >= filteredProducts.length}
        >
          Next
        </button> 
        </div>
    </div>
  );
};

export default Instamart;