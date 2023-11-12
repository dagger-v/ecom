import { useEffect, useState } from "react";
import useGetToken from "./useGetToken";
import axios from "axios";
import { IProduct } from "../models/interface";

const useGetProducts = () => {
  const [products, setProducts] = useState<IProduct[]>([]);
  const { headers } = useGetToken();

  const fetchProducts = async () => {
    try {
      const fetchedProducts = await axios.get("http://localhost:5000/product", {
        headers,
      });

      setProducts(fetchedProducts.data.products);
    } catch (err) {
      alert("ERROR: Something Went Wrong");
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);
  return { products };
};

export default useGetProducts;
