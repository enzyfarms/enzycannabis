'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Navigation } from '../components/nav';

export default function Page() {
  const [iframeStatus, setIframeStatus] = useState<'loading' | 'loaded' | 'error'>('loading');
  const [shouldLoadIframe, setShouldLoadIframe] = useState(false);
  const iframeContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // If lazy loading is important, adjust the code as follows
    const iframeObserver = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setShouldLoadIframe(true);
          iframeObserver.disconnect();
        }
      },
      { rootMargin: '200px' }
    );

    if (iframeContainerRef.current) {
      iframeObserver.observe(iframeContainerRef.current);
    }

    return () => iframeObserver.disconnect();
  }, []);

  // If lazy loading is not critical, you can set shouldLoadIframe to true immediately
  // useEffect(() => {
  //   setShouldLoadIframe(true);
  // }, []);

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
        <div id="iframeContainer" ref={iframeContainerRef} className="w-full h-full">
          {shouldLoadIframe && iframeStatus !== 'error' && (
            <IframeComponent
              src="https://enzyfarms.wm.store/"
              onLoad={handleIframeLoad}
              onError={handleIframeError}
            />
          )}
        </div>
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
    <iframe
      src={src}
      onLoad={onLoad}
      onError={onError}
      title="Online Store"
      className="w-full h-full border-none"
      loading="lazy"
      aria-label="Online store iframe"
    ></iframe>
  );
}
