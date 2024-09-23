"use client"; // Ensure this is a Client Component

import React, { useEffect } from "react";
import { Navigation } from "../components/nav";

export default function Page() {
  useEffect(() => {
    // Create a script element
    const script = document.createElement("script");
    script.src = "https://enzyfarms.wm.store/static/js/embed.js";
    script.async = true;

    // Append the script to the wm-widget div
    const widgetDiv = document.getElementById("wm-widget");
    if (widgetDiv) {
      widgetDiv.appendChild(script);
    }

    // Clean up the script when the component unmounts
    return () => {
      if (widgetDiv) {
        widgetDiv.removeChild(script);
      }
    };
  }, []);

  return (
    <div className="relative pb-16">
      <Navigation />
      <main
        className="px-6 pt-20 mx-auto space-y-8 max-w-7xl lg:px-8 md:space-y-16 md:pt-24 lg:pt-32"
        style={{ minHeight: "100vh" }}
      >
        {/* Embedded Online Store */}
        <section
          id="wm-widget"
          className="w-full h-full overflow-auto"
          aria-label="Online Store"
        ></section>

        {/* Divider */}
        <hr className="w-full h-px bg-zinc-800 mt-8" />
      </main>
    </div>
  );
}
