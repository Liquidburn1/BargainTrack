/* eslint-disable @typescript-eslint/no-explicit-any */

import axios from "axios";
import * as cheerio from "cheerio";
import { extractCurrency, extractDescription } from "../functions/utils";
/* eslint-disable @typescript-eslint/no-unused-vars */
export async function scrapeAmazonProduct(url: string) {
  if (!url) return;
  const username = String(process.env.BRIGHT_DATA_USERNAME);
  const password = String(process.env.BRIGHT_DATA_PASSWORD);
  const port = 2225;
  const session_ID = (1000000 * Math.random()) | 0;
  const options = {
    auth: { username: `${username}-session-${session_ID}`, password },
    host: "brd.superproxy.io",
    port,
    rejectUnauthorized: false,
  };

  try {
    //Fetch product page
    const response = await axios.get(url, options);
    // console.log(response.data);
    const $ = cheerio.load(response.data);

    const title = $("#productTitle").text().trim();

    // const currentPrice = extractprice($(".a-price span.a-offscreen ").html());
    const test1 = $(".a-price span.a-offscreen ").html();
    const currentprice = test1
      ?.toString()
      .replace("$", "")
      ?.replace(/,/g, "")
      .trim();

    const test = $(".a-size-small span.a-offscreen").html();
    const originalprice = test
      ?.toString()
      .replace("$", "")
      ?.replace(/,/g, "")
      .trim();

    const outofstock =
      $("#availability span").text().trim().toLowerCase() ===
      "currently unavailable";

    const image =
      $("#imgBLKFront").attr("data-a-dynamic-image") ||
      $("#landingImage").attr("data-a-dynamic-image") ||
      "{}";

    //const category = $(".ac-for-text").text();
    //also get it for catLink
    const imgurls = Object.keys(JSON.parse(image));
    const currency = extractCurrency($(".a-price-symbol"));
    const discountperc = $(".a-section span.savingsPercentage").html();
    const discountrate = discountperc?.toString().replace(/[-%]/g, "") || 0;
    const description = extractDescription($);

    const data = {
      url,
      currency: currency || "$",
      image: imgurls[0],
      title,
      currentPrice: Number(currentprice) || Number(originalprice),
      originalPrice: Number(originalprice) || Number(currentprice),
      discountrate: Number(discountrate),
      pricehistory: [],
      description,
      category: "catergory",
      isoutofstock: outofstock,
      reviewsCount: 100,
      stars: 4.5,
      lowestPrice: Number(currentprice) || Number(originalprice),
      highestprice: Number(originalprice) || Number(currentprice),
      average: Number(currentprice) || Number(originalprice),
    };

    return data;

    //catch
  } catch (error: any) {
    throw new Error(`Failed to scrape product : ${error.message}`);
  }
}

//sephora scraper
export async function scrapeultaProduct(url: string) {
  if (!url) return;
  const username = String(process.env.BRIGHT_DATA_USERNAME);
  const password = String(process.env.BRIGHT_DATA_PASSWORD);
  const port = 2225;
  const session_ID = (1000000 * Math.random()) | 0;
  const options = {
    auth: { username: `${username}-session-${session_ID}`, password },
    host: "brd.superproxy.io",
    port,
    rejectUnauthorized: false,
  };
  try {
    //Fetch product page
    const response = await axios.get(url, options);
    const $ = cheerio.load(response.data);
    const producttitle = $(".Text-ds--title-5").text().trim();
    const productprice = $(".ProductPricing .Text-ds--title-6").text().trim();
    const originalprice =
      $(".ProductPricing .Text-ds--line-through").text().trim() || "";
    const avaliable = $(".ProductActions .AddToBagButton__AddToBag") || "";

    //product info

    const rating = $(".ProductInformation .ReviewStars__Content .Text-ds ")
      .text()
      .trim();
    let outofstock: boolean;
    if (avaliable.html()) {
      outofstock = false;
    } else {
      outofstock = true;
    }

    console.log(
      producttitle,
      " ",
      productprice,
      " ",
      originalprice,
      " Out of Stock:",
      outofstock,
      "Rating:",
      rating + "/5"
    );
  } catch (error: any) {
    throw new Error(`Failed to scrape product : ${error.message}`);
  }
}
