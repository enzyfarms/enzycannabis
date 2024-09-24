import React from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";

// Dynamically load the Particles component to reduce initial load
const Particles = dynamic(() => import("./components/particles"), {
  ssr: false, // Disable server-side rendering for Particles
  loading: () => <div />, // Display nothing while loading
});

const navigation = [
  { name: "Menu", href: "/menu" },
  { name: "Contact", href: "/contact" },
];

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center w-full h-screen bg-gradient-to-tl from-black via-zinc-600/20 to-black">
      {/* Preload critical resources */}
      <link rel="preload" href="/Logo.png" as="image" />

      <nav className="z-10 my-8 md:my-16 animate-fade-in">
        <ul className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-4">
          {navigation.map((item) =>
            item.name === "Menu" ? (
              <a
                key={item.href}
                href={item.href}
                className="text-sm md:text-base duration-50 text-zinc-500 hover:text-zinc-100"
              >
                {item.name}
              </a>
            ) : (
              <Link
                key={item.href}
                href={item.href}
                className="text-sm md:text-base duration-50 text-zinc-500 hover:text-zinc-100"
              >
                {item.name}
              </Link>
            )
          )}
        </ul>
      </nav>

      {/* Glow animation */}
      <div className="w-screen h-px animate-glow bg-gradient-to-r from-zinc-300/0 via-zinc-300/50 to-zinc-300/0 animate-fade-left" />

      {/* Reduced particle effect quantity */}
      <Particles className="absolute inset-0 -z-10 animate-fade-in" quantity={50} />

      {/* Priority image loading */}
      <h1 className="z-10 text-3xl sm:text-4xl md:text-6xl lg:text-8xl text-transparent duration-1000 bg-white cursor-default text-edge-outline animate-title font-display whitespace-nowrap bg-clip-text">
        <Image
          src="/Logo.png"
          width={512}
          height={398}
          alt="Logo"
          className="w-32 h-auto sm:w-48 md:w-64 lg:w-96"
          priority // Ensure image loads with higher priority
        />
      </h1>

      <div className="w-screen h-px animate-glow bg-gradient-to-r from-zinc-300/0 via-zinc-300/50 to-zinc-300/0 animate-fade-right" />

      <div className="my-8 md:my-16 text-center animate-fade-in">
        <h2 className="text-sm md:text-base text-zinc-500"></h2>
      </div>
    </div>
  );
}
