import React, { useContext, useState } from "react";
import "./CartItems.css";
import { ShopContext } from "../../Context/ShopContext";
import remove_icon from "../Assets/cart_cross_icon.png";
import { useDispatch, useSelector } from "react-redux";
import { deleteCartItem } from "../ReduxStore/GloalCartStore";
import { useNavigate } from "react-router-dom";

const CartItems = () => {
  const { getTotalCartAmount, products, cartItems, removeFromCart } =
    useContext(ShopContext);
  //   console.log("Cart Total Amount", getTotalCartAmount());

  const cartItems2 = useSelector((state) => state.cartListItems.cartItems);
  const dispatch = useDispatch();

  const totalPrice = cartItems2.map(
    (eachItem) => eachItem.new_price * eachItem.quantity
  );
  let total = 0;

  if (cartItems2.length > 0) {
    total = totalPrice.reduce((acc, new_price) => acc + new_price);
  }
  const itemsCount = cartItems2.length;

  const navigate = useNavigate();
  const [promoCode, setPromoCode] = useState("");
  const [finalTotal, setFinalTotal] = useState(total);

  const finalAmountAfterPromoCode = () => {
    // console.log("for promo code");

    // if (promoCode === "12345") {
    //   total = total - total / 10;
    //   setFinalTotal(total)
    //   console.log("Total Price", total);

    // }
    console.log("Applying promo code...");

    if (promoCode === "12345") {
      const discountedTotal = total - total / 10;
      setFinalTotal(discountedTotal); // Update state to reflect new price
      console.log("Total after discount:", discountedTotal);
    } else {
      setFinalTotal(total); // Reset if promo code is wrong
    }
    setPromoCode("");
  };

  const handleShowNow = () => {
    navigate("/mens");
  };

  return (
    <div>
      {cartItems2.length !== 0 ? (
        <div className="cartitems">
          <div className="cartitems-format-main">
            <p>Products</p>
            <p>Title</p>
            <p>Price</p>
            <p>Quantity</p>
            <p>Total</p>
            <p>Remove</p>
          </div>
          <hr />
          {cartItems2.map((e) => {
            return (
              <div key={e._id}>
                <div className="cartitems-format cartitems-format-main">
                  <img
                    className="carticon-product-icon"
                    src={`http://localhost:5000/${e.photo?.replace(
                      "public",
                      ""
                    )}`}
                    onClick={() => {
                      // removeFromCart(e._id);
                      dispatch(deleteCartItem(e._id));
                    }}
                    alt=""
                  />
                  <p>{e.name}</p>
                  <p>${e.new_price}</p>
                  <button className="cartitems-quantity">{e.quantity}</button>
                  <p>${e.new_price * e.quantity}</p>
                  <img
                    className="cartitems-remove-icon"
                    src={remove_icon}
                    onClick={() => {
                      // removeFromCart(e._id);
                      dispatch(deleteCartItem(e._id));
                    }}
                    alt=""
                  />
                </div>
                <hr />
              </div>
            );
          })}
          <div className="cartitems-down">
            <div className="cartitems-total">
              <h1>Cart Totals</h1>
              <div>
                <div className="cartitems-total-item">
                  <p>Subtotal</p>
                  <p>${finalTotal}</p>
                </div>
                <hr />
                <div className="cartitems-total-item">
                  <p>Shipping Fee</p>
                  <p>Free</p>
                </div>
                <hr />
                <div className="cartitems-total-item">
                  <h3>Total</h3>
                  <h3>${finalTotal}</h3>
                </div>
              </div>
              <button>PROCEED TO CHECKOUT</button>
            </div>
            <div className="cartitems-promocode">
              <p>if you have a promo code, Enter it here</p>
              <div className="cartitems-promobox">
                <input
                  type="text"
                  placeholder="promo code"
                  value={promoCode}
                  name="promoCode"
                  onChange={(e) => setPromoCode(e.target.value)}
                />
                <button onClick={finalAmountAfterPromoCode}>Submit</button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div>
          {/* <p>empty cart</p> */}
          <div className="empty-cart">
            <img
              src="https://cdn-icons-png.flaticon.com/512/1170/1170678.png"
              alt="Empty Cart"
              className="empty-cart-img"
            />
            <h2>Your Cart is Empty</h2>
            <p>Looks like you haven't added anything to your cart yet.</p>
            <button onClick={handleShowNow} className="shop-now-btn">
              Shop Now
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartItems;
