import { readFileSync } from "node:fs";
import { join } from "node:path";
import { ImageResponse } from "next/og";

export const OG_SIZE = { width: 1200, height: 630 };
export const OG_CONTENT_TYPE = "image/png";

const BG = "#191813";
const FG = "#f2ecda";
const FG_85 = "rgba(242, 236, 218, 0.85)";
const FG_60 = "rgba(242, 236, 218, 0.6)";
const RULE = "rgba(242, 236, 218, 0.12)";
const SAGE = "#b8c7b8";
const FLARE = "#ff6e40";

// The image renderer can't read the woff2 files next/font serves, so it gets
// its own TTFs. They are only read at build time.
function font(file: string) {
  return readFileSync(join(process.cwd(), "assets", "fonts", file));
}

// long titles shrink so they stay on two lines
function titleSize(title: string) {
  if (title.length <= 12) return 104;
  if (title.length <= 20) return 84;
  return 68;
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
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: BG,
          padding: "72px",
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
          <div style={{ display: "flex" }}>
            <div
              style={{
                fontFamily: "Fraunces",
                fontSize: titleSize(title),
                lineHeight: 1.05,
                letterSpacing: "-0.02em",
                color: FG,
                paddingBottom: 10,
                borderBottom: `5px solid ${FLARE}`,
              }}
            >
              {title}
            </div>
          </div>

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

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ height: 1, background: RULE }} />
          <div
            style={{
              marginTop: 24,
              fontFamily: "FrauncesItalic",
              fontStyle: "italic",
              fontSize: 26,
              color: SAGE,
            }}
          >
            pdcarlson.dev
          </div>
        </div>
      </div>
    ),
    {
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
    },
  );
}
