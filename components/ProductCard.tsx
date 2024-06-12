/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { Product } from "@/types";
import Link from "next/link";
import Image from "next/image";
interface Props {
  product: Product;
}

const ProductCard = ({ product }: Props) => {
  return (
    <Link
      href={`/products/${product._id}`}
      className="product-card transform transition duration-500 hover:scale-110 border-4  p-3 shadow-xl"
    >
      <div className="product-card_img-container ">
        <Image
          src={product.image}
          alt={product.title}
          width={200}
          height={200}
          className="product-card_img"
        />
      </div>
      <div className="flex flex-col gap-3 border-t-2 p-2">
        <h3 className="product-title">{product.title}</h3>
      </div>
      <div className="flex justify-between">
        <p className="text-black opacity-50 text-lg capitalize">
          {product.category}
        </p>
        <p className="text-black text-lg font-semibold">
          <span>{product?.currency}</span>
          <span>{product?.currentPrice}</span>
        </p>
      </div>
    </Link>
  );
};

export default ProductCard;
