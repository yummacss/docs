import type { ReactNode } from "react";
import type { CoverFeature, CoverSpec } from "@/utils/cover";

// indigo-10 and its neighbours on the default scale, so a cover stands apart from
// the site's page in either theme
const PAGE = "#2c2d6a";
const INK = "#ffffff";
const MUTED = "#d0d1fb";
const ACCENT = "#babcf9";
const RULE = "#4749ae";

// the dark logo, public/logo-dark.svg
const Yumma = () => (
  <svg aria-hidden="true" width="40" height="40" viewBox="0 0 100 100">
    <defs>
      <linearGradient id="cover-dW0" x1="0" y1="0" x2="0.4" y2="1">
        <stop offset="0" stopColor="#3c4796" />
        <stop offset="1" stopColor="#141836" />
      </linearGradient>
      <linearGradient id="cover-dW1" x1="1" y1="0" x2="0.6" y2="1">
        <stop offset="0" stopColor="#29316e" />
        <stop offset="1" stopColor="#0f1230" />
      </linearGradient>
      <linearGradient id="cover-dW2" x1="0.5" y1="0" x2="0.5" y2="1">
        <stop offset="0" stopColor="#161a3c" />
        <stop offset="1" stopColor="#333d85" />
      </linearGradient>
      <linearGradient id="cover-dRim" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor="#ffffff" stopOpacity="0.55" />
        <stop offset="1" stopColor="#ffffff" stopOpacity="0.15" />
      </linearGradient>
    </defs>
    <rect width="100" height="100" rx="23" fill="#0d0f22" />
    <polygon points="50,19 23.2,34.5 23.2,65.5 50,50" fill="url(#cover-dW0)" />
    <polygon points="50,19 76.8,34.5 76.8,65.5 50,50" fill="url(#cover-dW1)" />
    <polygon points="23.2,65.5 50,81 76.8,65.5 50,50" fill="url(#cover-dW2)" />
    <path
      d="M50 50 L50 19 M50 50 L23.2 65.5 M50 50 L76.8 65.5"
      fill="none"
      stroke="#ffffff"
      strokeOpacity="0.12"
      strokeWidth="0.5"
    />
    <polygon points="50,34.9885 63,42.4942 50,50 37,42.4942" fill="#ffffff" />
    <polygon points="37,42.4942 50,50 50,65.0115 37,57.5058" fill="#bec6f2" />
    <polygon points="63,42.4942 63,57.5058 50,65.0115 50,50" fill="#7f8bd6" />
    <polygon
      points="50,34.9885 63,42.4942 50,50 37,42.4942"
      fill="none"
      stroke="#ffffff"
      strokeOpacity="0"
      strokeWidth="0.4"
      strokeLinejoin="round"
    />
    <polygon
      points="50,19 76.8,34.5 50,50 23.2,34.5"
      fill="#ffffff"
      fillOpacity="0.18"
    />
    <polygon
      points="23.2,34.5 50,50 50,81 23.2,65.5"
      fill="#ffffff"
      fillOpacity="0.06"
    />
    <polygon
      points="76.8,34.5 76.8,65.5 50,81 50,50"
      fill="#ffffff"
      fillOpacity="0.03"
    />
    <polygon
      points="50,19 76.8,34.5 76.8,65.5 50,81 23.2,65.5 23.2,34.5"
      fill="none"
      stroke="url(#cover-dRim)"
      strokeWidth="0.65"
      strokeLinejoin="round"
    />
    <path
      d="M23.2 34.5 L50 50 L76.8 34.5 M50 50 L50 81"
      fill="none"
      stroke="#ffffff"
      strokeOpacity="0.18"
      strokeWidth="0.45"
    />
  </svg>
);

