import { readFile } from "node:fs/promises";
import { join } from "node:path";

import { ImageResponse } from "next/og";

export const alt = "Happy-Park — Fun, Food, Family & Experiences in Southfield, St. Elizabeth, Jamaica";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const logoData = await readFile(join(process.cwd(), "public/images/brand/happy-park-logo.png"), "base64");
const logoSrc = `data:image/png;base64,${logoData}`;

export default function OpenGraphImage() {
  return new ImageResponse(
    <div style={{ display: "flex", width: "100%", height: "100%", background: "linear-gradient(135deg, #0d392a 0%, #196443 65%, #3c8050 100%)", padding: 48, position: "relative", overflow: "hidden" }}>
      <div style={{ display: "flex", position: "absolute", width: 420, height: 420, borderRadius: "50%", border: "60px solid rgba(244,205,111,.16)", right: -125, top: -175 }} />
      <div style={{ display: "flex", position: "absolute", width: 300, height: 300, borderRadius: "50%", background: "rgba(133,192,117,.17)", left: -150, bottom: -180 }} />
      <div style={{ display: "flex", width: "100%", height: "100%", alignItems: "center", justifyContent: "center", flexDirection: "column", borderRadius: 36, background: "#fffaf0", border: "3px solid rgba(255,255,255,.6)", boxShadow: "0 24px 80px rgba(4,34,20,.22)" }}>
        {/* ImageResponse requires a native img element for a local data URL. */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={logoSrc} alt="" width={790} height={395} style={{ objectFit: "contain" }} />
        <div style={{ display: "flex", alignItems: "center", marginTop: -10, color: "#174b34", fontSize: 25, fontWeight: 700, letterSpacing: 1 }}>Fun. Food. Family. Experiences.</div>
        <div style={{ display: "flex", marginTop: 12, color: "#5b7362", fontSize: 19, letterSpacing: 1 }}>Southfield, St. Elizabeth, Jamaica</div>
      </div>
    </div>,
    size,
  );
}
