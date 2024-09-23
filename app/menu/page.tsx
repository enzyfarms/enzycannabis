'use client';

import React, { useState } from "react";
import { Navigation } from "../components/nav";

export default function Page() {
  const [iframeStatus, setIframeStatus] = useState<'loading' | 'loaded' | 'error'>('loading');

  const handleIframeLoad = () => {
    setIframeStatus('loaded');
  };

  const handleIframeError = () => {
    setIframeStatus('error');
  };

  return (
    <div className="flex flex-col min-h-screen bg-zinc-900">
      <Navigation />
      <main className="flex-grow overflow-auto">
        {iframeStatus === 'loading' && (
          <div className="flex flex-col items-center justify-center min-h-screen bg-zinc-100">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-zinc-600 mb-4"></div>
            <p className="text-zinc-600 text-xl">Loading menu...</p>
          </div>
        )}
        {iframeStatus === 'error' && (
          <div className="flex items-center justify-center min-h-screen bg-zinc-100">
            <p className="text-red-600 text-xl">Failed to load menu. Please try again later.</p>
          </div>
        )}
        {iframeStatus !== 'error' && (
          <iframe
            src="https://enzyfarms.wm.store/"
            onLoad={handleIframeLoad}
            onError={handleIframeError}
            className="w-full min-h-screen"
            style={{ border: 'none' }}
          ></iframe>
        )}
      </main>
    </div>
  );
}
