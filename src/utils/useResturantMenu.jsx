import { useEffect, useState } from "react";

const useResturantMenu = (id) => {
  const [resInfo, setResInfo] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchData();
  }, [id]);

  const fetchData = async () => {
    try {
      // guard: require an id
      if (!id) {
        setError("No recipe id provided in the route.");
        return;
      }

      setError("");
      setResInfo(null); // show Shimmer while loading

      const url = `https://dummyjson.com/recipes/${id}`;
      const resp = await fetch(url);
      if (!resp.ok) {
        throw new Error(`Request failed: ${resp.status} ${resp.statusText}`);
      }
      const json = await resp.json();
      setResInfo(json);
      // console.log("Single recipe:", json);
    } catch (e) {
      console.error(e);
      setError(e?.message || "Failed to load recipe.");
    }
  };

  return { resInfo, error };
};

export default useResturantMenu;