"use client";
import React from "react";
import Image from "next/image";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
const utility = [
  { imgUrl: "/assets/images/hero-1.svg", alt: "SmartWatch" },
  { imgUrl: "/assets/images/hero-2.svg", alt: "bag" },
  { imgUrl: "/assets/images/hero-4.svg", alt: "airfryer" },
  { imgUrl: "/assets/images/hero-5.svg", alt: "chair" },
  { imgUrl: "/assets/images/hero3.png", alt: "airpods max" },
];
function HeroCarosel() {
  return (
    <div>
      <Carousel
        className="hero-carousel"
        showThumbs={false}
        autoPlay
        infiniteLoop={true}
        interval={2000}
        showArrows={false}
        showStatus={false}
        axis="horizontal"
      >
        {utility.map((i) => (
          <Image
            className="object-contain"
            src={i.imgUrl}
            alt={i.alt}
            key={i.alt}
            width={484}
            height={484}
          />
        ))}
      </Carousel>
      <Image
        src="/assets/icons/hand-drawn-arrow.svg"
        alt="arrow"
        width={175}
        height={175}
        className="max-xl:hidden absolute -ml-[100px] -mt-[200px] z-0"
      />
    </div>
  );
}

export default HeroCarosel;
