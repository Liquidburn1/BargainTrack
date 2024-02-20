import React from "react";
import Image from "next/image";
import Searchbar from "@/components/searchbar";
import HeroCarosel from "@/components/herocarosel";
import { getAllProducts } from "@/lib/actions";
import ProductCard from "@/components/ProductCard";
const Home = async () => {
  const allproducts = await getAllProducts();
  return (
    <>
      <section className=" px-6 md:px-20 py-24">
        <div className=" flex max-xl:flex-col gap-16">
          <div className="flex flex-col justify-center">
            <p className="small-text">
              Smart Shopping Starts Here:
              <Image
                src="/assets/icons/arrow-right.svg"
                alt="arrow right"
                width={16}
                height={16}
              />
            </p>
            <h1 className="head-text">
              Unleash The Power Of{" "}
              <span className=" inline bg-gradient-to-r from-slate-600 via-slate-700 to-slate-900 text-transparent bg-clip-text">
                Bargain
              </span>
              {""}
              <span className=" inline bg-gradient-to-r from-red-400 via-red-500 to-red-700 text-transparent bg-clip-text ">
                Track
              </span>
            </h1>
            <p className="mt-6">
              Powerful, self-serve product and growth analytics to help you
              convert, engage, and retain more.
            </p>
            <Searchbar />
          </div>
          <HeroCarosel />
        </div>
      </section>

      <section className="trending-section">
        <h2 className="section-text">Trending</h2>
        <div className="flex flex-wrap gap-x-8 gap-y-16">
          {allproducts?.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
    </>
  );
};

export default Home;
