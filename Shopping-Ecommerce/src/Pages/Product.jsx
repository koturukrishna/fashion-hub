import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Breadcrum from "../Components/Breadcrums/Breadcrum";
import ProductDisplay from "../Components/ProductDisplay/ProductDisplay";
import DescriptionBox from "../Components/DescriptionBox/DescriptionBox";
import RelatedProducts from "../Components/RelatedProducts/RelatedProducts";

const Product = () => {
  const [products, setProducts] = useState([]); // Initialize as an empty array
  const { productId } = useParams();
  const [loading, setLoading] = useState(true); // Track loading state

  useEffect(() => {
    const getProducts = async () => {
      try {
        const res = await axios.get(
          "https://fashion-hub-jz6j.onrender.com/products"
        );
        setProducts(res.data);
        // console.log("Products", res.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false); // Set loading to false after fetching
      }
    };
    getProducts();
  }, []);

  // Ensure products exist before filtering
  const newProduct = products.find((product) => product._id === productId);

  // console.log("Id is", productId, "filtered data", newProduct);

  // Show loading state while fetching data
  if (loading) {
    return <p>Loading...</p>;
  }

  // Show a message if the product is not found
  if (!newProduct) {
    return <p>Product not found</p>;
  }

  return (
    <div>
      <Breadcrum product={newProduct} />
      <ProductDisplay product={newProduct} />
      <DescriptionBox />
      <RelatedProducts />
    </div>
  );
};

export default Product;
