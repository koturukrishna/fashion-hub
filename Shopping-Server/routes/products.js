const router = require("express").Router();
const multer = require("multer");
const { Product } = require("../models/Product");
const ensureAuthenticated = require("../middleware/auth");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/uploads/"); // Store uploaded files in the 'uploads' folder
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname); // Use the original file name
  },
});

const upload = multer({ storage });

//  Add New Product
router.post(
  "/",
  ensureAuthenticated,
  upload.single("listingPhoto"),
  async (req, res) => {
    // console.log("---- logged in user detail ---", req.user);

    try {
      const { name, category, old_price, new_price } = req.body;
      const photo = req.file.path.replace(/\\/g, "/").replace("public/", "");

      const product = new Product({
        name,
        category,
        old_price,
        new_price,
        photo, // Save single file path
      });
      // const product = new Product(req.body);

      await product.save();
      res
        .status(201)
        .send({ message: "Product created successfully", product });
    } catch (error) {
      res.status(500).send({ message: "Internal Server Error" });
    }
  }
);

// 📦 Get All Products
router.get("/", async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).send(products);
  } catch (error) {
    res.status(500).send({ message: "Internal Server Error" });
  }
});

// 🔍 Get a Single Product by ID
router.get("/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).send({ message: "Product not found" });

    res.status(200).send(product);
  } catch (error) {
    res.status(500).send({ message: "Internal Server Error" });
  }
});

// 📝 Update Product by ID
router.put("/:id", async (req, res) => {
  try {
    const { error } = validateProduct(req.body);
    if (error)
      return res.status(400).send({ message: error.details[0].message });

    const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!product) return res.status(404).send({ message: "Product not found" });

    res.status(200).send({ message: "Product updated successfully", product });
  } catch (error) {
    res.status(500).send({ message: "Internal Server Error" });
  }
});

// 🗑️ Delete Product by ID
router.delete("/:id", async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) return res.status(404).send({ message: "Product not found" });

    res.status(200).send({ message: "Product deleted successfully" });
  } catch (error) {
    res.status(500).send({ message: "Internal Server Error" });
  }
});

module.exports = router;
