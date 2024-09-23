'use client';

import React, { useEffect, useState, useRef } from "react";
import { Navigation } from "../components/nav";

export default function Page() {
  const [iframeStatus, setIframeStatus] = useState<'loading' | 'loaded' | 'error'>('loading');
  const iframeContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (iframeStatus === 'loading' && iframeContainerRef.current) {
      if (!iframeContainerRef.current.querySelector('iframe')) {
        const iframe = document.createElement('iframe');
        iframe.src = 'https://enzyfarms.wm.store/';
        iframe.style.width = '100%';
        iframe.style.height = '100%';
        iframe.style.border = 'none';
        iframe.style.overflow = 'auto';
        
        iframe.onload = () => setIframeStatus('loaded');
        iframe.onerror = () => setIframeStatus('error');

        iframeContainerRef.current.appendChild(iframe);
      }
    }
  }, [iframeStatus]);

  return (
    <div className="flex flex-col h-screen bg-zinc-900 overflow-hidden">
      <Navigation />
      <main className="flex-grow relative">
        <div 
          ref={iframeContainerRef} 
          className="absolute inset-0 w-full h-full"
        >
          {iframeStatus === 'loading' && (
            <div className="flex flex-col items-center justify-center h-full bg-zinc-100">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-zinc-600 mb-4"></div>
              <p className="text-zinc-600 text-xl">Loading menu...</p>
            </div>
          )}
          {iframeStatus === 'error' && (
            <div className="flex items-center justify-center h-full bg-zinc-100">
              <p className="text-red-600 text-xl">Failed to load menu. Please try again later.</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
