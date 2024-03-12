import Link from "next/link";
import Image from "next/image";
import React from "react";
import {
  Dialog,
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
        <div className=" flex items-center gap-5">
          {navicons.map((icon) => (
            <Image
              key={icon.alt}
              src={icon.src}
              alt={icon.alt}
              width={28}
              height={28}
              className="object-contain"
            />
          ))}
          <Dialog>
            <DialogTrigger className=" rounded-2xl p-3 bg-slate-700 text-slate-50 text-sm">
              Feedback
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Feedback Form</DialogTitle>
                <DialogDescription></DialogDescription>
                <input className="" type="text" />
              </DialogHeader>
            </DialogContent>
          </Dialog>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
