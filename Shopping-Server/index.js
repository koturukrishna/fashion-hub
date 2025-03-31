const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv").config();
const cors = require("cors");

const authRoutes = require("./routes/auth.js");
const productRoutes = require("./routes/products.js");

app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("public/uploads"));

/* ROUTES */
app.use("/auth", authRoutes);
app.use("/products", productRoutes);

/* MONGOOSE SETUP */
const PORT = 5000;
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(PORT, () => console.log(`Server Port: ${PORT}`));
  })
  .catch((err) => console.log(`${err} did not connect`));
