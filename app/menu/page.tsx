'use client';

import React, { useEffect, useState } from "react";
import Head from 'next/head';
import { Navigation } from "../components/nav";

export default function Page() {
  const [iframeLoaded, setIframeLoaded] = useState(false);

  useEffect(() => {
    const checkIframe = () => {
      const iframe = document.getElementById('wm-store-embed');
      if (iframe) {
        console.log("Embed iframe found");
        setIframeLoaded(true);
      } else {
        console.log("Embed iframe not found");
      }
    };

    // Check immediately and after a delay
    checkIframe();
    const timeoutId = setTimeout(checkIframe, 2000);

    return () => clearTimeout(timeoutId);
  }, []);

  return (
    <div className="relative pb-16">
      <Head>
        <script src="https://enzyfarms.wm.store/static/js/embed.js" />
      </Head>
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
        
        <div className="w-full min-h-[500px] bg-zinc-800">
          {!iframeLoaded && <p className="text-white p-4">Loading embed...</p>}
          {/* The script will insert the iframe here */}
        </div>

        <div className="mt-4 p-4 bg-zinc-700 text-white">
          <p>Debug Info:</p>
          <p>Iframe Loaded: {iframeLoaded ? 'Yes' : 'No'}</p>
        </div>
      </div>
    </div>
  );
}
