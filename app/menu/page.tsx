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
    <div className="flex flex-col min-h-screen bg-zinc-900">
      <Navigation />
      <main className="flex-grow pt-16 sm:pt-20 pb-8 px-4">
        <div className="container mx-auto h-full max-w-6xl">
          <div className="bg-white rounded-lg shadow-lg overflow-hidden h-[calc(100vh-8rem)] sm:h-[calc(100vh-10rem)] md:h-[calc(100vh-12rem)]">
            <div 
              ref={iframeContainerRef} 
              className="w-full h-full"
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
          </div>
        </div>
      </main>
    </div>
  );
}
