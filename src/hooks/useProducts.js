import { useEffect, useState } from "react";

export default function useProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const controller = new AbortController();

    async function loadProducts() {
      try {
        setLoading(true);
        setError("");

        const response = await fetch("https://fakestoreapi.com/products", {
          signal: controller.signal
        });

        if (!response.ok) {
          throw new Error("Could not load sample products.");
        }

        const data = await response.json();

        setProducts(
          data.map((item) => ({
            id: item.id,
            name: item.title,
            category: item.category,
            quantity: 10,
            unit: "pieces",
            price: Number(item.price)
          }))
        );
      } catch (err) {
        if (err.name !== "AbortError") {
          setError("Could not load sample products. Check your internet connection.");
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    }

    loadProducts();

    return () => controller.abort();
  }, []);

  return { products, loading, error };
}