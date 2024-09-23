'use client';

import React, { useEffect, useState, useRef } from "react";
import { Navigation } from "../components/nav";

export default function Page() {
  const [iframeCreated, setIframeCreated] = useState(false);
  const iframeContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!iframeCreated && iframeContainerRef.current) {
      // Check if iframe already exists
      if (!iframeContainerRef.current.querySelector('iframe')) {
        const iframe = document.createElement('iframe');
        iframe.src = 'https://enzyfarms.wm.store/';
        iframe.style.width = '100%';
        iframe.style.height = '500px';
        iframe.style.border = 'none';
        
        iframeContainerRef.current.appendChild(iframe);
        setIframeCreated(true);
      }
    }
  }, [iframeCreated]);

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
        
        <div ref={iframeContainerRef} className="w-full min-h-[500px] bg-zinc-800">
          {!iframeCreated && <p className="text-white p-4">Loading menu...</p>}
        </div>

        <div className="mt-4 p-4 bg-zinc-700 text-white">
          <p>Debug Info:</p>
          <p>Iframe Created: {iframeCreated ? 'Yes' : 'No'}</p>
        </div>
      </div>
    </div>
  );
}
