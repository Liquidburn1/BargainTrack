import Link from "next/link";
import Image from "next/image";
import React from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const navicons = [
  { src: "assets/icons/search.svg", alt: "search" },
  { src: "assets/icons/black-heart.svg", alt: "heart" },
  { src: "assets/icons/user.svg", alt: "user" },
];

const Navbar = () => {
  return (
    <header className="w-full">
      <nav className="nav">
        <Link href="/" className="flex items-center gap-1">
          <Image
            src="/assets/icons/logo.svg"
            width={27}
            height={27}
            alt="logo"
          />
          <p className="nav-logo">
            <span className=" bg-gradient-to-r from-slate-600 via-slate-700 to-slate-900 text-transparent bg-clip-text">
              Bargain
            </span>
            <span className=" bg-gradient-to-r from-red-400 via-red-500 to-red-700 text-transparent bg-clip-text">
              Track
            </span>
          </p>
        </Link>
        <div className="flex items-center gap-5 cursor">
          {navicons.map((icon) => (
            <Image
              key={icon.alt}
              src={icon.src}
              alt={icon.alt}
              width={28}
              height={28}
              className="object-contain cursor-pointer"
            />
          ))}
          <Dialog>
            <DialogTrigger className=" rounded-2xl p-3 bg-slate-800 text-slate-50 text-sm transform transition duration-500 hover:scale-110">
              Feedback
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Feedback Form</DialogTitle>
                <DialogDescription className="text-slate-700">
                  Tell us what other websites we should add!
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="flex items-center gap-4 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                  <label htmlFor="email">Email:</label>
                  <input
                    className="flex col-span-3 h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    type="email"
                    id="email"
                    placeholder="Email"
                  />
                </div>

                <div className="flex items-center gap-4 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                  <label htmlFor="desc">Description:</label>
                  <textarea
                    placeholder="Description"
                    id="desc"
                    className={
                      " flex col-span-3 min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    }
                  />
                </div>
              </div>
              <DialogClose asChild>
                <button className=" rounded-2xl p-3 bg-slate-900 text-slate-50 text-sm">
                  Submit
                </button>
              </DialogClose>
            </DialogContent>
          </Dialog>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
