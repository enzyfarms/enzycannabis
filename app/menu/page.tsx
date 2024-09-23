import Link from "next/link";
import React from "react";
import Script from "next/script";
import { Navigation } from "../components/nav";
import { Redis } from "@upstash/redis";
import { Eye } from "lucide-react";

const redis = Redis.fromEnv();

export default function Page() {
  return (
    <div className="relative pb-16">
      <Navigation />
      <div className="px-6 pt-20 mx-auto space-y-8 max-w-7xl lg:px-8 md:space-y-16 md:pt-24 lg:pt-32">
        <div className="max-w-2xl mx-auto lg:mx-0">
          <h2 className="text-3xl font-bold tracking-tight text-zinc-100 sm:text-4xl">
            Our Menu
          </h2>
          <p className="mt-4 text-zinc-400">
            Expect Menu Drop March 2024.
          </p>
        </div>
        <div className="w-full h-px bg-zinc-800" />
        <Script
          src="https://enzyfarms.wm.store/static/js/embed.js"
          strategy="afterInteractive"
        />
      </div>
    </div>
  );
}
