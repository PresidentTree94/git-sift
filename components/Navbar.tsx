"use client";
import { useState } from "react";
import Link from "next/link";

const nav = [
  { text: "Evaluate", link: "#evaluate" },
  { text: "Report", link: "#report" },
  { text: "How it works", link: "#how-it-works" }
];

export default function Navbar() {

  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 bg-background-50/90 border-b border-background-200 backdrop-blur z-1">
      <div className="flex flex-col sm:flex-row justify-between sm:items-center sm:px-10">
        <div className="h-16 flex justify-between items-center px-10 sm:px-0">
          <Link href="/" className="flex items-center gap-2">
            <div className="h-8 w-8 bg-primary-600 rounded-md flex items-center justify-center text-xl text-background-50"><i className="ri-search-eye-line"></i></div>
            <span className="font-heading text-xl font-bold text-foreground-950">GitSift</span>
          </Link>
          <i className={`${open ? "ri-close-line" : "ri-menu-line"} text-2xl sm:hidden`} onClick={() => setOpen(!open)}></i>
        </div>
        <nav className={`text-foreground-700 font-label text-sm gap-5 sm:gap-8 ${open ? "flex" : "hidden sm:flex"} flex-col sm:flex-row px-10 sm:px-0 py-5 sm:py-0 border-t sm:border-t-0 border-background-200`}>
          {nav.map((n, index) => (
            <a key={index} href={n.link} className="hover:text-primary-600" onClick={() => setOpen(false)}>{n.text}</a>
          ))}
        </nav>
      </div>
    </header>
  );
}