import { ImageResponse } from "next/og";

export const alt = "Anime Archive — A Digital Museum of Japanese Animation History";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const spaceGrotesk = loadSpaceGrotesk();

const hostname = new URL(
  process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"
).host;

async function loadSpaceGrotesk(): Promise<ArrayBuffer | Buffer> {
  const { readFile } = await import("node:fs/promises");
  return readFile(process.cwd() + "/public/fonts/SpaceGrotesk-Static.ttf");
}

export default async function Image() {
  const fontData = await spaceGrotesk;
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          position: "relative",
          overflow: "hidden",
          backgroundColor: "#0a0a0c",
          padding: 48,
          fontFamily: "Space Grotesk",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: -280,
            left: -200,
            width: 860,
            height: 860,
            borderRadius: "50%",
            backgroundImage:
              "radial-gradient(circle, rgba(200, 56, 63, 0.32) 0%, rgba(200, 56, 63, 0) 65%)",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: -300,
            right: -240,
            width: 900,
            height: 900,
            borderRadius: "50%",
            backgroundImage:
              "radial-gradient(circle, rgba(47, 159, 175, 0.18) 0%, rgba(47, 159, 175, 0) 65%)",
          }}
        />
        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            border: "1px solid #26262e",
            padding: "54px 64px",
            position: "relative",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 12,
                color: "#d95c64",
                fontSize: 16,
                letterSpacing: "0.34em",
                textTransform: "uppercase",
              }}
            >
              <div style={{ width: 8, height: 8, backgroundColor: "#c8383f" }} />
              DIGITAL MUSEUM
            </div>
            <div
              style={{
                color: "#6e6760",
                fontSize: 15,
                letterSpacing: "0.3em",
                textTransform: "uppercase",
              }}
            >
              PERMANENT COLLECTION
            </div>
          </div>

          <div
            style={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <div
              style={{
                color: "#f1ece5",
                fontSize: 108,
                lineHeight: 1.05,
                letterSpacing: "0.05em",
                textTransform: "uppercase",
                textAlign: "center",
              }}
            >
              ANIME ARCHIVE
            </div>
            <div
              style={{
                width: 84,
                height: 3,
                backgroundColor: "#c8383f",
                marginTop: 30,
              }}
            />
            <div
              style={{
                color: "#a39c94",
                fontSize: 29,
                letterSpacing: "0.02em",
                marginTop: 26,
                textAlign: "center",
              }}
            >
              A Digital Museum of Japanese Animation History
            </div>
            <div
              style={{
                color: "#6e6760",
                fontSize: 17,
                letterSpacing: "0.38em",
                textTransform: "uppercase",
                marginTop: 42,
                textAlign: "center",
              }}
            >
              1917 — PRESENT
            </div>
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <div
              style={{
                color: "#6e6760",
                fontSize: 14,
                letterSpacing: "0.26em",
                textTransform: "uppercase",
              }}
            >
              ARCHIVE OF RECORDS
            </div>
            <div
              style={{
                color: "#6e6760",
                fontSize: 14,
                letterSpacing: "0.26em",
                textTransform: "uppercase",
              }}
            >
              {hostname}
            </div>
          </div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        {
          name: "Space Grotesk",
          data: fontData,
          style: "normal",
          weight: 400,
        },
      ],
    }
  );
}