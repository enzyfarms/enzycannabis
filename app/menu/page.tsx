"use client"; // Ensure this is a Client Component

import React from "react";
import { Navigation } from "../components/nav";

export default function Page() {
  return (
    <div className="relative pb-16">
      <Navigation />
      <div
        className="px-6 pt-20 mx-auto space-y-8 max-w-7xl lg:px-8 md:space-y-16 md:pt-24 lg:pt-32"
        style={{ minHeight: "100vh" }}
      >
        {/* Embedded Online Store */}
        <div
          className="w-full h-full overflow-auto"
          dangerouslySetInnerHTML={{
            __html: `
              <div id="wm-widget"></div>
              <script src="https://enzyfarms.wm.store/static/js/embed.js"></script>
            `,
          }}
        />
        {/* Optional: Divider or other content */}
        <div className="w-full h-px bg-zinc-800 mt-8" />
      </div>
    </div>
  );
}

