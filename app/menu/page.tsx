'use client';

import React, { useEffect, useState } from "react";
import Script from "next/script";
import { Navigation } from "../components/nav";

declare global {
  interface Window {
    WeemountEmbed?: {
      mount: (selector: string) => void;
    };
  }
}

export default function Page() {
  const [scriptLoaded, setScriptLoaded] = useState(false);
  const [mountAttempted, setMountAttempted] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined' && window.WeemountEmbed) {
      console.log("WeemountEmbed found in window object");
      try {
        window.WeemountEmbed.mount('#wm-embed-container');
        console.log("Mount function called");
        setMountAttempted(true);
      } catch (error) {
        console.error("Error calling mount function:", error);
      }
    } else {
      console.log("WeemountEmbed not found in window object");
    }
  }, [scriptLoaded]);

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
        
        <div id="wm-embed-container" className="w-full min-h-[500px] bg-zinc-800">
          {!scriptLoaded && <p className="text-white p-4">Loading embed script...</p>}
          {scriptLoaded && !mountAttempted && <p className="text-white p-4">Script loaded, waiting for mount...</p>}
          {mountAttempted && <p className="text-white p-4">Mount attempted. If you see this, the embed might not be working correctly.</p>}
        </div>

        <div className="mt-4 p-4 bg-zinc-700 text-white">
          <p>Debug Info:</p>
          <p>Script Loaded: {scriptLoaded ? 'Yes' : 'No'}</p>
          <p>Mount Attempted: {mountAttempted ? 'Yes' : 'No'}</p>
        </div>
      </div>

      <Script
        src="https://enzyfarms.wm.store/static/js/embed.js"
        strategy="afterInteractive"
        onLoad={() => {
          console.log("Script loaded");
          setScriptLoaded(true);
          if (window.WeemountEmbed) {
            try {
              window.WeemountEmbed.mount('#wm-embed-container');
              console.log("Mount function called in onLoad");
              setMountAttempted(true);
            } catch (error) {
              console.error("Error calling mount function in onLoad:", error);
            }
          } else {
            console.log("WeemountEmbed not found in window object in onLoad");
          }
        }}
      />
    </div>
  );
}
