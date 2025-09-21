import React, { useState } from "react";
import { toast } from "sonner";

const ShareItinerary = ({ tripId, title }) => {
  const [copied, setCopied] = useState(false);
  const shareUrl = `${window.location.origin}/view-trip/${tripId}`;
  const shareText = `Check out my travel itinerary: ${title}`;

  // Native share
  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: title,
          text: shareText,
          url: shareUrl,
        });
        toast.success("Shared successfully!");
      } catch (error) {
        toast.error("Sharing failed or was cancelled.");
      }
    } else {
      toast("Native share is not supported on this device.");
    }
  };

  // Copy link
  const copyLinkToClipboard = () => {
    navigator.clipboard.writeText(shareUrl).then(() => {
      setCopied(true);
      toast.success("Link copied to clipboard!");
      setTimeout(() => setCopied(false), 2000);
    }).catch(() => {
      toast.error("Failed to copy link.");
    });
  };

  const encodedUrl = encodeURIComponent(shareUrl);
  const encodedText = encodeURIComponent(shareText);

  return (
    <div className="flex flex-col md:flex-row items-center gap-2 md:gap-4 py-3 bg-slate-50 rounded-lg border">
      {/* Shareable Link */}
      <div className="flex-1 flex gap-2 items-center w-full">
        <input
          type="text"
          readOnly
          value={shareUrl}
          className="px-2 py-1 border rounded w-full text-xs"
          aria-label="Shareable link"
        />
        <button
          onClick={copyLinkToClipboard}
          className="text-white text-xs px-3 py-2 rounded bg-blue-500 hover:bg-blue-600 transition"
        >
          {copied ? "Copied!" : "Copy"}
        </button>
      </div>

      {/* Share Buttons */}
      <div className="flex gap-2 flex-wrap justify-center mt-2 md:mt-0">
        <button
          onClick={handleNativeShare}
          className="text-white px-3 py-2 rounded bg-green-500 hover:bg-green-600 transition"
        >
          <span role="img" aria-label="share">📲</span> Device
        </button>
        <a
          href={`https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedText}`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-white px-3 py-2 rounded bg-blue-400 hover:bg-blue-500 transition"
        >
          <span role="img" aria-label="twitter">🐦</span> Twitter
        </a>
        <a
          href={`https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-white px-3 py-2 rounded bg-blue-800 hover:bg-blue-900 transition"
        >
          <span role="img" aria-label="facebook">📘</span> Facebook
        </a>
        <a
          href={`mailto:?subject=${encodedText}&body=${encodedUrl}`}
          className="text-white px-3 py-2 rounded bg-gray-600 hover:bg-gray-700 transition"
        >
          <span role="img" aria-label="email">✉️</span> Email
        </a>
      </div>
    </div>
  );
};

export default ShareItinerary;
