import Link from "next/link";
import React, { useEffect } from "react";
import { Navigation } from "../components/nav";
import { Redis } from "@upstash/redis";
import { Eye } from "lucide-react";

const redis = Redis.fromEnv();

export default function Page() {
  useEffect(() => {
    // Load the Weedmaps embed script
    const script = document.createElement('script');
    script.src = "https://enzyfarms.wm.store/static/js/embed.js";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      // Clean up the script when the component unmounts
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div className="relative pb-16">
      <Navigation />
      <div className="px-6 pt-20 mx-auto space-y-8 max-w-7xl lg:px-8 md:space-y-16 md:pt-24 lg:pt-32">
        <div className="max-w-2xl mx-auto lg:mx-0">
          <h2 className="text-3xl font-bold tracking-tight text-zinc-100 sm:text-4xl">
            Our Menu
          </h2>
          <p className="mt-4 text-zinc-400">
            Check out our current selection below.
          </p>
        </div>
        <div className="w-full h-px bg-zinc-800" />
        <div className="w-full h-[600px]">
          <iframe 
            src="https://enzyfarms.wm.store" 
            width="100%" 
            height="100%" 
            style={{border: 'none'}}
            title="Weedmaps Menu"
          />
        </div>
      </div>
    </div>
  );
}
