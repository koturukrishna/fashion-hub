import React, { useContext } from "react";
import "./NewCollections.css";
import Item from "../Item/Item";
import { ShopContext } from "../../Context/ShopContext";

const NewCollections = () => {
  const { products } = useContext(ShopContext);

  const shuffledProducts = products.sort(() => Math.random() - 0.5);
  const all8Products = shuffledProducts.splice(0, 8);
  // console.log("all", all8Products);
  return (
    <div className="new-collections">
      <h1>NEW COLLECTIONS</h1>
      <hr />
      <div className="collections">
        {all8Products.map((item, i) => {
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

export default NewCollections;
