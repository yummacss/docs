"use client";
import { useEffect } from "react";

export default function CopyScript() {
  useEffect(() => {
    const handleCopy = async (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      // Check if click was on or inside the copy button
      const button = target.closest(".rehype-pretty-copy") as HTMLButtonElement | null;
      if (!button) return;

      const pre = button.closest("pre");
      if (!pre) return;

      // Find the code element inside the pre block
      const code = pre.querySelector("code");
      if (!code) return;

      // Get text content. innerText is great as it respects line breaks
      // and typically ignores pseudo-elements like line numbers natively!
      const text = code.innerText || code.textContent || "";
      
      try {
        await navigator.clipboard.writeText(text);
        button.dataset.copied = "true";
        // Reset after 2 seconds
        setTimeout(() => {
          delete button.dataset.copied;
        }, 2000);
      } catch (err) {
        console.error("Failed to copy code", err);
      }
    };

    document.addEventListener("click", handleCopy);
    return () => document.removeEventListener("click", handleCopy);
  }, []);

  return null;
}
