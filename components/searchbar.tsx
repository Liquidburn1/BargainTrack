/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import { scrapeandstore } from "@/lib/actions";
import React, { FormEvent, useState } from "react";

function searchbar() {
  const [searchprompt, setsearchprompt] = useState("");
  const [isloading, setisLoading] = useState(false);

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

  //handling submit
  const handlesubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const isvalidlink = isvalidamazonlink(searchprompt);
    if (!isvalidlink) {
      return alert("Invalid Link");
    }

    try {
      setisLoading(true);
      const Product = await scrapeandstore(searchprompt);
      setsearchprompt("");
    } catch (error) {
      console.log("error");
    } finally {
      setisLoading(false);
    }
  };

  return (
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
    </form>
  );
}

export default searchbar;
