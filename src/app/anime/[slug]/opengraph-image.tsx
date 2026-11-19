import { ImageResponse } from "next/og";
import { getAnimeBySlug } from "@/lib/data";
import { FORMAT_LABELS } from "@/lib/format";

const SIZE = { width: 1200, height: 630 };

const spaceGrotesk = loadSpaceGrotesk();

async function loadSpaceGrotesk(): Promise<ArrayBuffer | Buffer> {
  const { readFile } = await import("node:fs/promises");
  return readFile(process.cwd() + "/public/fonts/SpaceGrotesk-Static.ttf");
}

export async function generateImageMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const anime = slug ? await getAnimeBySlug(slug) : null;
  if (!anime) return [];
  return [
    {
      id: "default",
      alt: `${anime.title} — Anime Archive`,
      ...SIZE,
      contentType: "image/png",
    },
  ];
}

export default async function Image({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const anime = await getAnimeBySlug(slug);
  if (!anime) return null;
  const fontData = await spaceGrotesk;

  const titleSize =
    anime.title.length > 34
      ? 46
      : anime.title.length > 26
        ? 56
        : anime.title.length > 18
          ? 66
          : 78;

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
            top: -260,
            left: -220,
            width: 840,
            height: 840,
            borderRadius: "50%",
            backgroundImage:
              "radial-gradient(circle, rgba(200, 56, 63, 0.3) 0%, rgba(200, 56, 63, 0) 65%)",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: -280,
            right: -240,
            width: 880,
            height: 880,
            borderRadius: "50%",
            backgroundImage:
              "radial-gradient(circle, rgba(47, 159, 175, 0.16) 0%, rgba(47, 159, 175, 0) 65%)",
          }}
        />
        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            border: "1px solid #26262e",
            padding: "44px 56px",
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
                gap: 10,
                color: "#d95c64",
                fontSize: 15,
                letterSpacing: "0.3em",
                textTransform: "uppercase",
              }}
            >
              <div style={{ width: 7, height: 7, backgroundColor: "#c8383f" }} />
              ANIME ARCHIVE
            </div>
            <div
              style={{
                color: "#6e6760",
                fontSize: 13,
                letterSpacing: "0.28em",
                textTransform: "uppercase",
              }}
            >
              MUSEUM RECORD
            </div>
          </div>

          <div
            style={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              minHeight: 0,
            }}
          >
            {anime.era ? (
              <div
                style={{
                  color: "#d95c64",
                  fontSize: 18,
                  letterSpacing: "0.32em",
                  textTransform: "uppercase",
                }}
              >
                {anime.era.name}
              </div>
            ) : null}
            <div
              style={{
                color: "#f1ece5",
                fontSize: titleSize,
                lineHeight: 1.08,
                letterSpacing: "0.02em",
                textTransform: "uppercase",
                marginTop: 18,
                width: "100%",
              }}
            >
              {anime.title}
            </div>
            {anime.japaneseTitle ? (
              <div
                style={{
                  color: "#a39c94",
                  fontSize: 30,
                  letterSpacing: "0.02em",
                  marginTop: 14,
                  fontFamily: "'Noto Serif JP', serif",
                }}
              >
                {anime.japaneseTitle}
              </div>
            ) : null}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 14,
                marginTop: 30,
                flexWrap: "wrap",
              }}
            >
              {anime.year ? (
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    border: "1px solid #33333d",
                    padding: "8px 18px",
                    color: "#f1ece5",
                    fontSize: 18,
                    letterSpacing: "0.22em",
                  }}
                >
                  {anime.year}
                </div>
              ) : null}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  border: "1px solid #c8383f",
                  padding: "8px 18px",
                  color: "#e88a8f",
                  fontSize: 18,
                  letterSpacing: "0.22em",
                }}
              >
                {FORMAT_LABELS[anime.format]}
              </div>
              {anime.averageRating > 0 ? (
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 10,
                    color: "#d9a94e",
                    fontSize: 19,
                    letterSpacing: "0.04em",
                  }}
                >
                  <span>★</span>
                  <span>{anime.averageRating.toFixed(1)}</span>
                </div>
              ) : null}
            </div>
            {anime.genres.length > 0 ? (
              <div
                style={{
                  display: "flex",
                  gap: 10,
                  marginTop: 14,
                  flexWrap: "wrap",
                }}
              >
                {anime.genres.slice(0, 4).map((genre) => (
                  <div
                    key={genre.id}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      border: "1px solid #26262e",
                      padding: "6px 14px",
                      color: "#a39c94",
                      fontSize: 15,
                      letterSpacing: "0.14em",
                      textTransform: "uppercase",
                    }}
                  >
                    {genre.name}
                  </div>
                ))}
              </div>
            ) : null}
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
                fontSize: 13,
                letterSpacing: "0.26em",
                textTransform: "uppercase",
              }}
            >
              1917 — PRESENT
            </div>
            <div
              style={{
                color: "#6e6760",
                fontSize: 13,
                letterSpacing: "0.26em",
                textTransform: "uppercase",
              }}
            >
              ANIME ARCHIVE
            </div>
          </div>
        </div>
      </div>
    ),
    {
      ...SIZE,
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