// marks from svgl.app
const LOGOS: Record<NonNullable<CoverFeature["logo"]>, () => ReactNode> = {
  "base-ui": () => (
    <svg aria-hidden="true" width="28" height="40" viewBox="0 0 17 24">
      <path
        fill={INK}
        d="M9.5 7.015A.477.477 0 0 0 9 7.5V23a8 8 0 0 0 .5-15.985ZM8 9.8V23c-4.418 0-8-3.94-8-8.8V1c4.418 0 8 3.94 8 8.8Z"
      />
    </svg>
  ),
  typescript: () => (
    <svg aria-hidden="true" width="40" height="40" viewBox="0 0 256 256">
      <path
        fill="#3178C6"
        d="M20 0h216c11.046 0 20 8.954 20 20v216c0 11.046-8.954 20-20 20H20c-11.046 0-20-8.954-20-20V20C0 8.954 8.954 0 20 0Z"
      />
      <path
        fill="#FFF"
        d="M150.518 200.475v27.62c4.492 2.302 9.805 4.028 15.938 5.179 6.133 1.151 12.597 1.726 19.393 1.726 6.622 0 12.914-.633 18.874-1.899 5.96-1.266 11.187-3.352 15.678-6.257 4.492-2.906 8.048-6.704 10.669-11.394 2.62-4.689 3.93-10.486 3.93-17.391 0-5.006-.749-9.394-2.246-13.163a30.748 30.748 0 0 0-6.479-10.055c-2.821-2.935-6.205-5.567-10.149-7.898-3.945-2.33-8.394-4.531-13.347-6.602-3.628-1.497-6.881-2.949-9.761-4.359-2.879-1.41-5.327-2.848-7.342-4.316-2.016-1.467-3.571-3.021-4.665-4.661-1.094-1.64-1.641-3.495-1.641-5.567 0-1.899.489-3.61 1.468-5.135s2.362-2.834 4.147-3.927c1.785-1.094 3.973-1.942 6.565-2.547 2.591-.604 5.471-.906 8.638-.906 2.304 0 4.737.173 7.299.518 2.563.345 5.14.877 7.732 1.597a53.669 53.669 0 0 1 7.558 2.719 41.7 41.7 0 0 1 6.781 3.797v-25.807c-4.204-1.611-8.797-2.805-13.778-3.582-4.981-.777-10.697-1.165-17.147-1.165-6.565 0-12.784.705-18.658 2.115-5.874 1.409-11.043 3.61-15.506 6.602-4.463 2.993-7.99 6.805-10.582 11.437-2.591 4.632-3.887 10.17-3.887 16.615 0 8.228 2.375 15.248 7.127 21.06 4.751 5.811 11.963 10.731 21.638 14.759a291.458 291.458 0 0 1 10.625 4.575c3.283 1.496 6.119 3.049 8.509 4.66 2.39 1.611 4.276 3.366 5.658 5.265 1.382 1.899 2.073 4.057 2.073 6.474a9.901 9.901 0 0 1-1.296 4.963c-.863 1.524-2.174 2.848-3.93 3.97-1.756 1.122-3.945 1.999-6.565 2.632-2.62.633-5.687.95-9.2.95-5.989 0-11.92-1.05-17.794-3.151-5.875-2.1-11.317-5.25-16.327-9.451Zm-46.036-68.733H140V109H41v22.742h35.345V233h28.137V131.742Z"
      />
    </svg>
  ),
  youtube: () => (
    <svg aria-hidden="true" width="40" height="28" viewBox="0 0 256 180">
      <path
        fill="red"
        d="M250.346 28.075A32.18 32.18 0 0 0 227.69 5.418C207.824 0 127.87 0 127.87 0S47.912.164 28.046 5.582A32.18 32.18 0 0 0 5.39 28.24c-6.009 35.298-8.34 89.084.165 122.97a32.18 32.18 0 0 0 22.656 22.657c19.866 5.418 99.822 5.418 99.822 5.418s79.955 0 99.82-5.418a32.18 32.18 0 0 0 22.657-22.657c6.338-35.348 8.291-89.1-.164-123.134Z"
      />
      <path fill="#FFF" d="m102.421 128.06 66.328-38.418-66.328-38.418z" />
    </svg>
  ),
};

// a wrap-up headline ends in its month and short year: "Wrap-up: Oct—26"
const isDated = (spec: CoverSpec) => /—\d\d$/.test(spec.text);

// the headline shrinks with its length, and until its longest unbreakable run fits the column
function headlineSize(spec: CoverSpec): number {
  if (spec.template === "release") return 280;
  // a dated headline is as large as its column allows
  const dated = isDated(spec);
  const base = dated
    ? 200
    : spec.text.length <= 14
      ? 120
      : spec.text.length <= 24
        ? 96
        : 76;
  // 1200 less 64 of padding each side and the gap, split 1.2 to 1 with the features
  const column = spec.features.length ? 550 : 1072;
  const longest = Math.max(...spec.text.split(" ").map((run) => run.length));
  // Esteban averages a little under half an em per character
  return Math.min(base, Math.floor(column / (longest * (dated ? 0.52 : 0.55))));
}

/**
 * A post's cover, drawn by `ImageResponse` at 1200 by 630. `brand` adds the
 * product mark, for a link shared off the site.
 */
export default function BlogCover({
  spec,
  brand = false,
}: {
  spec: CoverSpec;
  brand?: boolean;
}) {
  return (
    <div
      style={{
        display: "flex",
        width: "100%",
        height: "100%",
        padding: 64,
        gap: 64,
        background: PAGE,
        color: INK,
        fontFamily: "Quattro",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: brand ? "space-between" : "flex-end",
          flex: spec.features.length ? 1.2 : 1,
        }}
      >
        {brand && (
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <Yumma />
            <div
              style={{ display: "flex", fontFamily: "Esteban", fontSize: 30 }}
            >
              {spec.product}
            </div>
          </div>
        )}
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <div
            style={{
              display: "flex",
              fontFamily: "Esteban",
              fontSize: headlineSize(spec),
              lineHeight:
                spec.template === "release" ? 0.8 : isDated(spec) ? 1.1 : 0.95,
              color: ACCENT,
              flexWrap: "wrap",
              columnGap: "0.25em",
            }}
          >
            {isDated(spec)
              ? // Satori breaks after a hyphen or a dash, so each word is unbreakable
                spec.text.split(" ").map((word, i) => (
                  // biome-ignore lint/suspicious/noArrayIndexKey: a headline repeats words
                  <span key={i} style={{ whiteSpace: "nowrap" }}>
                    {word}
                  </span>
                ))
              : spec.text}
          </div>
          <div style={{ display: "flex", fontSize: 26, color: MUTED }}>
            {spec.date}
          </div>
        </div>
      </div>
      {spec.features.length > 0 && (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-end",
            flex: 1,
          }}
        >
          {spec.features.map((feature, i) => (
            <div
              key={feature.label}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: 20,
                padding: "18px 0",
                borderTop: i === 0 ? `2px solid ${INK}` : `1px solid ${RULE}`,
                fontSize: 26,
              }}
            >
              <div style={{ display: "flex" }}>{feature.label}</div>
              {feature.logo
                ? LOGOS[feature.logo]()
                : feature.code && (
                    <div style={{ display: "flex", color: ACCENT }}>
                      {feature.code}
                    </div>
                  )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
