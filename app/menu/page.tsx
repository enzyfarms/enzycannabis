'use client';

import React, { useEffect, useState, useRef } from "react";
import { Navigation } from "../components/nav";

export default function Page() {
  const [iframeCreated, setIframeCreated] = useState(false);
  const iframeContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!iframeCreated && iframeContainerRef.current) {
      if (!iframeContainerRef.current.querySelector('iframe')) {
        const iframe = document.createElement('iframe');
        iframe.src = 'https://enzyfarms.wm.store/';
        iframe.style.width = '100%';
        iframe.style.height = '100%';
        iframe.style.border = 'none';
        iframe.style.overflow = 'auto'; // Enable scrolling within iframe
        
        iframeContainerRef.current.appendChild(iframe);
        setIframeCreated(true);
      }
    }
  }, [iframeCreated]);

  return (
    <div className="flex flex-col min-h-screen bg-zinc-900">
      <Navigation />
      <div className="flex-grow container mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div ref={iframeContainerRef} className="w-full h-[800px]">
            {!iframeCreated && (
              <div className="flex items-center justify-center h-full bg-zinc-100">
                <p className="text-zinc-600 text-xl">Loading menu...</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
