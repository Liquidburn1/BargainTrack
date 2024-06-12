/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import { ultascrapeandstore, amazonscrapeandstore } from "@/lib/actions";
import React, { FormEvent, useState } from "react";
import amazonicon from "../public/assets/icons/Amazon_icon.png";
import ulta from "../public/assets/icons/ultaicon.png";
import Image from "next/image";

import { Toaster, toast } from "sonner";
function searchbar() {
  const [searchprompt, setsearchprompt] = useState("");
  const [isloading, setisLoading] = useState(false);

  const supportedicons = [
    { source: ulta, alt: "ulta", url: "https://www.ulta.com/" },
    { source: amazonicon, alt: "Amazon", url: "https://www.amazon.com/" },
  ];

  const isvalidamazonlink = (url: string) => {
    try {
      const parsedurl = new URL(url);

      const hostname = parsedurl.hostname;
      if (
        hostname.includes("amazon.com") ||
        hostname.includes("amazon.") ||
        hostname.endsWith("amazon")
      ) {
        console.log("its an amazon link");
        return true;
      }
    } catch (error) {
      return false;
    }
    return false;
  };
  const isvalidsephoralink = (url: string) => {
    try {
      const parsedurl = new URL(url);

      const hostname = parsedurl.hostname;
      if (
        hostname.includes("ulta.com") ||
        hostname.includes("ulta.") ||
        hostname.endsWith("ulta")
      ) {
        console.log("its a Ulta link");
        return true;
      }
    } catch (error) {
      return false;
    }
    return false;
  };

  //handling submit
  const handlesubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const isvalidlink = isvalidamazonlink(searchprompt);
    const isultalink = isvalidsephoralink(searchprompt);

    if (isvalidlink) {
      try {
        setisLoading(true);
        const Product = await amazonscrapeandstore(searchprompt);
      } catch (error) {
        console.log("error");
      } finally {
        setisLoading(false);
      }
    } else if (isultalink) {
      try {
        setisLoading(true);
        const Product = await ultascrapeandstore(searchprompt);
      } catch (error) {
        console.log("error");
      } finally {
        setisLoading(false);
      }
    } else {
      console.log("Wrong");
      toast.warning("Please Enter a valid Link", {
        description: "Either use an Amazon or Ulta Product Link",
      });
    }
    setsearchprompt("");
  };

  return (
    <>
      <form className="flex flex-wrap gap-4 mt-12" onSubmit={handlesubmit}>
        <input
          type="text"
          value={searchprompt}
          placeholder="Enter Product Link"
          className="searchbar-input"
          onChange={(e) => setsearchprompt(e.target.value)}
        />
        <button
          type="submit"
          className="searchbar-btn"
          disabled={searchprompt === ""}
        >
          {isloading ? "Searching..." : "Search"}
        </button>

        <div>
          <Toaster expand={false} richColors position="bottom-center" />
        </div>
      </form>
      <div className=" mt-10 flex justify-center items-center ">
        <div className="flex items-center gap-3">
          <h5>Websites:</h5>
          {supportedicons.map((icon, index) => (
            <a
              href={icon.url}
              key={index}
              className="inline transform transition duration-500 hover:scale-110"
            >
              <Image
                src={icon.source}
                alt={icon.alt}
                key={index}
                width={55}
                height={55}
              />
            </a>
          ))}
        </div>
      </div>
    </>
  );
}

export default searchbar;
