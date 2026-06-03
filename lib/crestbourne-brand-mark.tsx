import { ImageResponse } from "next/og";

const PAPER = "#faf7ef";
const INK = "#171612";
const INK_RING = "rgba(23, 22, 18, 0.25)";
const FONT_URL =
  "https://fonts.gstatic.com/s/instrumentserif/v5/jizHRFtNs2ka5fXjeivQ4LroWlx-6zATiw.ttf";

let cachedFont: ArrayBuffer | undefined;

async function loadInstrumentSerifItalic(): Promise<ArrayBuffer> {
  if (!cachedFont) {
    const data = await fetch(FONT_URL).then((res) => res.arrayBuffer());
    cachedFont = data;
    return data;
  }
  return cachedFont;
}

/** Nav logo mark: circular “C” monogram (36px base in Nav). */
function BrandMark({ size }: { size: number }) {
  const scale = size / 36;
  const border = Math.max(1, scale);
  const inset = 4 * scale;
  const fontSize = 20 * scale;

  return (
    <div
      style={{
        width: size,
        height: size,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        borderRadius: "50%",
        backgroundColor: PAPER,
        border: `${border}px solid ${INK}`,
      }}
    >
      <div
        style={{
          position: "absolute",
          top: inset,
          left: inset,
          right: inset,
          bottom: inset,
          borderRadius: "50%",
          border: `${border}px solid ${INK_RING}`,
        }}
      />
      <span
        style={{
          fontFamily: "Instrument Serif",
          fontStyle: "italic",
          fontWeight: 400,
          fontSize,
          color: INK,
          lineHeight: 1,
          marginTop: -1 * scale,
        }}
      >
        C
      </span>
    </div>
  );
}

export async function crestbourneBrandMarkImage(size: number) {
  const font = await loadInstrumentSerifItalic();

  return new ImageResponse(<BrandMark size={size} />, {
    width: size,
    height: size,
    fonts: [
      {
        name: "Instrument Serif",
        data: font,
        style: "italic",
        weight: 400,
      },
    ],
  });
}
