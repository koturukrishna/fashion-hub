import React, { useEffect, useState } from "react";
import "./RelatedProducts.css";
import Item from "../Item/Item";
import axios from "axios";
const RelatedProducts = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const getProducts = async () => {
      const res = await axios.get(
        "https://fashion-hub-jz6j.onrender.com/products"
      );
      const data = await res.data;
      // console.log("Popular Data", data);
      setProducts(data);
    };
    getProducts();
  }, []);

  const popularWomen = products.filter((women) => women.category === "women");
  const women4Products = popularWomen.slice(0, 4);
  // console.log("Women", women4Products);

  return (
    <div className="relatedproducts">
      <h1>Related products</h1>
      <hr />
      <div className="relatedproducts-item">
        {women4Products.map((item, i) => {
          return (
            <Item
              key={i}
              id={item._id}
              name={item.name}
              image={item.photo}
              new_price={item.new_price}
              old_price={item.old_price}
            />
          );
        })}
      </div>
    </div>
  );
};

export default RelatedProducts;
