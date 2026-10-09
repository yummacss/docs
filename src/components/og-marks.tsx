import type { ReactNode } from "react";

// the light marks without their tile, for ImageResponse, which has no light-dark()
export const OG_MARKS: Record<"css" | "ui", (size: number) => ReactNode> = {
  css: (size) => (
    <svg
      aria-hidden="true"
      width={size}
      height={(size * 72) / 64}
      viewBox="18 14 64 72"
    >
      <defs>
        <linearGradient id="og-css-lW0" x1="0" y1="0" x2="0.4" y2="1">
          <stop offset="0" stopColor="#e4e8fa" />
          <stop offset="1" stopColor="#bcc4ef" />
        </linearGradient>
        <linearGradient id="og-css-lW1" x1="1" y1="0" x2="0.6" y2="1">
          <stop offset="0" stopColor="#d3d9f6" />
          <stop offset="1" stopColor="#a9b2e8" />
        </linearGradient>
        <linearGradient id="og-css-lW2" x1="0.5" y1="0" x2="0.5" y2="1">
          <stop offset="0" stopColor="#c5ccf2" />
          <stop offset="1" stopColor="#e8ebf9" />
        </linearGradient>
        <linearGradient id="og-css-lRim" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#ffffff" stopOpacity="0.95" />
          <stop offset="1" stopColor="#ffffff" stopOpacity="0.15" />
        </linearGradient>
      </defs>
      <polygon
        points="50,19 23.2,34.5 23.2,65.5 50,50"
        fill="url(#og-css-lW0)"
      />
      <polygon
        points="50,19 76.8,34.5 76.8,65.5 50,50"
        fill="url(#og-css-lW1)"
      />
      <polygon
        points="23.2,65.5 50,81 76.8,65.5 50,50"
        fill="url(#og-css-lW2)"
      />
      <path
        d="M50 50 L50 19 M50 50 L23.2 65.5 M50 50 L76.8 65.5"
        fill="none"
        stroke="#ffffff"
        strokeOpacity="0.35"
        strokeWidth="0.5"
      />
      <polygon points="50,34.9885 63,42.4942 50,50 37,42.4942" fill="#8796e4" />
      <polygon points="37,42.4942 50,50 50,65.0115 37,57.5058" fill="#4c5fc7" />
      <polygon points="63,42.4942 63,57.5058 50,65.0115 50,50" fill="#2f3c8f" />
      <polygon
        points="50,34.9885 63,42.4942 50,50 37,42.4942"
        fill="none"
        stroke="#ffffff"
        strokeOpacity="0.6"
        strokeWidth="0.4"
        strokeLinejoin="round"
      />
      <polygon
        points="50,19 76.8,34.5 50,50 23.2,34.5"
        fill="#ffffff"
        fillOpacity="0.3"
      />
      <polygon
        points="23.2,34.5 50,50 50,81 23.2,65.5"
        fill="#ffffff"
        fillOpacity="0.16"
      />
      <polygon
        points="76.8,34.5 76.8,65.5 50,81 50,50"
        fill="#ffffff"
        fillOpacity="0.08"
      />
      <polygon
        points="50,19 76.8,34.5 76.8,65.5 50,81 23.2,65.5 23.2,34.5"
        fill="none"
        stroke="url(#og-css-lRim)"
        strokeWidth="0.65"
        strokeLinejoin="round"
      />
      <path
        d="M23.2 34.5 L50 50 L76.8 34.5 M50 50 L50 81"
        fill="none"
        stroke="#ffffff"
        strokeOpacity="0.5"
        strokeWidth="0.45"
      />
    </svg>
  ),
  ui: (size) => (
    <svg
      aria-hidden="true"
      width={size}
      height={(size * 72) / 64}
      viewBox="18 14 64 72"
    >
      <defs>
        <linearGradient id="og-ui-lW0" x1="0" y1="0" x2="0.4" y2="1">
          <stop offset="0" stopColor="#e4e8fa" />
          <stop offset="1" stopColor="#bcc4ef" />
        </linearGradient>
        <linearGradient id="og-ui-lW1" x1="1" y1="0" x2="0.6" y2="1">
          <stop offset="0" stopColor="#d3d9f6" />
          <stop offset="1" stopColor="#a9b2e8" />
        </linearGradient>
        <linearGradient id="og-ui-lW2" x1="0.5" y1="0" x2="0.5" y2="1">
          <stop offset="0" stopColor="#c5ccf2" />
          <stop offset="1" stopColor="#e8ebf9" />
        </linearGradient>
        <linearGradient id="og-ui-lRim" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#ffffff" stopOpacity="0.95" />
          <stop offset="1" stopColor="#ffffff" stopOpacity="0.15" />
        </linearGradient>
      </defs>
      <polygon
        points="50,19 23.2,34.5 23.2,65.5 50,50"
        fill="url(#og-ui-lW0)"
      />
      <polygon
        points="50,19 76.8,34.5 76.8,65.5 50,50"
        fill="url(#og-ui-lW1)"
      />
      <polygon
        points="23.2,65.5 50,81 76.8,65.5 50,50"
        fill="url(#og-ui-lW2)"
      />
      <path
        d="M50 50 L50 19 M50 50 L23.2 65.5 M50 50 L76.8 65.5"
        fill="none"
        stroke="#ffffff"
        strokeOpacity="0.35"
        strokeWidth="0.5"
      />
      <polygon points="50,43.7 65.59,52.7 50,61.7 34.41,52.7" fill="#8796e4" />
      <polygon points="34.41,52.7 50,61.7 50,65.3 34.41,56.3" fill="#4c5fc7" />
      <polygon points="65.59,52.7 50,61.7 50,65.3 65.59,56.3" fill="#2f3c8f" />
      <polygon
        points="50,43.7 65.59,52.7 50,61.7 34.41,52.7"
        fill="none"
        stroke="#ffffff"
        strokeOpacity="0.6"
        strokeWidth="0.4"
        strokeLinejoin="round"
      />
      <polygon points="50,34.7 65.59,43.7 50,52.7 34.41,43.7" fill="#8796e4" />
      <polygon points="34.41,43.7 50,52.7 50,56.3 34.41,47.3" fill="#4c5fc7" />
      <polygon points="65.59,43.7 50,52.7 50,56.3 65.59,47.3" fill="#2f3c8f" />
      <polygon
        points="50,34.7 65.59,43.7 50,52.7 34.41,43.7"
        fill="none"
        stroke="#ffffff"
        strokeOpacity="0.6"
        strokeWidth="0.4"
        strokeLinejoin="round"
      />
      <polygon
        points="50,19 76.8,34.5 50,50 23.2,34.5"
        fill="#ffffff"
        fillOpacity="0.3"
      />
      <polygon
        points="23.2,34.5 50,50 50,81 23.2,65.5"
        fill="#ffffff"
        fillOpacity="0.16"
      />
      <polygon
        points="76.8,34.5 76.8,65.5 50,81 50,50"
        fill="#ffffff"
        fillOpacity="0.08"
      />
      <polygon
        points="50,19 76.8,34.5 76.8,65.5 50,81 23.2,65.5 23.2,34.5"
        fill="none"
        stroke="url(#og-ui-lRim)"
        strokeWidth="0.65"
        strokeLinejoin="round"
      />
      <path
        d="M23.2 34.5 L50 50 L76.8 34.5 M50 50 L50 81"
        fill="none"
        stroke="#ffffff"
        strokeOpacity="0.5"
        strokeWidth="0.45"
      />
    </svg>
  ),
};
