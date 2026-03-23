import { ImageResponse } from "next/og";

export const alt = "SecureBiz AI — GDPR, ISO 27001, NIS2 guides";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: 72,
          background: "linear-gradient(135deg, #0f172a 0%, #1e3a5f 45%, #0d9488 100%)",
          color: "#f8fafc",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        <div
          style={{
            fontSize: 56,
            fontWeight: 800,
            letterSpacing: "-0.02em",
            lineHeight: 1.1,
          }}
        >
          SecureBiz AI
        </div>
        <div
          style={{
            marginTop: 20,
            fontSize: 28,
            fontWeight: 600,
            opacity: 0.95,
            maxWidth: 900,
            lineHeight: 1.35,
          }}
        >
          Sector-specific GDPR, ISO 27001 and NIS2 guides
        </div>
        <div
          style={{
            marginTop: 36,
            fontSize: 20,
            opacity: 0.85,
          }}
        >
          securebiz.org · Compare · Checklists · Resources
        </div>
      </div>
    ),
    { ...size },
  );
}
