import React from "react";
import "./Item.css";
import { Link } from "react-router-dom";

const Item = (props) => {
  // console.log("Product details", props);

  return (
    <div className="item">
      <Link to={`/product/${props.id}`}>
        <img
          onClick={window.scrollTo(0, 0)}
          // src={`https://fashion-hub-jz6j.onrender.com/${props.photo?.replace("public", "")}`}
          src={props.image}
          // src="https://fashion-hub-jz6j.onrender.com/uploads/product_1.png"
          // style={{ width: "250px", height: "170px" }}

          className="popular-image"
          alt=""
        />
      </Link>
      <p>{props.name}</p>
      <div className="item-prices">
        <div className="item-price-new">${props.new_price}</div>
        <div className="item-price-old">${props.old_price}</div>
      </div>
    </div>
  );
};

export default Item;
