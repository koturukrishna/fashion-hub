import React, { createContext, useEffect, useState } from "react";
import axios from "axios";
import all_product from "../Components/Assets/all_product";

export const ShopContext = createContext(null);

// const getDefaultCart = () => {
//   let cart = {};
//   for (let index = 0; index < all_product.length + 1; index++) {
//     cart[index] = 0;
//   }
//   return cart;
// };

const ShopContextProvider = (props) => {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    const getProducts = async () => {
      const res = await axios.get("http://localhost:5000/products");
      const data = await res.data;
      // console.log("Data", data);
      setProducts(data);
    };
    getProducts();
  }, []);

  // console.log("All Products", products);

  const getDefaultCart = () => {
    let cart = {};
    for (let index = 0; index < products?.length + 1; index++) {
      cart[index] = 0;
    }
    return cart;
  };

  const [cartItems, setCartItems] = useState([]);

  // const addToCart = (itemId) => {
  //   debugger;
  //   setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
  //   console.log(cartItems);
  // };

  const addToCart = (product) => {
    setCartItems((prev) => [...prev, { product }]);
  };

  // console.log("cartItems", cartItems);

  const removeFromCart = (itemId) => {
    setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));
  };

  const getTotalCartAmount = () => {
    let totalAmount = 0;
    for (let item in cartItems) {
      if (cartItems[item] > 0) {
        let itemInfo = products.find((product) => product._id === item);
        totalAmount += itemInfo.new_price * cartItems[item];
      }
    }
    return totalAmount;
  };

  const contextValue = {
    getTotalCartAmount,
    products,
    cartItems,
    addToCart,
    removeFromCart,
  };
  return (
    <ShopContext.Provider value={contextValue}>
      {props.children}
    </ShopContext.Provider>
  );
};

export default ShopContextProvider;
