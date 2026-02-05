"use client";

import { useState } from "react";
import { apiFetch } from "@/lib/api";
import { FaClipboard, FaClipboardCheck } from "react-icons/fa";

export default function Hero() {
  const [url, setUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);

  // Normalize URL
  const normalizeUrl = (input: string): string | null => {
    try {
      const url = new URL(
        input.startsWith("http://") || input.startsWith("https://")
          ? input
          : `https://${input}`
      );

      if (!["http:", "https:"].includes(url.protocol)) {
        return null;
      }

      if (!url.hostname.includes(".")) {
        return null;
      }

      return url.href;
    } catch {
      return null;
    }
  };

  const handleShorten = async () => {
    setError("");
    setShortUrl("");

    const normalized = normalizeUrl(url);
    if (!normalized) {
      setError("Please enter a valid URL.");
      return;
    }

    try {
      const data = await apiFetch("/shorten", {
        method: "POST",
        body: JSON.stringify({ original_url: normalized }),
      });
      setShortUrl(data.short_url);
    } catch {
      setError("Error shortening URL.");
    }
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(shortUrl);
      setCopied(true);
    } catch {
      alert("Failed to copy");
    }
  };

  return (
    <section className="h-screen relative flex items-center justify-center px-4" 
      style={{ backgroundColor: "#55AADD" }}
    >
      {/* Decorative circles */}
      <div className="absolute top-10 left-10 w-40 h-40 bg-white opacity-10 rounded-full animate-pulse"></div>
      <div className="absolute bottom-20 right-16 w-56 h-56 bg-white opacity-5 rounded-full animate-pulse"></div>

      {/* Hero content */}
      <div className="relative z-10 w-full max-w-xl text-center space-y-8">

        {/* Hero Text */}
        <div className="space-y-3">
          <h1 className="text-5xl md:text-6xl font-extrabold text-shadow-lg text-white leading-tight animate-fadeIn">
            Shorten URLs in seconds
          </h1>
          <p className="text-white text-shadow-lg text-lg md:text-xl animate-fadeIn delay-100">
            Free, fast, and no login required.
            <br />
            Login to save your link history.
          </p>
        </div>

        {/* URL Shortener Card */}
        <div className="relative z-10 bg-white rounded-2xl shadow-2xl p-6 md:p-8 space-y-5 transition-transform hover:scale-[1.03] duration-300">

          <div className="flex gap-3">
            <input
              type="text"
              placeholder="https://example.com"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              className="flex-1 border border-gray-300 rounded-lg text-gray-900 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 placeholder-gray-400 transition"
            />

            <button
              onClick={handleShorten}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition shadow-md hover:shadow-lg"
            >
              Shorten
            </button>
          </div>

          {error && <p className="text-red-500 text-sm">{error}</p>}

          {shortUrl && (
            <div className="flex items-center justify-between bg-gray-50 border border-gray-200 rounded-lg p-3 transition-shadow hover:shadow-md">
              <a
                href={shortUrl}
                target="_blank"
                className="text-blue-600 underline break-all text-sm md:text-base"
              >
                {shortUrl}
              </a>

              <button
                onClick={copyToClipboard}
                title={copied ? "Copied!" : "Copy"}
                className={`ml-2 px-3 py-1 rounded text-lg transition flex items-center justify-center
                  ${copied
                    ? "bg-green-100 text-green-700 scale-105"
                    : "bg-gray-200 text-black hover:bg-gray-300"}
                `}
              >
                {copied ? <FaClipboardCheck /> : <FaClipboard />}
              </button>
            </div>
          )}

        </div>
      </div>
    </section>
  );
}
