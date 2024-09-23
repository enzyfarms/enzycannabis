"use client";
import { ArrowLeft } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";

export const Navigation: React.FC = () => {
  const ref = useRef<HTMLElement>(null);
  const [isIntersecting, setIntersecting] = useState(true);

  useEffect(() => {
    if (!ref.current) return;
    const observer = new IntersectionObserver(([entry]) =>
      setIntersecting(entry.isIntersecting)
    );

    observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <header ref={ref}>
      <div
        className={`fixed inset-x-0 top-0 z-50 backdrop-blur duration-200 border-b ${
          isIntersecting
            ? "bg-zinc-900/0 border-transparent"
            : "bg-zinc-900/500 border-zinc-800"
        }`}
      >
        <div className="relative container flex items-center justify-center p-4 mx-auto">
          {/* Left section: Back arrow, positioned absolutely */}
          <Link
            href="/"
            className="absolute left-4 md:left-6 duration-200 text-zinc-300 hover:text-zinc-100"
          >
            <ArrowLeft className="w-5 h-5 md:w-6 md:h-6 lg:w-8 lg:h-8" />
          </Link>

          {/* Center section: Logo */}
          <Link href="/">
            <Image
              src="/Logo(notree) Purple Orange.png"
              alt="Logo"
              width={128}
              height={64}
              className="w-24 md:w-32 lg:w-40 h-auto"
            />
          </Link>

          {/* Right section: Navigation links, positioned absolutely */}
          <div className="absolute right-4 md:right-6 flex gap-2 md:gap-4">
            {/* Use a regular anchor tag for the Menu link to force full page reload */}
            <a
              href="/menu"
              className="text-xs md:text-sm lg:text-base duration-200 text-zinc-400 hover:text-zinc-100"
            >
              Menu
            </a>
            <Link
              href="/contact"
              className="text-xs md:text-sm lg:text-base duration-200 text-zinc-400 hover:text-zinc-100"
            >
              Contact
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};
