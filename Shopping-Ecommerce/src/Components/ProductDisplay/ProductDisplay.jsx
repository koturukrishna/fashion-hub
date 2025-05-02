import React, { useState } from "react";
import "./ProductDisplay.css";
import star_icon from "../Assets/star_icon.png";
import star_dull_icon from "../Assets/star_dull_icon.png";
import { addCartItem } from "../ReduxStore/GloalCartStore";
import { useDispatch } from "react-redux";

const ProductDisplay = (props) => {
  const { product } = props;
  const dispatch = useDispatch();

  // console.log(product.photo, "krishna");

  // const imageUrl = `https://fashion-hub-jz6j.onrender.com/${product.photo?.replace(
  //   "public",
  //   ""
  // )}`;

  const imageUrl = product.photo;

  const [selectedSize, setSelectedSize] = useState(null); // Store selected size

  const sizes = ["S", "M", "L", "XL", "XXL"];
  return (
    <div className="productdisplay">
      <div className="productdisplay-left">
        <div className="productdisplay-img-list">
          <img src={imageUrl} alt="" />
          <img src={imageUrl} alt="" />
          <img src={imageUrl} alt="" />
          <img src={imageUrl} alt="" />
        </div>
        <div className="productdisplay-img">
          <img className="productdisplay-main-img" src={imageUrl} alt="" />
        </div>
      </div>
      <div className="productdisplay-right">
        <h1>{product.name}</h1>
        <div className="productdisplay-right-stars">
          <img src={star_icon} alt="" />
          <img src={star_icon} alt="" />
          <img src={star_icon} alt="" />
          <img src={star_icon} alt="" />
          <img src={star_dull_icon} alt="" />
          <p>(122)</p>
        </div>
        <div className="productdisplay-right-prices">
          <div className="productdisplay-right-price-old">
            ${product.old_price}
          </div>
          <div className="productdisplay-right-price-new">
            ${product.new_price}
          </div>
        </div>
        <div className="productdisplay-right-description">
          A lightweight, usually knitted, pullover shirt, close fitting and with
          a round neckline and short sleeves, worn as an undershirt or outer
          garment.
        </div>
        <div className="productdisplay-right-size">
          <h1>Select Size</h1>

          <div className="size-container">
            {sizes.map((size) => (
              <div
                key={size}
                className={`size-box ${
                  selectedSize === size ? "selected" : ""
                }`}
                onClick={() => setSelectedSize(size)}
              >
                {size}
              </div>
            ))}
          </div>
        </div>
        <button
          onClick={() => {
            dispatch(
              addCartItem({
                ...product,
                id: product._id,
                quantity: 1,
                size: selectedSize,
              })
            );
          }}
        >
          ADD To CART
        </button>
        <p className="productdisplay-right-category">
          <span>Category :</span>Women, T-Shirt, Crop Top
        </p>
        <p className="productdisplay-right-category">
          <span>Tags :</span>Modern, Latest
        </p>
      </div>
    </div>
  );
};

export default ProductDisplay;
