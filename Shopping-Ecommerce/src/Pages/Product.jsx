import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../Context/ShopContext";
import { useParams } from "react-router-dom";
import axios from "axios";
import Breadcrum from "../Components/Breadcrums/Breadcrum";
import ProductDisplay from "../Components/ProductDisplay/ProductDisplay";
import DescriptionBox from "../Components/DescriptionBox/DescriptionBox";
import RelatedProducts from "../Components/RelatedProducts/RelatedProducts";

// const Product = () => {
//   // debugger;
//   // const { products } = useContext(ShopContext);
//   // console.log("Products", products);

//   // const [products, setProducts] = useState([]);
//   // // const [newProducts, setNewProducts] = useState([]);

//   // useEffect(() => {
//   //   const getProducts = async () => {
//   //     const res = await axios.get("http://localhost:5000/products");
//   //     const data = await res.data;
//   //     console.log("Products", data);
//   //     setProducts(data);
//   //   };
//   //   getProducts();
//   // }, []);

//   // const { productId } = useParams();

//   // const newProducts = products.find((product) => product._id === productId);
//   // console.log("Id is", productId, "filtered data", newProducts);

//   const [products, setProducts] = useState([]); // Initialize as an empty array
//   const { productId } = useParams();

//   useEffect(() => {
//     const getProducts = async () => {
//       try {
//         const res = await axios.get("http://localhost:5000/products");
//         setProducts(res.data); // No need to extract data separately
//         console.log("Products", res.data);
//       } catch (error) {
//         console.error("Error fetching products:", error);
//       }
//     };
//     getProducts();
//   }, []);

//   // Ensure products exist before filtering
//   const newProduct = products.find((product) => product._id === productId);

//   console.log("Id is", productId, "filtered data", newProduct);

//   return (
//     <div>
//       <Breadcrum product={newProduct} />
//       <ProductDisplay product={newProduct} />
//       <DescriptionBox />
//       <RelatedProducts />
//     </div>
//   );
// };

const Product = () => {
  const [products, setProducts] = useState([]); // Initialize as an empty array
  const { productId } = useParams();
  const [loading, setLoading] = useState(true); // Track loading state

  useEffect(() => {
    const getProducts = async () => {
      try {
        const res = await axios.get("http://localhost:5000/products");
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
