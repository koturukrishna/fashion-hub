const mongoose = require("mongoose");
const Joi = require("joi");

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: { type: String, required: true },
  photo: { type: String, required: true },
  old_price: { type: Number, required: true },
  new_price: { type: Number, required: true },
});

const Product = mongoose.model("Product", productSchema);

// const validateProduct = (data) => {
//   const schema = Joi.object({
//     name: Joi.string().required().label("Product Name"),
//     category: Joi.string().required().label("Category"),
//     photo: Joi.string().String().required().label("Image URL"),
//     old_price: Joi.number().positive().required().label("Old Price"),
//     new_price: Joi.number().positive().required().label("Old Price"),
//   });
//   return schema.validate(data);
// };

module.exports = { Product };
