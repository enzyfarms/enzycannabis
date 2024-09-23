'use client';

import React, { useState, useEffect } from 'react';
import { Navigation } from '../components/nav';

export default function Page() {
  const [iframeStatus, setIframeStatus] = useState<'loading' | 'loaded' | 'error'>('loading');
  const [shouldLoadIframe, setShouldLoadIframe] = useState(false);

  useEffect(() => {
    const iframeObserver = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setShouldLoadIframe(true);
          iframeObserver.disconnect();
        }
      },
      { rootMargin: '200px' }
    );

    const iframeContainer = document.querySelector('#iframeContainer');
    if (iframeContainer) {
      iframeObserver.observe(iframeContainer);
    }

    return () => iframeObserver.disconnect();
  }, []);

  const handleIframeLoad = () => {
    setIframeStatus('loaded');
  };

  const handleIframeError = () => {
    setIframeStatus('error');
  };

  return (
    <div className="relative h-screen bg-zinc-900">
      <Navigation />
      <main className="absolute top-16 left-0 right-0 bottom-0 overflow-auto">
        {iframeStatus === 'loading' && <LoadingState />}
        {iframeStatus === 'error' && <ErrorState onRetry={() => window.location.reload()} />}
        {shouldLoadIframe && iframeStatus !== 'error' && (
          <IframeComponent
            src="https://enzyfarms.wm.store/"
            onLoad={handleIframeLoad}
            onError={handleIframeError}
          />
        )}
      </main>
    </div>
  );
}

function LoadingState() {
  return (
    <div className="flex items-center justify-center h-full bg-zinc-100 p-4">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-zinc-600 mb-4 mx-auto"></div>
        <p className="text-zinc-600 text-xl">Loading menu...</p>
      </div>
    </div>
  );
}

function ErrorState({ onRetry }: { onRetry: () => void }) {
  return (
    <div className="flex items-center justify-center h-full bg-zinc-100 p-4">
      <div className="text-center">
        <p className="text-red-600 text-xl mb-4">
          Failed to load the menu. Please check your connection and try again.
        </p>
        <button
          onClick={onRetry}
          className="px-6 py-2 bg-red-600 text-white rounded hover:bg-red-700 focus:outline-none"
        >
          Retry
        </button>
      </div>
    </div>
  );
}

function IframeComponent({
  src,
  onLoad,
  onError,
}: {
  src: string;
  onLoad: () => void;
  onError: () => void;
}) {
  return (
    <div id="iframeContainer" className="w-full h-full">
      <iframe
        src={src}
        onLoad={onLoad}
        onError={onError}
        title="Online Store"
        className="w-full h-full"
        style={{ border: 'none' }}
        loading="lazy"
        aria-label="Online store iframe"
      ></iframe>
    </div>
  );
}
