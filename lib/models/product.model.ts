/* eslint-disable @typescript-eslint/no-unused-vars */
import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    url: { type: String, required: true, unique: true },
    currency: { type: String, required: true },
    image: { type: String, required: true },
    title: { type: String, required: true },
    currentPrice: { type: Number, required: true },
    originalPrice: { type: Number, required: true },
    priceHistory: [
      {
        price: { type: Number, required: true },
        date: { type: Date, default: Date.now },
      },
    ],
    lowestPrice: { type: Number },
    highestprice: { type: Number },
    averagePrice: { type: Number },
    discountrate: { type: Number },

    description: { type: String },
    category: { type: String },
    reviewsCount: { type: Number },
    isOutOfStock: { type: Boolean, default: false },
    users: [{ email: { type: String, required: true } }],
    default: [],
  },
  { timestamps: true }
);

const Product =
  mongoose.models.AmazonProduct ||
  mongoose.model("AmazonProduct", productSchema);

export default Product;
