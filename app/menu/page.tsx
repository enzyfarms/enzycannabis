import Link from "next/link";
import React, { useEffect, useState } from "react";
import dynamic from 'next/dynamic';
import { Navigation } from "../components/nav";
import { Redis } from "@upstash/redis";
import { Eye } from "lucide-react";

const redis = Redis.fromEnv();

// Dynamically import the iframe component with ssr disabled
const WeedmapsIframe = dynamic(
  () => import('../components/WeedmapsIframe'),
  { ssr: false }
);

export default function Page() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
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
          {isMounted && <WeedmapsIframe />}
        </div>
      </div>
    </div>
  );
}
