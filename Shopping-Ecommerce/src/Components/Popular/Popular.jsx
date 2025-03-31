import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import "./Popular.css";
// import data_product from "../Assets/data";
import Item from "../Item/Item";
import { ShopContext } from "../../Context/ShopContext";

const Popular = () => {
  // const { products } = useContext(ShopContext);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const getProducts = async () => {
      const res = await axios.get("http://localhost:5000/products");
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
    <div className="popular">
      <h1>POPULAR IN WOMEN</h1>
      <hr />
      <div className="popular-item">
        {women4Products.map((item, i) => {
          return (
            <Item
              key={i}
              id={item._id}
              name={item.name}
              image={`http://localhost:5000/${item.photo?.replace(
                "public",
                ""
              )}`}
              new_price={item.new_price}
              old_price={item.old_price}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Popular;
