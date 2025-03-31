import React, { useEffect, useState } from "react";
import "./CSS/LoginSignup.css";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AddProduct = () => {
  const [productDetails, setProductDetails] = useState({
    name: "",
    category: "women",
    new_price: "",
    old_price: "",
  });

  const [photo, setPhoto] = useState(null);
  const [showProducts, setShowProducts] = useState([]);

  const handleUploadPhotos = (e) => {
    const newPhoto = e.target.files[0];
    setPhoto(newPhoto);
  };

  const { name, category, new_price, old_price } = productDetails;

  const handleChange = (event) => {
    const { target } = event;
    setProductDetails((prev) => ({ ...prev, [target.name]: target.value }));
  };

  const handleApiProductAdd = async (data) => {
    const headers = {
      headers: {
        Authorization: localStorage.getItem("token"),
      },
    };
    try {
      const url = "http://localhost:5000/products";
      const { data: res } = await axios.post(url, data, headers);
      console.log("product response", res);
      // alert("Product added successfully");
      toast.success("Product added Successfully", {
        position: "top-center",
        autoClose: 3000, // Auto dismiss in 3 seconds
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "colored",
      });
    } catch (error) {
      // console.log("Error", error.response.data.message);
      // alert(error.response.data.message);
      toast.error(error.response.data.message, {
        position: "top-center",
        autoClose: 3000,
      });
    }
    setProductDetails({
      name: "",
      category: "women",
      new_price: "",
      old_price: "",
    });
    setPhoto(null);
  };

  const handleAddProduct = () => {
    // console.log("done", productDetails);

    try {
      /* Create a new FormData onject to handle file uploads */
      const listingForm = new FormData();
      listingForm.append("name", name);
      listingForm.append("category", category);
      listingForm.append("new_price", new_price);
      listingForm.append("old_price", old_price);

      /* Append each selected photos to the FormData object */
      //   listingForm.append("listingPhotos", photo);
      if (photo) {
        listingForm.append("listingPhoto", photo); // Append only one file
      } else {
        console.warn("No photo selected");
      }

      // listingForm.forEach((value, key) => {
      //   console.log(key, value);
      // });
      handleApiProductAdd(listingForm);
      // console.log("product added success");
      //   console.log("Total details", listingForm);
    } catch (error) {
      console.log("error", error);
    }
  };

  useEffect(() => {
    const getProducts = async () => {
      const res = await axios.get("http://localhost:5000/products");
      const data = await res.data;
      // console.log("Data", data);
      setShowProducts(data);
    };
    getProducts();
  }, []);

  return (
    <div className="loginsignup">
      <div className="loginsignup-container">
        <div className="loginsignup-fields">
          <input
            type="text"
            placeholder="About Product"
            name="name"
            value={name}
            onChange={handleChange}
          />
          <h5>Select the Category</h5>
          <select
            name="category"
            value={category}
            defaultValue={"women"}
            onChange={handleChange}
          >
            <option value="women">women</option>
            <option value="men">men</option>
            <option value="kid">kid</option>
          </select>
          <input
            id="image"
            type="file"
            style={{ display: "none" }}
            accept="image/*"
            onChange={handleUploadPhotos}
          />
          <label htmlFor="image" className="together">
            <div className="icon"></div>
            <p>Upload image from your device</p>
          </label>
          {photo && (
            <img
              src={URL.createObjectURL(photo)}
              alt="product"
              style={{ width: "250px", height: "120px" }}
            />
          )}
          <input
            type="number"
            name="old_price"
            placeholder="Old Price"
            value={old_price}
            onChange={handleChange}
          />
          <input
            type="number"
            name="new_price"
            placeholder="New Price"
            value={new_price}
            onChange={handleChange}
          />
        </div>
        {/* {showProducts.map((product) => {
          return (
            <div key={product._id}>
              <p>{product.name}</p>
              <img
                src={`http://localhost:5000/${product.photo?.replace(
                  "public",
                  ""
                )}`}
                // alt={`${product.photo}`}
                alt={`http://localhost:5000/${product.photo?.replace(
                  "public",
                  ""
                )}`}
                style={{ width: "210px", height: "130px" }}
              />
            </div>
          );
        })} */}
        <button onClick={handleAddProduct}>Add Product</button>
      </div>
      <ToastContainer />
    </div>
  );
};

export default AddProduct;
