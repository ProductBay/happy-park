import { readFile } from "node:fs/promises";
import { join } from "node:path";

import { ImageResponse } from "next/og";

export const size = { width: 64, height: 64 };
export const contentType = "image/png";

const logoData = await readFile(join(process.cwd(), "public/images/brand/happy-park-logo.png"), "base64");
const logoSrc = `data:image/png;base64,${logoData}`;

export default function Icon() {
  return new ImageResponse(
    <div style={{ display: "flex", width: 64, height: 64, position: "relative", overflow: "hidden", borderRadius: 14, background: "#fffaf0" }}>
      {/* Crop the colorful H from the official Happy-Park wordmark. */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={logoSrc} alt="" width={420} height={210} style={{ position: "absolute", left: -43, top: -107 }} />
    </div>,
    size,
  );
}
