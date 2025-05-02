import React, { useEffect, useState } from "react";
import "./CSS/ShopCategory.css";
import axios from "axios";
import Item from "../Components/Item/Item";

const ShopCategory = (props) => {
  // const { products } = useContext(ShopContext);

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
  const [sortValue, setSortValue] = useState("low");
  // console.log("Products", products);

  const sortedProducts = [...products].sort((a, b) => {
    if (sortValue === "low") return a.new_price - b.new_price;
    if (sortValue === "high") return b.new_price - a.new_price;
    return 0; // Default order
  });

  const filteredProducts = sortedProducts.filter(
    (product) => product.category === props.category
  );
  // console.log("filtered are", filteredProducts);

  // console.log("Sorted Products are", sortedProducts);

  return (
    <div className="shop-category">
      <img className="shopcategory-banner" src={props.banner} alt="" />
      <div className="shopcategory-indexSort">
        <p>
          <span>Showing 1-{filteredProducts.length}</span> out of{" "}
          {sortedProducts.length} products
        </p>

        <div>
          sort by price &nbsp;
          <select
            name="sortValue"
            value={sortValue}
            // defaultValue={"low"}
            onChange={(e) => setSortValue(e.target.value)}
            className="shopcategory-sort"
            style={{ paddingRight: "10px" }}
          >
            <option value="low">Low</option>
            <option value="high">High</option>
          </select>
        </div>
      </div>
      <div className="shopcategory-products">
        {sortedProducts.map((item, i) => {
          if (props.category === item.category) {
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
          } else {
            return null;
          }
        })}
      </div>
      <div className="shopcategory-loadmore">Explore More</div>
    </div>
  );
};

export default ShopCategory;
