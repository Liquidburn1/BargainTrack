/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { revalidatePath } from "next/cache";
import Product from "../models/product.model";
import { connectToDB } from "../mongoose";
import { scrapeAmazonProduct } from "../scraper";
import { getAveragePrice, getHighestPrice, getLowestPrice } from "../utils";

//Scrape and store
export async function scrapeandstore(producturl: string) {
  if (!producturl) return;
  try {
    connectToDB();
    const scrapedProduct = await scrapeAmazonProduct(producturl);

    if (!scrapedProduct) return;

    let product = scrapedProduct;
    const existingProduct = await Product.findOne({ url: scrapedProduct.url });
    if (existingProduct) {
      //temp var
      const UpdatedPriceHistory: any = [
        ...existingProduct.priceHistory,
        { price: scrapedProduct.currentPrice },
      ];

      product = {
        ...scrapedProduct,
        priceHistory: UpdatedPriceHistory,
        lowestPrice: getLowestPrice(UpdatedPriceHistory),
        highestprice: getHighestPrice(UpdatedPriceHistory),
        averagePrice: getAveragePrice(UpdatedPriceHistory),
      };
    }
    const newProduct = await Product.findOneAndUpdate(
      { url: scrapedProduct.url },
      product,
      { upsert: true, new: true }
    );
    revalidatePath(`/AmazonProduct/${newProduct._id}`);
    // console.log(scrapedProduct);
  } catch (error) {
    console.log("Issue Faced try again later ", error);
  }
}

//product by ID
export async function getProductByID(productId: string) {
  try {
    connectToDB();
    const product = await Product.findOne({ _id: productId });
    if (!product) return null;

    return product;
  } catch (error) {
    console.log(error);
  }
}

export async function getAllProducts() {
  try {
    connectToDB();
    const arr = await Product.find();
    return arr; // returns all the products to show in the home page
  } catch (error) {
    console.log(error);
  }
}

export async function getSimilarProducts(productid: string) {
  try {
    connectToDB();
    const currentproduct = await Product.findById(productid);
    if (!currentproduct) return null;
    const similarProducts = await Product.find({
      _id: { $ne: productid },
    }).limit(3);
    return similarProducts;
  } catch (error) {
    console.log(error);
  }
}
