import { readFileSync } from "node:fs";
import { join } from "node:path";
import type { ReactElement, ReactNode } from "react";
import { ImageResponse } from "next/og";

export const OG_SIZE = { width: 1200, height: 630 };
export const OG_CONTENT_TYPE = "image/png";

const BG = "#191813";
const FG = "#f2ecda";
const FG_85 = "rgba(242, 236, 218, 0.85)";
const FG_60 = "rgba(242, 236, 218, 0.6)";
const RULE = "rgba(242, 236, 218, 0.12)";
const FRAME = "rgba(242, 236, 218, 0.22)";
const BEZEL = "#33312a";
const SAGE = "#b8c7b8";
const FLARE = "#ff6e40";

const PAD = 72;
const SHADOW = "0 24px 70px rgba(0, 0, 0, 0.55)";

// The image renderer can't read the woff2 files next/font serves, so it gets
// its own TTFs. They are only read at build time.
function font(file: string) {
  return readFileSync(join(process.cwd(), "assets", "fonts", file));
}

// It can't decode WebP either, so the cards use PNG and JPEG files from
// public/assets, inlined the same way.
function picture(file: string) {
  const data = readFileSync(join(process.cwd(), "public", "assets", file));
  const type = file.endsWith(".png") ? "png" : "jpeg";
  return `url(data:image/${type};base64,${data.toString("base64")})`;
}

// long titles shrink so they stay on two lines
function titleSize(title: string) {
  if (title.length <= 12) return 104;
  if (title.length <= 20) return 84;
  return 68;
}

function Title({ children }: { children: string }) {
  return (
    <div style={{ display: "flex" }}>
      <div
        style={{
          fontFamily: "Fraunces",
          fontSize: titleSize(children),
          lineHeight: 1.05,
          letterSpacing: "-0.02em",
          color: FG,
          paddingBottom: 10,
          borderBottom: `5px solid ${FLARE}`,
        }}
      >
        {children}
      </div>
    </div>
  );
}

function Footer({ size }: { size: number }) {
  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <div style={{ height: 1, background: RULE }} />
      <div
        style={{
          marginTop: 24,
          fontFamily: "FrauncesItalic",
          fontStyle: "italic",
          fontSize: size,
          color: SAGE,
        }}
      >
        pdcarlson.dev
      </div>
    </div>
  );
}

function respond(card: ReactElement) {
  return new ImageResponse(card, {
    ...OG_SIZE,
    fonts: [
      { name: "Inter", data: font("Inter-Regular.ttf"), weight: 400, style: "normal" },
      { name: "Fraunces", data: font("Fraunces-Roman.ttf"), weight: 600, style: "normal" },
      {
        name: "FrauncesItalic",
        data: font("Fraunces-Italic.ttf"),
        weight: 600,
        style: "italic",
      },
    ],
  });
}

export function renderOgImage({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description: string;
}) {
  return respond(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        background: BG,
        padding: PAD,
        fontFamily: "Inter",
      }}
    >
      <div
        style={{
          fontSize: 20,
          letterSpacing: "0.1em",
          textTransform: "uppercase",
          color: FG_60,
        }}
      >
        {eyebrow}
      </div>

      <div style={{ display: "flex", flexDirection: "column" }}>
        <Title>{title}</Title>
        <div
          style={{
            marginTop: 36,
            maxWidth: 900,
            fontSize: 28,
            lineHeight: 1.45,
            color: FG_85,
          }}
        >
          {description}
        </div>
      </div>

      <Footer size={26} />
    </div>,
  );
}

const TEXT_WIDTH = 468;

// The cards that get shared. LinkedIn shows them about 400px wide, so they
// carry a title, one short line, and a picture, and nothing small.
function pictureCard({
  title,
  label,
  children,
}: {
  title: string;
  label: string;
  children: ReactNode;
}) {
  return respond(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        background: BG,
        fontFamily: "Inter",
      }}
    >
      <div
        style={{
          width: PAD + TEXT_WIDTH,
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: `${PAD}px 0 ${PAD}px ${PAD}px`,
        }}
      >
        <div style={{ display: "flex", flexDirection: "column" }}>
          <Title>{title}</Title>
          <div style={{ marginTop: 30, fontSize: 34, lineHeight: 1.3, color: FG_85 }}>
            {label}
          </div>
        </div>

        <Footer size={30} />
      </div>

      {/* pictures are placed from the top left of this box */}
      <div style={{ position: "relative", display: "flex", flex: 1 }}>{children}</div>
    </div>,
  );
}

function Picture({
  file,
  left,
  top,
  width,
  height,
  radius,
  bezel = 0,
}: {
  file: string;
  left: number;
  top: number;
  width: number;
  height: number;
  radius: number;
  bezel?: number;
}) {
  return (
    <div
      style={{
        position: "absolute",
        left,
        top,
        display: "flex",
        padding: bezel,
        background: BEZEL,
        borderRadius: radius,
        boxShadow: `0 0 0 1px ${FRAME}, ${SHADOW}`,
      }}
    >
      <div
        style={{
          width,
          height,
          borderRadius: radius - bezel,
          backgroundImage: picture(file),
          backgroundSize: "100% 100%",
        }}
      />
    </div>
  );
}

// The screenshot runs off the right and bottom edges of the card. A phone
// stands in front of its left edge and runs off the bottom. The files in
// public/assets/og are cut to these sizes.
const SHOT = { top: 88, width: 660, height: 570 };
const PHONE = { left: 20, top: 230, width: 230, height: 500 };

export function renderProjectOgImage({
  title,
  label,
  shot,
  phone,
}: {
  title: string;
  label: string;
  shot: string;
  phone?: string;
}) {
  return pictureCard({
    title,
    label,
    children: [
      <Picture key="shot" file={shot} left={phone ? 190 : 28} {...SHOT} radius={18} />,
      phone && <Picture key="phone" file={phone} {...PHONE} radius={36} bezel={7} />,
    ],
  });
}

// the headshot is 495 x 607, kept near that size so it stays sharp
const PHOTO = { left: 108, top: 88, width: 480, height: 589 };

export function renderHomeOgImage({ title, label }: { title: string; label: string }) {
  return pictureCard({
    title,
    label,
    children: <Picture file="headshot.jpg" {...PHOTO} radius={18} />,
  });
}
