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
        
        iframeContainerRef.current.appendChild(iframe);
        setIframeCreated(true);
      }
    }
  }, [iframeCreated]);

  return (
    <div className="flex flex-col h-screen">
      <Navigation />
      <div ref={iframeContainerRef} className="flex-grow w-full bg-zinc-800">
        {!iframeCreated && (
          <div className="flex items-center justify-center h-full">
            <p className="text-white text-xl">Loading menu...</p>
          </div>
        )}
      </div>
    </div>
  );
}
