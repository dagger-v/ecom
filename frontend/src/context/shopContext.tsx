import axios from "axios";
import { faRemoveFormat } from "@fortawesome/free-solid-svg-icons";
import { createContext, useState } from "react";
import useGetProducts from "../hooks/useGetProducts";
import { IProduct } from "../models/interface";

export interface IShopContext {
  getCartItemCount: (itemId: string) => number;
  addToCart: (itemId: string) => void;
  removeFromCart: (itemId: string) => void;
  updateCartItemCount: (newAmount: number, itemId: string) => void;
  getTotalCartAmount: () => number;
  checkout: () => void;
}

const defaultVal: IShopContext = {
  getCartItemCount: () => 0,
  addToCart: () => null,
  removeFromCart: () => null,
  updateCartItemCount: () => null,
  getTotalCartAmount: () => 0,
  checkout: () => null,
};

export const ShopContext = createContext<IShopContext>(defaultVal);

export const ShopContextProvider = (props) => {
  const [cartItems, setCartItems] = useState({});

  const { products } = useGetProducts();

  const getCartItemCount = (itemId: string) => {
    if (itemId in cartItems) {
      return cartItems[itemId];
    }
    return 0;
  };

  const addToCart = (itemId: string) => {
    if (!cartItems[itemId]) {
      setCartItems((prev) => ({ ...prev, [itemId]: 1 }));
    } else {
      setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
    }
  };

  const removeFromCart = (itemId: string) => {
    if (!cartItems[itemId]) return;
    if (cartItems[itemId] === 0) return;
    setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));
  };

  const updateCartItemCount = (newAmount: number, itemId: string) => {
    if (newAmount < 0) return;

    setCartItems((prev) => ({ ...prev, [itemId]: newAmount }));
  };

  const getTotalCartAmount = (): number => {
    let totalAmount = 0;
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        let itemInfo: IProduct = products.find(
          (product) => product._id === item
        );

        totalAmount += cartItems[item] * itemInfo.price;
      }
    }
    return totalAmount;
  };

  const checkout = async () => {
    const body = { customerId: localStorage.getItem("userId"), cartItems };
    try {
      await axios.post("http://localhost:5000/products/checkout", body, {});
    } catch (err) {
      console.log(err);
    }
  };

  const contextValue: IShopContext = {
    getCartItemCount,
    addToCart,
    removeFromCart,
    updateCartItemCount,
    getTotalCartAmount,
    checkout,
  };
  return (
    <ShopContext.Provider value={contextValue}>
      {props.children}
    </ShopContext.Provider>
  );
};
